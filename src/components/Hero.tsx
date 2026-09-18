import Image from "next/image";
import { HERO_STATS } from "@/lib/data";
import { ArrowRight, Play } from "./icons";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[calc(100svh-72px)] flex items-center overflow-hidden bg-[var(--bg)]">
      {/* background: truck + world map.
          the box is taller than the section so the bright road glare at the
          bottom of the frame is cropped away rather than scrimmed over */}
      <div className="absolute inset-x-0 top-0 h-[118%] overflow-hidden">
        <Image
          src="/images/hero-bg.webp"
          alt="AUTONEX — доставка авто з Європи в Україну"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* narrow screens have no left/right split to work with — even wash instead */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,11,22,0.62) 0%, rgba(7,11,22,0.72) 46%, rgba(7,11,22,0.6) 100%)",
          }}
        />
        {/* left scrim so the copy stays readable */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,11,22,0.82) 0%, rgba(7,11,22,0.66) 26%, rgba(7,11,22,0.3) 50%, rgba(7,11,22,0.06) 72%, transparent 100%)",
          }}
        />
        {/* top scrim under the header */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{ background: "linear-gradient(180deg, rgba(7,11,22,0.82) 0%, rgba(7,11,22,0.3) 55%, transparent 100%)" }}
        />
        {/* bottom fade — short, but ramps hard: it only has to bury the wordmark baked
            into the source file, not half the truck */}
        <div
          className="absolute inset-x-0 bottom-0 h-[38%]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(7,11,22,0.2) 18%, rgba(7,11,22,0.5) 38%, rgba(7,11,22,0.8) 56%, rgba(7,11,22,0.95) 72%, var(--bg) 86%, var(--bg) 100%)",
          }}
        />
      </div>

      {/* content — eyebrow through stats read as ONE block, centred together */}
      <div className="relative z-10 w-full">
        <div className="container-x w-full py-20">
          <Reveal>
            <span className="eyebrow text-[var(--brand-bright)] flex items-center gap-2.5">
              <span className="w-6 h-px bg-[var(--brand-bright)]" />
              АВТОЛОГІСТИКА ПІД КЛЮЧ
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="h-title mt-5 max-w-[15ch]" style={{ fontSize: "clamp(1.95rem, 4.6vw, 3.9rem)" }}>
              Професійна<br />
              доставка авто<br />
              з Європи <span className="text-gradient whitespace-nowrap">в Україну</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-[#c8d5ee] text-lg mt-6 max-w-md leading-relaxed">
              Від покупки на аукціоні до ключів — швидко, безпечно, під ключ.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap gap-3.5 mt-8">
              <button data-lead data-lead-context="Головний екран" className="btn btn-primary">
                  Розрахувати вартість <ArrowRight width={18} height={18} />
                </button>
              <a href="#how" className="btn btn-ghost">
                  <Play width={16} height={16} /> Як це працює
                </a>
            </div>
          </Reveal>

          {/* stats bar */}
          <Reveal delay={320} className="mt-14 lg:mt-16 translate-y-[26px] lg:translate-y-[44px]">
            <div
            className="rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(4,1fr)_1.3fr]"
            style={{
              background: "rgba(12,18,32,0.45)",
              backdropFilter: "blur(22px) saturate(160%)",
              WebkitBackdropFilter: "blur(22px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`group relative min-w-0 px-4 sm:px-5 py-3 sm:py-5 flex items-center gap-2.5 sm:gap-3.5 transition-colors duration-300 hover:bg-white/[0.035] ${
                    i === 4 ? "hidden lg:flex" : ""
                  }`}
                >
                  {i > 0 && (
                    <span className="hidden xl:block absolute left-0 top-5 bottom-5 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                  )}
                  <Image
                    src={s.img}
                    alt=""
                    width={52}
                    height={52}
                    unoptimized
                    className="w-10 h-10 sm:w-[52px] sm:h-[52px] shrink-0 object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <div className="min-w-0">
                    <div className="font-display font-bold text-[0.85rem] sm:text-[1.05rem] xl:text-[1.2rem] leading-none tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-[0.53rem] sm:text-[0.64rem] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--faint)] mt-1 sm:mt-1.5">
                      {s.label}
                    </div>
                  </div>
                  {/* hover underline */}
                  <span className="absolute left-5 right-5 xl:left-6 xl:right-6 bottom-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 bg-gradient-to-r from-[var(--brand-bright)] to-transparent" />
                </div>
            ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
