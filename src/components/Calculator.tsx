"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "./icons";

const ORIGINS = [
  { id: "de", label: "Німеччина", inland: 550, km: "1 850", days: "12—16" },
  { id: "pl", label: "Польща", inland: 480, km: "1 100", days: "8—12" },
  { id: "lt", label: "Литва", inland: 520, km: "1 200", days: "9—13" },
  { id: "nl", label: "Нідерланди", inland: 600, km: "2 100", days: "13—17" },
  { id: "us", label: "США", inland: 1350, km: "9 500", days: "28—35" },
] as const;

const DELIVERY = [
  { id: "roro", label: "RoRo", ocean: 850 },
  { id: "container", label: "Контейнер", ocean: 1100 },
] as const;

const TYPES = [
  { id: "sedan", label: "Легковий", k: 1 },
  { id: "suv", label: "Кросовер / SUV", k: 1.2 },
  { id: "jeep", label: "Позашляховик", k: 1.4 },
  { id: "ev", label: "Електромобіль", k: 1.15 },
] as const;

function useCountUp(target: number, ms = 650) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    const from = val;
    const diff = target - from;
    if (diff === 0) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setVal(Math.round(from + diff * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: ReadonlyArray<{ id: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-[var(--faint)] mb-1.5">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent border-0 border-b border-white/15 pt-1.5 pb-3 sm:pt-0 sm:pb-2 pr-6 text-[0.98rem] font-display font-semibold text-white focus:outline-none focus:border-[var(--brand-bright)] transition-colors cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id} className="bg-[#0c1222]">
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 bottom-3.5 sm:bottom-2.5 w-1.5 h-1.5 border-r border-b border-[var(--brand-bright)] rotate-45" />
      </div>
    </label>
  );
}

export function Calculator() {
  const [origin, setOrigin] = useState<string>("de");
  const [delivery, setDelivery] = useState<string>("roro");
  const [type, setType] = useState<string>("sedan");

  const o = ORIGINS.find((x) => x.id === origin)!;
  const d = DELIVERY.find((x) => x.id === delivery)!;
  const t = TYPES.find((x) => x.id === type)!;

  const { total, port, ocean, customs } = useMemo(() => {
    const port = Math.round(o.inland);
    const ocean = Math.round(d.ocean * t.k);
    const customs = Math.round(378 * t.k);
    return { total: port + ocean + customs, port, ocean, customs };
  }, [o, d, t]);

  const animated = useCountUp(total);

  function openLead() {
    const ctx = `${o.label} · ${d.label} · ${t.label} · від $${total.toLocaleString("en-US")}`;
    window.dispatchEvent(new CustomEvent("autonex:lead", { detail: { context: ctx } }));
  }

  return (
    <section id="calc" className="py-5 scroll-mt-24">
      <div className="container-x">
        <div className="panel relative min-h-[580px]">
          {/* directional light from the right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(75% 90% at 85% 58%, rgba(47,107,255,0.26), transparent 70%)" }}
          />

          {/* LAYER 0 — oversized outlined price, sits BEHIND the car */}
          <div className="hidden sm:block absolute right-10 top-14 z-0 text-right select-none pointer-events-none">
            <div className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--faint)] mb-1">
              {o.label} → Україна · {d.label}
            </div>
            <div
              className="mono font-medium tabular-nums leading-[0.85] text-transparent"
              style={{
                fontSize: "clamp(3.4rem, 8.2vw, 7.2rem)",
                letterSpacing: "-0.04em",
                WebkitTextStroke: "1.5px rgba(120,175,255,0.52)",
              }}
            >
              ${animated.toLocaleString("en-US")}
            </div>
          </div>

          {/* LAYER 1 — the car, bleeding past the right edge */}
          <div className="hidden sm:block absolute z-10 pointer-events-none bottom-[112px] right-[-20%] w-[74%] h-[250px]">
            <div
              className="absolute left-[10%] right-[12%] bottom-[2px] h-[26px]"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.9), transparent 72%)", filter: "blur(10px)" }}
            />
            <div
              className="absolute left-0 right-0 -bottom-4 h-[80px]"
              style={{ background: "radial-gradient(ellipse 42% 55% at 50% 100%, rgba(70,145,255,0.55), transparent 70%)", filter: "blur(14px)" }}
            />
            <Image src="/images/calc-car.webp" alt="" fill sizes="900px" className="object-contain object-bottom" />
          </div>

          {/* LAYER 2 — copy + controls */}
          <div className="relative z-20 p-7 sm:p-10 flex flex-col min-h-[580px]">
            <span className="eyebrow text-[var(--brand-bright)]">РОЗРАХУЙ ЗА 30 СЕКУНД</span>
            <h2 className="h-title text-[1.8rem] sm:text-[2.3rem] mt-3 max-w-[15ch]">
              Скільки коштує доставка <span className="text-gradient">вашого авто?</span>
            </h2>

            {/* phone: the layers become a stack — price, then the car, then the controls */}
            <div className="sm:hidden mt-7">
              <div className="text-[0.58rem] uppercase tracking-[0.2em] text-[var(--faint)] mb-1">
                {o.label} → Україна · {d.label}
              </div>
              <div
                className="mono font-medium tabular-nums leading-[0.9] text-transparent"
                style={{
                  fontSize: "clamp(2.6rem, 15vw, 4rem)",
                  letterSpacing: "-0.04em",
                  WebkitTextStroke: "1.3px rgba(120,175,255,0.6)",
                }}
              >
                ${animated.toLocaleString("en-US")}
              </div>
              <div className="relative h-[132px] -mr-7 mt-2">
                <div
                  className="absolute left-[8%] right-[10%] bottom-[2px] h-[20px]"
                  style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.9), transparent 72%)", filter: "blur(8px)" }}
                />
                <Image src="/images/calc-car.webp" alt="" fill sizes="420px" className="object-contain object-bottom object-right" />
              </div>
            </div>

            {/* spec read-out — fills the gap, reads like a shipping manifest */}
            <div className="mt-9 max-w-[300px] relative">
              <span className="absolute -left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand-bright)] via-white/10 to-transparent" />
              {[
                { k: "Відстань", v: `≈ ${o.km} км` },
                { k: "Термін", v: `${o.days} днів` },
                { k: "Страхування", v: "включено" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="flex items-baseline justify-between gap-4 py-2 border-b border-white/[0.06]"
                >
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--faint)]">{r.k}</span>
                  <span className="mono text-[0.82rem] text-[#c3d3ef] tabular-nums">{r.v}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 max-w-[540px]">
              <div className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
                <Field label="Країна" value={origin} onChange={setOrigin} options={ORIGINS} />
                <Field label="Доставка" value={delivery} onChange={setDelivery} options={DELIVERY} />
                <Field label="Тип авто" value={type} onChange={setType} options={TYPES} />
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
                {[
                  { label: "Порт", val: port },
                  { label: "Море", val: ocean },
                  { label: "Митниця", val: customs },
                ].map((r) => (
                  <div key={r.label} className="flex items-baseline gap-1.5">
                    <span className="text-[0.58rem] uppercase tracking-[0.18em] text-[var(--faint)]">{r.label}</span>
                    <span className="font-display font-semibold tabular-nums text-sm">
                      ${r.val.toLocaleString("en-US")}
                    </span>
                  </div>
                ))}
                <button onClick={openLead} className="btn btn-primary justify-center w-full sm:w-auto !py-3 sm:!py-2.5 !px-5 !text-sm sm:ml-auto">
                  Точний прорахунок <ArrowRight width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
