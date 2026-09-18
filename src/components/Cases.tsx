"use client";

import { useState } from "react";
import Image from "next/image";
import { CASES, REVIEWS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ArrowRight, Star } from "./icons";

export function Cases() {
  const [ri, setRi] = useState(0);
  const review = REVIEWS[ri];

  return (
    <section id="cases" className="py-14 sm:py-20 scroll-mt-24">
      <div className="container-x">
        {/* heading + the review share one line — no boxes, just type */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <Reveal>
            <span className="eyebrow text-[var(--brand-bright)] flex items-center gap-2.5">
              <span className="w-6 h-px bg-[var(--brand-bright)]" />
              РЕАЛЬНІ КЕЙСИ
            </span>
            <h2 className="h-title text-[2rem] sm:text-[2.8rem] mt-3">Наші останні доставки</h2>
          </Reveal>

          <Reveal
            delay={100}
            className="lg:max-w-[360px] lg:border-l lg:border-white/[0.1] lg:pl-8"
          >
            <div id="reviews" className="scroll-mt-24">
              <p className="text-[var(--text)] text-[1.02rem] leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm text-[var(--faint)]">
                  {review.name}, {review.city}
                </span>
                <span className="flex gap-0.5 text-[var(--brand-bright)]">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} width={13} height={13} />
                  ))}
                </span>
                <span className="flex gap-1.5 ml-auto">
                  {REVIEWS.map((r, i) => (
                    <button
                      key={r.name}
                      onClick={() => setRi(i)}
                      aria-label={`Відгук ${i + 1}`}
                      aria-current={i === ri}
                      className="grid place-items-center h-10 px-1.5 -my-3 group/dot"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          i === ri
                            ? "w-5 bg-[var(--brand-bright)]"
                            : "w-1.5 bg-white/25 group-hover/dot:bg-white/45"
                        }`}
                      />
                    </button>
                  ))}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* the deliveries themselves — photo, then caption. no card chrome. */}
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-7 mt-12 lg:mt-14">
          {CASES.map((c, i) => (
            <Reveal key={c.model} delay={i * 90}>
              <article className="group">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={c.img}
                    alt={`${c.model} ${c.year} — доставка з ${c.country}`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>

                <div className="border-t border-white/[0.14] mt-5 pt-4">
                  <span className="mono text-[0.68rem] tracking-[0.2em] text-[var(--faint)] flex items-center gap-2">
                    <span className="leading-none">{c.flag}</span>
                    {c.country.toUpperCase()}
                  </span>

                  <div className="flex items-end justify-between gap-3 mt-2.5">
                    <div>
                      <h3 className="font-display font-semibold text-[1.15rem] leading-tight">
                        {c.model} <span className="text-[var(--faint)] font-medium">{c.year}</span>
                      </h3>
                      <div className="flex items-baseline gap-2.5 mt-2">
                        <span className="mono text-[1.05rem] text-white tabular-nums">{c.price}</span>
                        <span className="text-[var(--faint)] text-sm">· {c.days}</span>
                      </div>
                    </div>
                    <button
                      data-lead
                      aria-label={`Замовити прорахунок — ${c.model}`}
                      className="grid place-items-center w-10 h-10 rounded-xl shrink-0 text-[var(--brand-bright)] border border-white/[0.12] hover:border-[rgba(120,190,255,0.45)] hover:bg-[rgba(47,107,255,0.14)] transition-colors"
                    >
                      <ArrowRight width={17} height={17} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
