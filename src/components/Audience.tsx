import Image from "next/image";
import { AUDIENCE } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

const IMAGES = ["/images/car-bmw.jpg", "/images/hauler-cars.jpg", "/images/port-1.jpg"];

export function Audience() {
  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="mono-label flex items-center gap-2.5">
                <span className="slash" aria-hidden />
                AUDIENCE / 03 SEGMENTS
              </span>
              <h2 className="h-title text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] mt-3 max-w-2xl">
                Працюємо <span className="text-gradient">з усіма.</span><br />
                Підлаштовуємось під формат.
              </h2>
            </div>
          </div>
        </Reveal>

        {/* full-width photo split — like a magazine spread */}
        <div className="grid lg:grid-cols-3 border-y border-[var(--border)]">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.tag} delay={i * 90} className={i > 0 ? "lg:border-l border-[var(--border)]" : ""}>
              <article className="relative group h-full flex flex-col">
                {/* photo */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={IMAGES[i]}
                    alt={a.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,7,15,0.15) 0%, rgba(5,7,15,0.5) 60%, var(--bg) 100%), linear-gradient(110deg, rgba(20,40,120,0.32), transparent 55%)" }} />
                  {/* corner index */}
                  <span className="absolute top-4 left-4 idx-fill text-[2.2rem] leading-none">0{i + 1}</span>
                  <span className="absolute top-5 right-4 mono-label !text-white/70">{a.tag.toUpperCase()}</span>
                </div>

                {/* body */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-2xl">{a.title}</h3>
                  <p className="text-[var(--muted)] text-[0.95rem] mt-3 leading-relaxed flex-1">{a.text}</p>
                  <button data-lead className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[var(--brand-bright)] hover:gap-3 transition-all self-start">
                    Залишити заявку <ArrowRight width={15} height={15} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
