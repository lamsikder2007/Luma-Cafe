import { NextRequest, NextResponse } from "next/server";
import {
  generateChatResponse,
  MODEL_CHAIN,
  ChatMessage,
  CartSnapshotItem,
} from "@/lib/ai";
import { fallbackRespond } from "@/lib/ai-fallback";
import { getSessionMemberId } from "@/lib/session";

const MAX_MESSAGE_LENGTH = 1000;

function sanitizeCart(value: unknown): CartSnapshotItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (i): i is Record<string, unknown> =>
        !!i && typeof i === "object" && typeof (i as { name?: unknown }).name === "string"
    )
    .slice(0, 50)
    .map((i) => ({
      id: typeof i.id === "string" ? i.id : undefined,
      name: String(i.name).slice(0, 120),
      price: typeof i.price === "number" && Number.isFinite(i.price) ? i.price : 0,
      quantity:
        typeof i.quantity === "number" && Number.isFinite(i.quantity)
          ? Math.max(0, Math.min(99, Math.floor(i.quantity)))
          : 0,
    }))
    .filter((i) => i.quantity > 0);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  // Validate message
  if (!body || typeof body.message !== "string") {
    return NextResponse.json(
      { error: "Message is required and must be a string." },
      { status: 400 }
    );
  }

  const message: string = body.message.trim();

  if (message.length === 0) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      {
        error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
      },
      { status: 400 }
    );
  }

  // Validate history (optional)
  const history: ChatMessage[] = Array.isArray(body.history)
    ? body.history
        .filter(
          (msg: Record<string, unknown>) =>
            msg &&
            typeof msg.content === "string" &&
            (msg.role === "user" || msg.role === "assistant")
        )
        .slice(-20) // Keep last 20 messages for context
    : [];

  // Guest's live tray snapshot — powers get_order_status and grounds replies.
  const cart = sanitizeCart(body.cart);

  // Signed-in member only (cookie session) — gates private account tools.
  let memberId: string | null = null;
  try {
    memberId = await getSessionMemberId();
  } catch {
    memberId = null;
  }

  const messages: ChatMessage[] = [
    ...history,
    { role: "user", content: message },
  ];

  // 1+2. Walk the model chain — first working model answers.
  for (let i = 0; i < MODEL_CHAIN.length; i++) {
    try {
      const { reply, actions, guard } = await generateChatResponse(
        messages,
        cart,
        memberId,
        MODEL_CHAIN[i]
      );
      return NextResponse.json({
        reply,
        actions,
        guard: i === 0 ? (guard ?? "none") : "model-failover",
      });
    } catch (modelError) {
      console.error(`Chat model ${MODEL_CHAIN[i]} failed:`, modelError);
    }
  }

  // 3. Local fallback — same live data, no LLM. The chat always answers.
  try {
    const fb = fallbackRespond(message, cart, memberId);
    return NextResponse.json({ reply: fb.reply, actions: fb.actions, guard: "local-fallback" });
  } catch (fallbackError) {
    console.error("Chat fallback failed:", fallbackError);
    return NextResponse.json(
      { error: "Luma AI is at capacity right now — please try again in a minute." },
      { status: 429 }
    );
  }
}
