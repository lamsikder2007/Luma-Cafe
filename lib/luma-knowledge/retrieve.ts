import { CORPUS, type KnowledgePassage } from "./corpus";

const STOPWORDS = new Set(
  "a,an,the,and,or,but,of,at,by,for,to,in,on,with,from,as,is,are,was,were,be,been,do,does,did,what,whats,when,where,which,who,whom,how,why,can,could,should,would,will,i,me,my,we,you,your,it,its,this,that,these,those,there,their,them,they,he,she,his,her,our,us,about,into,over,after,before,between,any,all,more,most,some,such,no,not,only,own,same,so,than,too,very,just,also,please,tell,show,give,get,have,has,had,want,like,need,know,kind".split(
    ","
  )
);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

export interface ScoredPassage extends KnowledgePassage {
  score: number;
}

const MAX_PASSAGES = 4;
const MAX_CHARS = 1600;

/**
 * Lightweight retrieval over the site knowledge corpus.
 * Scores title hits 3×, section hits, and exact-phrase matches —
 * deterministic, dependency-free, and upgradeable to vector search later.
 */
export function searchKnowledge(query: string, section?: string): ScoredPassage[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const qTokens = tokens(q);
  if (qTokens.length === 0) return [];

  const scored: ScoredPassage[] = [];
  for (const passage of CORPUS) {
    if (section && section !== "all" && passage.section !== section) continue;
    const title = passage.title.toLowerCase();
    const body = passage.body.toLowerCase();
    let score = 0;
    for (const t of qTokens) {
      if (title.includes(t)) score += 3;
      if (body.includes(t)) score += 1;
      if (passage.section.includes(t)) score += 1;
    }
    if (title.includes(q)) score += 5;
    if (body.includes(q)) score += 2;
    if (score > 0) scored.push({ ...passage, score });
  }

  scored.sort((a, b) => b.score - a.score);
  const picked: ScoredPassage[] = [];
  let chars = 0;
  for (const p of scored.slice(0, MAX_PASSAGES)) {
    if (chars + p.body.length > MAX_CHARS && picked.length > 0) break;
    picked.push(p);
    chars += p.body.length;
  }
  return picked;
}
