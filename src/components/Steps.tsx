"use client";

import { useState } from "react";
import Image from "next/image";
import { STEPS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

export function Steps() {
  const [active, setActive] = useState(0);

  return (
    <section id="how" className="py-5 scroll-mt-24">
      <div className="container-x">
        <div className="panel p-7 sm:p-10 lg:p-12">
          {/* header */}
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-10 lg:mb-12">
              <div>
                <span className="eyebrow text-[var(--muted)]">ПРОЦЕС ДОСТАВКИ</span>
                <h2 className="h-title text-[2rem] sm:text-[2.6rem] mt-3">
                  <span className="lg:whitespace-nowrap">Від ставки до ключів —</span>
                  <br />
                  <span className="text-gradient">35 днів</span>
                </h2>
              </div>
              <p className="text-[var(--muted)] max-w-none sm:max-w-sm lg:text-right leading-relaxed">
                Повний цикл під ключ без зайвих турбот. Ви отримуєте авто — ми беремо
                на себе все інше.
              </p>
            </div>
          </Reveal>

          {/* ===== desktop: expanding panels ===== */}
          <Reveal>
            <div className="hidden lg:flex gap-2.5 h-[460px]">
              {STEPS.map((s, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={s.n}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "flex-[4.2] border-[rgba(120,190,255,0.45)]"
                        : "flex-[1] border-[rgba(255,255,255,0.07)]"
                    }`}
                  >
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes={isActive ? "60vw" : "14vw"}
                      className={`object-cover transition-transform duration-[900ms] ${
                        isActive ? "scale-100" : "scale-[1.35]"
                      }`}
                    />
                    {/* scrim */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: isActive
                          ? "linear-gradient(180deg, rgba(7,11,22,0.15) 0%, rgba(7,11,22,0.25) 45%, rgba(7,11,22,0.93) 100%)"
                          : "linear-gradient(180deg, rgba(7,11,22,0.65) 0%, rgba(7,11,22,0.88) 100%)",
                      }}
                    />

                    {/* number — always visible, top */}
                    <span
                      className={`absolute top-5 left-0 right-0 font-display font-bold tabular-nums leading-none transition-all duration-500 ${
                        isActive
                          ? "text-[2.4rem] text-[var(--brand-bright)] text-left pl-7"
                          : "text-[1.8rem] text-[#8fb2ee]/80 text-center"
                      }`}
                    >
                      {s.n}
                    </span>

                    {/* collapsed: vertical title */}
                    <div
                      className={`absolute inset-x-0 bottom-7 flex justify-center transition-opacity duration-300 ${
                        isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                    >
                      <span
                        className="font-display font-semibold text-[0.95rem] text-[#dbe6fb] tracking-wide"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {s.title}
                      </span>
                    </div>

                    {/* expanded: full caption */}
                    <div
                      className={`absolute inset-x-0 bottom-0 p-7 transition-all duration-500 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <h3 className="font-display font-bold text-2xl">{s.title}</h3>
                      <p className="text-[#c3d3ef] text-[0.95rem] mt-2.5 max-w-md leading-relaxed">
                        {s.text}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-bright)] mt-4">
                        Детальніше <ArrowRight width={15} height={15} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* progress rail */}
          <div className="hidden lg:flex gap-2.5 mt-5">
            {STEPS.map((s, i) => (
              <span
                key={s.n}
                className={`h-[3px] rounded-full transition-all duration-[650ms] ${
                  active === i ? "flex-[4.2] bg-[var(--brand-bright)]" : "flex-[1] bg-white/12"
                }`}
                style={active === i ? { boxShadow: "0 0 12px rgba(47,130,255,0.8)" } : undefined}
              />
            ))}
          </div>

          {/* ===== phone: swipe strip. five stacked cards was a 1700px wall ===== */}
          <div className="lg:hidden snap-strip flex sm:grid sm:grid-cols-2 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-7 px-7 sm:mx-0 sm:px-0 pb-1">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="snap-start shrink-0 w-[78%] sm:w-auto">
                <article className="relative rounded-2xl overflow-hidden border border-[var(--border)] h-[290px] sm:h-[250px]">
                  <Image src={s.img} alt={s.title} fill sizes="(max-width:640px) 78vw, 45vw" className="object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,11,22,0.2) 0%, rgba(7,11,22,0.92) 100%)" }} />
                  <span className="absolute top-4 left-5 font-display font-bold text-2xl text-[var(--brand-bright)] tabular-nums">{s.n}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display font-bold text-lg">{s.title}</h3>
                    <p className="text-[#c3d3ef] text-sm mt-1.5 leading-relaxed">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
