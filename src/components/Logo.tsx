export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="lm-blade" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f8bff" />
          <stop offset="1" stopColor="#1640b8" />
        </linearGradient>
      </defs>
      {/* angular blade "A / arrow" mark, brandbook style */}
      <path d="M22 4 L34 4 L16 44 L4 44 Z" fill="#e9eefc" />
      <path d="M30 4 L44 4 L26 44 L12 44 Z" fill="url(#lm-blade)" />
      {/* notch cut */}
      <path d="M21 26 L33 26 L29 36 L17 36 Z" fill="#05070f" />
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
