import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

/* real transit windows — same source data the calculator prices against */
const ROUTES = [
  { country: "Німеччина", code: "DE", days: "12—16" },
  { country: "Польща", code: "PL", days: "8—12" },
  { country: "Литва", code: "LT", days: "9—13" },
  { country: "Нідерланди", code: "NL", days: "13—17" },
];

export function KineticBand() {
  return (
    <section className="relative my-6 pb-14 sm:pb-16">
      {/* the artwork is a transparent PNG that feathers out on its own —
          no wrapper box, no scrim, no crop. it sits straight on the page. */}
      {/* wider than the content grid, but capped so it stays near native resolution */}
      <div className="w-full max-w-[1400px] mx-auto">
        <Image
          src="/images/band-map.webp"
          alt=""
          width={2172}
          height={724}
          unoptimized
          priority
          className="w-full h-auto select-none pointer-events-none"
        />
      </div>

      {/* copy rides up into the artwork's own empty lower edge */}
      <div className="relative container-x mt-6 sm:-mt-[2vw]">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <Reveal>
            <span className="eyebrow text-[var(--brand-bright)] flex items-center gap-2.5">
              <span className="w-6 h-px bg-[var(--brand-bright)]" />
              ГЕОГРАФІЯ
            </span>
            <h2 className="h-title text-[1.9rem] sm:text-[2.6rem] mt-4">
              Забираємо авто
              <br />
              з <span className="text-gradient">12 країн Європи</span>
            </h2>
            <p className="text-[var(--muted)] mt-4 max-w-md leading-relaxed">
              Забір із будь-якого міста, аукціону чи дилера. Терміни нижче —
              від моменту викупу до видачі в Україні.
            </p>
            <a href="#calc" className="btn btn-ghost justify-center w-full sm:w-auto !py-3 sm:!py-2.5 !px-5 !text-sm mt-7">
              Порахувати свій маршрут <ArrowRight width={16} height={16} />
            </a>
          </Reveal>

          {/* departures board — the block's actual content */}
          <Reveal delay={120}>
            <div className="lg:min-w-[380px]">
              <div className="flex items-baseline justify-between mono text-[0.58rem] uppercase tracking-[0.2em] text-[#8ea4c6] pb-2.5">
                <span>Країна відправлення</span>
                <span>Транзит</span>
              </div>
              {ROUTES.map((r) => (
                <div
                  key={r.code}
                  className="flex items-baseline justify-between gap-6 py-3 border-t border-white/[0.09]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="mono text-[0.7rem] tracking-[0.18em] text-[var(--brand-bright)] w-7">
                      {r.code}
                    </span>
                    <span className="font-display font-semibold text-[1.02rem] text-white">
                      {r.country}
                    </span>
                  </span>
                  <span className="mono text-[0.92rem] text-[#c3d3ef] tabular-nums whitespace-nowrap">
                    {r.days} днів
                  </span>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 py-3 border-t border-white/[0.09] text-[var(--faint)]">
                <span className="mono text-[0.7rem] tracking-[0.18em]">+8</span>
                <span className="text-sm">решта країн ЄС — за запитом</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
