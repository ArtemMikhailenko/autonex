import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowRight, Send } from "./icons";
import { CONTACT } from "@/lib/data";

export function CtaBanner() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative card clip-blade overflow-hidden min-h-[340px] flex items-center">
            {/* real photo background */}
            <Image
              src="/images/car-porsche.jpg"
              alt="Авто на доставку з Європи"
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5,7,15,0.95) 0%, rgba(5,7,15,0.82) 38%, rgba(5,7,15,0.35) 100%), linear-gradient(120deg, rgba(20,40,120,0.4), transparent 55%)",
              }}
            />
            <div
              className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "rgba(47,107,255,0.35)" }}
              aria-hidden
            />

            <div className="relative p-8 sm:p-12 max-w-xl">
              <h2 className="h-title text-[2rem] sm:text-[2.8rem]">
                Готові пригнати<br />своє <span className="text-gradient">авто?</span>
              </h2>
              <p className="text-[var(--muted)] mt-4 text-lg max-w-md">
                Отримайте точний розрахунок вартості доставки прямо зараз — без
                зобовʼязань і зайвих дзвінків.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <a href="#calc" className="btn btn-primary">
                  Розрахувати доставку <ArrowRight width={18} height={18} />
                </a>
                <a href={CONTACT.telegram} className="btn btn-ghost">
                  Написати в Telegram <Send width={17} height={17} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
