import Image from "next/image";
import { ArrowRight, Send, Star } from "./icons";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { MouseParallax } from "./MouseParallax";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* ===== full-bleed background photo ===== */}
      <MouseParallax depth={16} className="absolute inset-0 -z-0">
        <div className="absolute inset-[-4%]">
          <Image
            src="/images/hauler-hero.jpg"
            alt="Автовоз AUTONEX доставляє авто з аукціону"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "74% 50%" }}
          />
        </div>
      </MouseParallax>

      {/* scrims: dark column behind the headline, photo revealed on the right half */}
      <div
        className="absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(100deg, #05070f 0%, rgba(5,7,15,0.95) 38%, rgba(5,7,15,0.5) 52%, rgba(5,7,15,0.12) 64%, rgba(5,7,15,0.08) 85%, rgba(5,7,15,0.5) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,15,0.9) 0%, transparent 20%, transparent 50%, rgba(5,7,15,0.97) 100%), linear-gradient(115deg, rgba(20,40,120,0.3), transparent 52%)",
        }}
      />
      {/* soft dark glow anchoring the headline */}
      <div
        className="absolute -z-0 left-0 top-[18%] w-[55%] h-[64%]"
        style={{ background: "radial-gradient(60% 60% at 30% 50%, rgba(0,0,0,0.55), transparent 75%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-0 mix-blend-overlay" style={{ background: "rgba(47,107,255,0.06)" }} />

      {/* ===== HUD telemetry over the truck (right side) ===== */}
      <div className="hidden lg:block absolute top-[20%] right-[4%] w-[38%] h-[52%] pointer-events-none">
        {/* crosshair frame */}
        <span className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-white/50" />
        <span className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-white/50" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-white/50" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-white/50" />
        {/* center tick */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
          <span className="absolute top-1/2 left-0 w-full h-px bg-white/30" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-white/30" />
        </span>
        <span className="absolute -top-6 left-0 mono text-[0.68rem] text-white/55 tracking-[0.15em]">
          TARGET · CARGO-LOCK
        </span>
        <span className="absolute -bottom-6 right-0 mono text-[0.68rem] text-[var(--brand-bright)] tracking-[0.15em] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" /> TRACKING
        </span>
      </div>

      {/* top coordinates strip */}
      <div className="hidden sm:flex absolute top-[88px] right-[4%] gap-6 mono text-[0.7rem] text-white/45 tracking-[0.18em] z-10">
        <span>SHIPMENT — 01</span>
        <span>41°12&apos;N · 72°03&apos;W</span>
        <span className="text-[var(--brand-bright)]">2026 · LIVE</span>
      </div>

      {/* ===== content ===== */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-x w-full pt-[120px] pb-10">
          <div className="max-w-[760px]">
            <Reveal>
              <span className="mono-label flex items-center gap-2.5">
                <span className="slash" aria-hidden />
                AUTOMOTIVE LOGISTICS NETWORK
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="h-title mt-5" style={{ fontSize: "clamp(2.5rem, 7vw, 5.6rem)", letterSpacing: "-0.03em", textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}>
                <span className="line-mask"><span>Доставляємо авто</span></span>
                <span className="line-mask"><span>з США та Європи</span></span>
                <span className="line-mask"><span className="text-gradient">під ключ.</span></span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <div className="grid sm:grid-cols-[auto_1fr] gap-x-5 gap-y-3 mt-7 max-w-xl">
                <div className="bar-accent self-stretch hidden sm:block" />
                <p className="text-[var(--muted)] text-lg leading-relaxed">
                  Від ставки на аукціоні до ключів у твоєму місті — повний цикл
                  логістики з прозорою ціною й живим GPS-трекінгом на кожному кілометрі.
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex flex-wrap items-center gap-4 mt-9">
                <Magnetic>
                  <a href="#calc" className="btn btn-primary">
                    Розрахувати доставку <ArrowRight width={18} height={18} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <button data-lead className="btn btn-ghost">
                    Залишити заявку <Send width={17} height={17} />
                  </button>
                </Magnetic>

                {/* inline rating, not a boxed pill */}
                <div className="flex items-center gap-3 sm:ml-2">
                  <div className="flex -space-x-2.5">
                    {["/images/av2.jpg", "/images/avf2.jpg", "/images/av5.jpg"].map((src, i) => (
                      <span key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#0a0f1d]">
                        <Image src={src} alt="" fill sizes="32px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                  <div className="leading-tight">
                    <span className="flex text-[#ffc34d]">
                      {[0, 1, 2, 3, 4].map((i) => <Star key={i} width={12} height={12} />)}
                    </span>
                    <span className="mono text-[0.64rem] text-[var(--faint)]">200+ ВІДГУКІВ · GOOGLE</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ===== bottom full-width telemetry bar ===== */}
      <Reveal delay={120} className="relative z-10 border-t border-[var(--border-strong)] bg-[rgba(5,7,15,0.55)] backdrop-blur-sm">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
            {[
              { k: "5—7", l: "ДНІВ / ПО ЄВРОПІ" },
              { k: "25—35", l: "ДНІВ / ЗІ США" },
              { k: "500+", l: "АВТО ДОСТАВЛЕНО" },
              { k: "98%", l: "КЛІЄНТІВ ПОВЕРТАЄТЬСЯ" },
            ].map((s, i) => (
              <div key={s.l} className={`py-6 ${i === 0 ? "pr-5" : "px-5"} flex items-center gap-4`}>
                <span className="idx text-[2rem] leading-none hidden sm:block">0{i + 1}</span>
                <span>
                  <span className="block font-display font-extrabold text-[1.7rem] leading-none tabular-nums">{s.k}</span>
                  <span className="mono-label mt-1.5 block">{s.l}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
