import { BIG_STATS } from "@/lib/data";
import { Reveal } from "./Reveal";

export function StatsBar() {
  return (
    <section className="relative py-16 lg:py-24 border-y border-[var(--border)]">
      <div className="container-x">
        <Reveal>
          <span className="mono-label flex items-center gap-2.5 mb-8">
            <span className="slash" aria-hidden />
            BY THE NUMBERS / 2026
          </span>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {BIG_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="relative pl-5">
                <span className="absolute left-0 top-1 bottom-1 w-px bg-[var(--brand-bright)]" />
                <div className="font-display font-extrabold text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] leading-none text-gradient tabular-nums">
                  {s.value}
                </div>
                <div className="mono-label mt-3 max-w-[180px]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
