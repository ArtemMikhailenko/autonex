import { STEPS } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Steps() {
  return (
    <section id="how" className="relative py-20 lg:py-28">
      <div className="container-x">
        {/* editorial header — left-aligned, spec sheet vibe */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="mono-label flex items-center gap-2.5">
                <span className="slash" aria-hidden />
                METHOD / 04 STAGES
              </span>
              <h2 className="h-title text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] mt-3 max-w-xl">
                Від ставки до<br />ключів — <span className="text-gradient">35 днів</span>
              </h2>
            </div>
            <p className="mono text-sm text-[var(--muted)] max-w-xs leading-relaxed">
              Процес розписаний по днях. На кожному етапі — звіт, документи й конкретна
              людина-відповідальний.
            </p>
          </div>
        </Reveal>

        {/* documentary spec sheet — not a grid of equal cards */}
        <div className="relative">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <article className="relative grid grid-cols-1 lg:grid-cols-[110px_1fr_minmax(200px,280px)] gap-x-8 gap-y-3 py-8 lg:py-10 border-t border-[var(--border)] first:border-t-0 group">
                {/* big outlined index */}
                <div className="flex items-baseline gap-3">
                  <span className="idx text-[3.5rem] sm:text-[4.5rem] lg:text-[5.2rem] transition-all group-hover:[-webkit-text-stroke-color:var(--brand-bright)]">
                    {s.n}
                  </span>
                </div>

                {/* main body */}
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                    <span className="mono-label !text-[var(--brand-bright)]">{s.stage}</span>
                    <span className="mono text-xs text-[var(--faint)]">/ {s.day}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="text-[var(--muted)] mt-3 leading-relaxed max-w-xl">{s.text}</p>
                </div>

                {/* spec meta column */}
                <ul className="lg:pl-6 lg:border-l border-[var(--border)] space-y-2 self-center">
                  {s.meta.map((m) => (
                    <li key={m} className="flex items-baseline gap-2.5 mono text-[0.78rem] text-[var(--muted)]">
                      <span className="text-[var(--brand-bright)]">›</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
