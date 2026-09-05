import React from "react";

interface SiteLogoProps {
  className?: string;
}

/**
 * Luma Café primary lockup, inlined so the wordmark renders in the
 * page's Playfair Display / Plus Jakarta Sans webfonts.
 */
export default function SiteLogo({ className }: SiteLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 200"
      className={className}
      role="img"
      aria-label="Luma Café — Good Coffee · Brighter Days"
    >
      {/* Warm halo of light behind the emblem */}
      <defs>
        <radialGradient id="siteLogoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8ecd4" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f3ddb8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f3ddb8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="105" cy="100" rx="102" ry="94" fill="url(#siteLogoGlow)" />
      {/* Emblem Icon (Left) */}
      <g transform="translate(30, 20)">
        {/* Outer Arch / Oval Frame */}
        <rect x="10" y="8" width="130" height="144" rx="65" stroke="#2c1d11" strokeWidth="3" fill="none" />
        <rect x="16" y="14" width="118" height="132" rx="59" stroke="#c89658" strokeWidth="1.6" strokeDasharray="3 3" fill="none" opacity="1" />

        {/* Radiant Sunburst Lines at Top */}
        <path d="M 75 22 L 75 32" stroke="#b47b48" strokeWidth="2" strokeLinecap="round" />
        <path d="M 52 28 L 57 37" stroke="#b47b48" strokeWidth="2" strokeLinecap="round" />
        <path d="M 98 28 L 93 37" stroke="#b47b48" strokeWidth="2" strokeLinecap="round" />
        <path d="M 34 44 L 43 49" stroke="#b47b48" strokeWidth="2" strokeLinecap="round" />
        <path d="M 116 44 L 107 49" stroke="#b47b48" strokeWidth="2" strokeLinecap="round" />

        {/* Coffee Bean / Rising Steam Organic Curves */}
        <path d="M 55 125 C 40 100 42 68 75 52 C 108 68 110 100 95 125 C 84 140 66 140 55 125 Z" fill="#2c1d11" fillOpacity="0.04" stroke="#2c1d11" strokeWidth="2.5" />

        {/* Central S-curve (Coffee Bean seam / Steam curl) */}
        <path d="M 75 52 C 86 70 60 88 78 112 C 86 122 84 132 75 137" fill="none" stroke="#b47b48" strokeWidth="2.5" strokeLinecap="round" />

        {/* Little Golden Star / Sparkle inside bean */}
        <circle cx="88" cy="84" r="11" fill="#f5e5c9" opacity="0.6" />
        <path d="M 88 78 Q 88 84 94 84 Q 88 84 88 90 Q 88 84 82 84 Q 88 84 88 78 Z" fill="#c89658" />
      </g>

      {/* LUMA CAFÉ Primary Title */}
      <text x="200" y="102" fontFamily="'Playfair Display', Georgia, serif" fontSize="52" fontWeight="700" letterSpacing="4" fill="#2c1d11">LUMA CAFÉ</text>

      {/* Accent Mark over E */}
      <path d="M 496 66 L 504 57" stroke="#b47b48" strokeWidth="3.5" strokeLinecap="round" />

      {/* Subtle Divider Line with Diamond */}
      <line x1="202" y1="120" x2="310" y2="120" stroke="#c89658" strokeWidth="1.4" opacity="0.9" />
      <polygon points="316,120 320,116 324,120 320,124" fill="#b47b48" />
      <line x1="330" y1="120" x2="438" y2="120" stroke="#c89658" strokeWidth="1.4" opacity="0.9" />

      {/* Tagline Subtitle */}
      <text x="202" y="142" fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif" fontSize="12.5" fontWeight="500" letterSpacing="6" fill="#6d5d52">GOOD COFFEE · BRIGHTER DAYS</text>
    </svg>
  );
}
