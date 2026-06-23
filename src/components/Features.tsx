import Image from "next/image";
import { FEATURES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Doc, Bolt, Eye, Headset, Handshake, Shield, ArrowRight } from "./icons";

const map = { Doc, Bolt, Eye, Headset, Handshake, Shield } as const;

export function Features() {
  const [hero, ...rest] = FEATURES;
  const HeroIcon = map[hero.icon as keyof typeof map];

  return (
    <section id="why" className="relative py-20 lg:py-28">
      <div className="container-x">
        {/* offset header */}
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12">
            <div>
              <span className="mono-label flex items-center gap-2.5">
                <span className="slash" aria-hidden />
                WHY AUTONEX / 06 PILLARS
              </span>
              <h2 className="h-title text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] mt-3 max-w-2xl">
                Не агрегатор.<br />
                <span className="text-gradient">Власна логістика.</span>
              </h2>
            </div>
            <p className="mono text-xs text-[var(--faint)] lg:text-right max-w-[260px]">
              500+ авто доставлено · 12+ країн · 4+ роки · 98% повертаються
            </p>
          </div>
        </Reveal>

        {/* asymmetric: 1 big feature with photo, rest as spec rows */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-x-12 gap-y-10">
          {/* big feature card */}
          <Reveal>
            <article className="relative">
              <div className="relative clip-blade overflow-hidden aspect-[5/4] border border-[var(--border-strong)]">
                <Image
                  src="/images/port-1.jpg"
                  alt={hero.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,7,15,0.25) 0%, rgba(5,7,15,0.05) 40%, rgba(5,7,15,0.92) 100%), linear-gradient(110deg, rgba(20,40,120,0.3), transparent 60%)" }} />
                <span className="absolute bottom-0 right-0 w-[48px] h-[48px] -mb-px -mr-px"
                      style={{ background: "linear-gradient(135deg, transparent 50%, var(--brand) 50%)" }} aria-hidden />

                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <span className="mono-label !text-[var(--brand-bright)]">FEATURE / {hero.code}</span>
                  <span className="mono text-xs text-white/50">{hero.spec}</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end gap-4">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-[rgba(47,107,255,0.18)] border border-[rgba(47,107,255,0.35)] text-[var(--brand-bright)] backdrop-blur shrink-0">
                      <HeroIcon width={22} height={22} />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-[1.75rem]">{hero.title}</h3>
                      <p className="text-white/80 text-sm mt-2 max-w-md leading-relaxed">{hero.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* spec-row list */}
          <div className="lg:pt-2">
            {rest.map((f, i) => {
              const Icon = map[f.icon as keyof typeof map];
              return (
                <Reveal key={f.code} delay={i * 70}>
                  <div className="spec-row group cursor-default">
                    <span className="grid place-items-center w-11 h-11 rounded-lg bg-[rgba(47,107,255,0.1)] border border-[rgba(47,107,255,0.2)] text-[var(--brand-bright)] shrink-0">
                      <Icon width={20} height={20} />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="mono-label">{f.code}</span>
                        <h4 className="font-display font-bold text-lg">{f.title}</h4>
                      </div>
                      <p className="text-[var(--muted)] text-sm mt-1.5 leading-relaxed">{f.text}</p>
                    </div>
                    <span className="mono text-[0.7rem] text-[var(--faint)] self-start tracking-wider text-right hidden sm:block">
                      {f.spec}
                    </span>
                  </div>
                </Reveal>
              );
            })}

            <Reveal>
              <button data-lead className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[var(--brand-bright)] hover:gap-3 transition-all">
                Залишити заявку <ArrowRight width={16} height={16} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
