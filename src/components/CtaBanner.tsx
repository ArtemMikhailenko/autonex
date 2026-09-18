import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowRight, Send } from "./icons";
import { CONTACT } from "@/lib/data";

export function CtaBanner() {
  return (
    <section>
      <Reveal>
        <div className="relative w-full overflow-hidden flex items-center min-h-[500px] sm:min-h-[460px] xl:min-h-0 xl:aspect-[2079/756] xl:max-h-[620px]">
            <Image
              src="/images/cta-hauler.webp"
              alt="Автовоз із авто на вечірній трасі"
              fill
              unoptimized
              sizes="100vw"
              className="object-cover object-[76%_center] sm:object-center"
            />

            {/* the frame already holds dark road on the left — lift it just enough
                for type, and leave the hauler side untouched */}
            <div
              className="absolute inset-0 hidden sm:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.88) 22%, rgba(5,8,16,0.6) 40%, rgba(5,8,16,0.2) 56%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 sm:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,8,16,0.42) 0%, rgba(5,8,16,0.68) 45%, rgba(5,8,16,0.78) 100%)",
              }}
            />

            {/* dissolve the bleed into the page above and below */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, var(--bg) 0%, rgba(7,11,22,0.55) 9%, transparent 24%, transparent 74%, rgba(9,14,27,0.65) 91%, var(--bg-2) 100%)",
              }}
            />

            <div className="relative w-full container-x py-12">
              <div className="max-w-[33rem]">
                <span className="eyebrow text-[var(--brand-bright)] flex items-center gap-2.5">
                  <span className="w-6 h-px bg-[var(--brand-bright)]" />
                  ГОТОВІ ПРИГНАТИ СВОЄ АВТО?
                </span>
                <h2 className="h-title text-[2rem] sm:text-[2.6rem] lg:text-[2.9rem] mt-4">
                  Почніть доставку
                  <br />
                  вже <span className="text-gradient">сьогодні</span>
                </h2>
                <p className="text-[var(--muted)] text-lg mt-5 max-w-md leading-relaxed">
                  Розрахунок за 30 секунд. Відповідаємо протягом 15 хвилин
                  у робочий час.
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mt-8">
                  <button data-lead data-lead-context="Фінальний банер" className="btn btn-primary justify-center w-full sm:w-auto">
                    Розрахувати вартість <ArrowRight width={18} height={18} />
                  </button>
                  <a href={CONTACT.telegram} className="btn btn-ghost justify-center w-full sm:w-auto">
                    Написати в Telegram <Send width={17} height={17} />
                  </a>
                </div>

                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex flex-col items-start gap-1.5 sm:flex-row sm:items-baseline sm:gap-3 mt-7 py-1.5 group"
                >
                  <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--faint)]">
                    або подзвоніть
                  </span>
                  <span className="mono text-[1.02rem] text-white tabular-nums whitespace-nowrap border-b border-white/20 group-hover:border-[var(--brand-bright)] transition-colors">
                    {CONTACT.phone}
                  </span>
                </a>
              </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
