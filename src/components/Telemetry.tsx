const FEED = [
  { dot: "live", text: "СТАТУС: IN TRANSIT" },
  { text: "VESSEL — MSC ANNA" },
  { text: "LOT #38291" },
  { text: "ETA 14 ДНІВ" },
  { text: "41.2°N / 72.1°W" },
  { brand: "COPART" },
  { text: "1 280 KM ПРОЙДЕНО" },
  { brand: "IAAI" },
  { text: "КОНТЕЙНЕР MSKU-7741203" },
  { brand: "MANHEIM" },
  { text: "DDP / ПІД КЛЮЧ" },
  { brand: "MAERSK" },
  { text: "ПОРТ: КЛАЙПЕДА" },
  { brand: "MSC" },
];

function Item({ item }: { item: (typeof FEED)[number] }) {
  if (item.brand) {
    return (
      <span className="font-display font-extrabold tracking-wide text-white/45 text-base">
        {item.brand}
      </span>
    );
  }
  return (
    <span className="telemetry flex items-center gap-2">
      {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />}
      {item.text}
    </span>
  );
}

export function Telemetry() {
  const loop = [...FEED, ...FEED];
  return (
    <section className="border-y border-[var(--border)] bg-[rgba(255,255,255,0.012)]">
      <div className="flex items-stretch">
        <span className="hidden sm:flex items-center gap-2 px-5 border-r border-[var(--border)] shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="mono-label !text-[var(--brand-bright)]">AUTONEX · LIVE</span>
        </span>
        <div className="marquee-mask overflow-hidden py-3.5 flex-1">
          <div className="marquee-track" style={{ animationDuration: "40s" }}>
            {loop.map((item, i) => (
              <span key={i} className="flex items-center">
                <Item item={item} />
                <span className="mx-6 text-[var(--faint)]">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
