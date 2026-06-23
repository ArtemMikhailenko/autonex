import Image from "next/image";
import { REVIEWS } from "@/lib/data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { Star } from "./icons";

function Card({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <div className="card p-6 w-[348px] shrink-0 mx-3 relative overflow-hidden">
      {/* big quote glyph */}
      <span className="absolute -top-3 right-4 font-display font-black text-[5rem] leading-none text-[rgba(47,107,255,0.1)] select-none">
        &rdquo;
      </span>
      <div className="flex items-center gap-2">
        <span className="slash" aria-hidden />
        <div className="flex text-[#ffc34d] gap-0.5">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} width={15} height={15} />
          ))}
        </div>
      </div>
      <p className="text-[var(--text)] text-[0.95rem] mt-4 leading-relaxed relative">{r.text}</p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[var(--border)]">
        <span className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--border-strong)]">
          <Image src={r.avatar} alt={r.name} fill sizes="44px" className="object-cover" />
        </span>
        <span>
          <span className="block font-semibold text-sm">{r.name}</span>
          <span className="block text-xs text-[var(--faint)]">{r.city}</span>
        </span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHead
          align="center"
          eyebrow="Відгуки"
          title={<>Що кажуть наші клієнти</>}
          sub="Реальні відгуки реальних людей. 200+ оцінок із середнім балом 5.0."
        />
      </div>

      <Reveal delay={120} className="mt-12 marquee-mask">
        <div className="marquee-track">
          {loop.map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
