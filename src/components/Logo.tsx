export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <radialGradient id="lm-globe" cx="0.4" cy="0.35" r="0.75">
          <stop stopColor="#6aa2ff" />
          <stop offset="0.55" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#0d2456" />
        </radialGradient>
        <linearGradient id="lm-ring" x1="4" y1="34" x2="44" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#22d3ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
        <filter id="lm-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="#2f8bff" floodOpacity="0.9" />
        </filter>
      </defs>
      <g filter="url(#lm-glow)">
        {/* globe */}
        <circle cx="24" cy="23" r="14" fill="url(#lm-globe)" stroke="#8fbaff" strokeWidth="1" strokeOpacity="0.7" />
        {/* meridians */}
        <ellipse cx="24" cy="23" rx="6" ry="14" stroke="#cfe2ff" strokeWidth="0.9" strokeOpacity="0.75" />
        <path d="M11 18 H37 M11 28 H37" stroke="#cfe2ff" strokeWidth="0.9" strokeOpacity="0.65" />
        {/* orbit ring */}
        <ellipse cx="24" cy="25" rx="21" ry="8" stroke="url(#lm-ring)" strokeWidth="3" transform="rotate(-24 24 25)" />
        {/* location pin */}
        <circle cx="28" cy="15" r="2.8" fill="#ffffff" />
        <circle cx="28" cy="15" r="2.8" fill="none" stroke="#22d3ff" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  withSub = false,
}: {
  className?: string;
  withSub?: boolean;
}) {
  return (
    <span className="inline-flex flex-col leading-none select-none">
      <span
        className={`font-display ${className}`}
        style={{ fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1 }}
      >
        <span style={{ color: "#eef2fb" }}>AUTO</span>
        <span className="text-gradient">NEX</span>
      </span>
      {withSub && (
        <span
          className="font-display text-[var(--faint)] mt-1"
          style={{ fontSize: "0.46em", letterSpacing: "0.34em", fontWeight: 600 }}
        >
          AUTOMOTIVE LOGISTICS NETWORK
        </span>
      )}
    </span>
  );
}
