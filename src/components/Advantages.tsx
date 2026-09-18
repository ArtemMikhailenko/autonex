import Image from "next/image";
import { LOGISTICS_POINTS, ADVANTAGES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Truck, Shield, Doc, Headset } from "./icons";

const ICONS = { Truck, Shield, Doc, Headset } as const;

export function Advantages() {
  return (
    <section id="why" className="py-5 scroll-mt-24">
      <div className="container-x">
        <div className="panel relative overflow-hidden min-h-[560px] lg:min-h-[640px]">
          {/* the photo IS the block — not an illustration tucked in a corner */}
          <Image
            src="/images/port-ship.webp"
            alt="Нічний порт відправлення — завантаження судна"
            fill
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-[58%_center] sm:object-[72%_center] lg:object-[right_center]"
          />
          {/* scrim only where type lands: left for the copy, bottom for the manifest */}
          {/* narrow screens have no room for a side scrim — darken evenly instead */}
          <div
            className="absolute inset-0 sm:hidden pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,11,22,0.86) 0%, rgba(7,11,22,0.74) 46%, rgba(7,11,22,0.9) 100%)",
            }}
          />
          <div
            className="hidden sm:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,11,22,0.95) 0%, rgba(7,11,22,0.86) 30%, rgba(7,11,22,0.45) 58%, rgba(7,11,22,0.12) 82%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 28%, rgba(7,11,22,0.5) 50%, rgba(7,11,22,0.9) 70%, rgba(7,11,22,0.96) 100%)",
            }}
          />

          <div className="relative p-7 sm:p-10 lg:p-12 flex flex-col min-h-[560px] lg:min-h-[640px]">
            <Reveal>
              <span className="eyebrow text-[var(--brand-bright)] flex items-center gap-2.5">
                <span className="w-6 h-px bg-[var(--brand-bright)]" />
                НЕ АГРЕГАТОР
              </span>
              <h2 className="h-title text-[2.2rem] sm:text-[3rem] mt-4">
                <span className="text-gradient">Власна логістика.</span>
              </h2>
              <p className="text-[var(--muted)] text-lg mt-5 max-w-[26rem] leading-relaxed">
                Ми не посередники. Прямі контракти з перевізниками та власні люди
                в кожному порту відправлення.
              </p>

              {/* proof points — one tight line, not a boxed checklist */}
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 max-w-[34rem]">
                {LOGISTICS_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-[#c3d3ef]">
                    <span className="w-1 h-1 rounded-full bg-[var(--brand-bright)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* manifest row — hairlines instead of four identical cards */}
            <div
              id="services"
              className="mt-auto pt-10 sm:pt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-7 gap-y-7 sm:gap-y-8 scroll-mt-24"
            >
              {ADVANTAGES.map((a, i) => {
                const Icon = ICONS[a.icon as keyof typeof ICONS];
                return (
                  <Reveal key={a.title} delay={i * 80}>
                    <div
                      className={`border-t border-white/[0.14] pt-4 ${
                        i > 0 ? "lg:border-l lg:border-white/[0.1] lg:pl-7 lg:-ml-7" : ""
                      }`}
                    >
                      <Icon width={19} height={19} className="text-[var(--brand-bright)]" />
                      <h3 className="font-display font-semibold text-[0.92rem] sm:text-[1.02rem] leading-snug mt-3 sm:min-h-[2.6em]">{a.title}</h3>
                      <p className="text-[var(--muted)] text-[0.8rem] sm:text-sm mt-1.5 leading-relaxed">{a.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
