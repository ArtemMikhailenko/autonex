const ROW_A = ["ДОСТАВКА АВТО", "USA → UA", "ПІД КЛЮЧ", "EUROPE → UA"];
const ROW_B = ["COPART · IAAI", "DDP", "VESSEL · CONTAINER", "RORO", "GPS LIVE"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="marquee-track" style={reverse ? { animationDirection: "reverse", animationDuration: "32s" } : { animationDuration: "32s" }}>
      {loop.map((t, i) => (
        <span key={i} className="kinetic flex items-center">
          <span className={i % 2 === 0 ? "kinetic-outline" : "text-[var(--text)]"}>{t}</span>
          <span className="kinetic-dot mx-7">/</span>
        </span>
      ))}
    </div>
  );
}

export function KineticBand() {
  return (
    <section className="relative py-14 lg:py-20 border-y border-[var(--border)] overflow-hidden">
      <div className="diag-stripes absolute inset-0 opacity-60" aria-hidden />
      <div className="relative space-y-2 lg:space-y-4">
        <div className="overflow-hidden">
          <Row items={ROW_A} />
        </div>
        <div className="overflow-hidden">
          <Row items={ROW_B} reverse />
        </div>
      </div>
    </section>
  );
}
