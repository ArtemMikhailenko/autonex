import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

const TELEMETRY = [
  { k: "ETA", v: "14 днів" },
  { k: "Пройдено", v: "1 280 км" },
  { k: "Залишилось", v: "780 км" },
  { k: "Оновлено", v: "2 хв тому" },
];

const PROGRESS = 62;

export function Tracking() {
  return (
    <section className="py-5">
      <div className="container-x">
        <div className="panel relative overflow-hidden p-7 sm:p-10">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(70% 60% at 50% 42%, rgba(47,107,255,0.18), transparent 70%)" }}
          />

          {/* header */}
          <Reveal>
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <span className="eyebrow text-[var(--brand-bright)]">ВІДСТЕЖЕННЯ</span>
                <h2 className="h-title text-[1.9rem] sm:text-[2.4rem] mt-3 max-w-[16ch]">
                  Бачиш авто. Бачиш <span className="text-gradient">кожен кілометр.</span>
                </h2>
              </div>
              <div
                className="flex items-center gap-2.5 rounded-full px-4 py-2 self-start"
                style={{ background: "rgba(12,18,32,0.6)", border: "1px solid rgba(120,190,255,0.28)" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="mono text-[0.72rem] tracking-widest text-[#c3d3ef]">LIVE · LOT 38291</span>
              </div>
            </div>
          </Reveal>

          {/* map */}
          <Reveal delay={100}>
            <div className="relative mt-4 sm:mt-0 -mx-7 sm:-mx-10">
              <div className="relative aspect-[2170/725]">
                <Image
                  src="/images/track-map.webp"
                  alt="Маршрут Європа → Україна"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-contain"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[34%] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(13,19,34,0.45) 46%, rgba(13,19,34,0.8) 100%)",
                  }}
                />
                {/* chip riding with the truck */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-1 sm:top-[3%] rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2.5 scale-[0.85] sm:scale-100"
                  style={{
                    background: "rgba(10,16,30,0.82)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(120,190,255,0.3)",
                    boxShadow: "0 12px 40px -16px rgba(47,130,255,0.8)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-bright)] pulse-dot" />
                    <span className="mono text-[0.68rem] tracking-widest text-[#c3d3ef]">В ДОРОЗІ</span>
                  </div>
                  <div className="mono text-[0.8rem] text-white tabular-nums mt-1">Берлін → Київ</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* one continuous progress rail — mirrors the route above */}
          <Reveal delay={160}>
            <div className="relative mt-4 sm:-mt-[62px]">
              <div className="relative h-[3px] rounded-full bg-white/[0.08]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${PROGRESS}%`,
                    background: "linear-gradient(90deg, rgba(47,107,255,0.35), var(--brand-bright) 70%, #22d3ff)",
                    boxShadow: "0 0 16px rgba(47,130,255,0.85)",
                  }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white"
                  style={{ left: `${PROGRESS}%`, boxShadow: "0 0 0 4px rgba(47,107,255,0.35), 0 0 18px 4px rgba(47,130,255,0.9)" }}
                />
              </div>

              {/* telemetry read-out */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 mt-7">
                {TELEMETRY.map((r, i) => (
                  <div key={r.k} className={i > 0 ? "sm:pl-6 sm:border-l sm:border-white/[0.07]" : ""}>
                    <div className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--faint)]">{r.k}</div>
                    <div className="mono text-[1.15rem] text-white tabular-nums mt-1.5">{r.v}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8">
                {["GPS у реальному часі", "Фото-звіти з кожного етапу", "Сповіщення в Telegram"].map((f) => (
                  <span key={f} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <span className="w-1 h-1 rounded-full bg-[var(--brand-bright)]" />
                    {f}
                  </span>
                ))}
                <button data-lead data-lead-context="Відстеження" className="btn btn-ghost justify-center w-full sm:w-auto !py-3 sm:!py-2.5 !px-5 !text-sm sm:ml-auto">
                  Дізнатись більше <ArrowRight width={16} height={16} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
