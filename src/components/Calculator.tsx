"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowRight, Send } from "./icons";
import { CONTACT } from "@/lib/data";

const ORIGINS = [
  { id: "usa", label: "США", base: 1350, freight: 950, days: [25, 35] },
  { id: "eu", label: "Європа", base: 750, freight: 480, days: [5, 7] },
] as const;

const TYPES = [
  { id: "sedan", label: "Легкове авто", k: 1 },
  { id: "suv", label: "Кросовер / SUV", k: 1.28 },
  { id: "jeep", label: "Позашляховик", k: 1.55 },
  { id: "ev", label: "Електромобіль", k: 1.18 },
  { id: "moto", label: "Мотоцикл", k: 0.7 },
] as const;

const CITIES = [
  { id: "kyiv", label: "Київ, Україна", add: 0 },
  { id: "lviv", label: "Львів, Україна", add: 40 },
  { id: "odesa", label: "Одеса, Україна", add: 60 },
  { id: "dnipro", label: "Дніпро, Україна", add: 90 },
  { id: "kharkiv", label: "Харків, Україна", add: 120 },
] as const;

function useCountUp(target: number, ms = 600) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    const from = val;
    const diff = target - from;
    if (diff === 0) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + diff * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

/** segmented pill selector — replaces the generic <select> dropdowns */
function Seg<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: ReadonlyArray<{ id: T; label: string }>;
}) {
  return (
    <div>
      <div className="mono-label mb-2.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className={`px-3.5 py-2 text-sm rounded-lg border transition-colors ${
                active
                  ? "bg-[rgba(47,107,255,0.18)] border-[var(--brand-bright)] text-[var(--text)]"
                  : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Calculator() {
  const [origin, setOrigin] = useState<typeof ORIGINS[number]["id"]>("usa");
  const [type, setType] = useState<typeof TYPES[number]["id"]>("sedan");
  const [city, setCity] = useState<typeof CITIES[number]["id"]>("kyiv");

  const { total, freight, customs, local, days } = useMemo(() => {
    const o = ORIGINS.find((x) => x.id === origin)!;
    const t = TYPES.find((x) => x.id === type)!;
    const c = CITIES.find((x) => x.id === city)!;
    const freight = Math.round(o.freight * t.k);
    const logistics = Math.round(o.base * t.k * 0.45);
    const local = Math.round((220 + c.add) * (t.k > 1.3 ? 1.2 : 1));
    const total = freight + logistics + local;
    return { total, freight, customs: logistics, local, days: o.days };
  }, [origin, type, city]);

  const animated = useCountUp(total);

  function openLead() {
    const o = ORIGINS.find((x) => x.id === origin)!;
    const t = TYPES.find((x) => x.id === type)!;
    const c = CITIES.find((x) => x.id === city)!;
    const ctx = `${o.label} → ${c.label.split(",")[0]} · ${t.label} · від $${total.toLocaleString("en-US")} · ${days[0]}–${days[1]} днів`;
    window.dispatchEvent(new CustomEvent("autonex:lead", { detail: { context: ctx } }));
  }

  return (
    <section id="calc" className="relative py-20 lg:py-28">
      <div className="container-x">
        {/* editorial header */}
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-10">
            <div>
              <span className="mono-label flex items-center gap-2.5">
                <span className="slash" aria-hidden />
                ESTIMATE / CALCULATOR
              </span>
              <h2 className="h-title text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] mt-3 max-w-xl">
                Прорахуй вартість<br />за <span className="text-gradient">30 секунд.</span>
              </h2>
            </div>
            <p className="mono text-xs text-[var(--faint)] lg:text-right max-w-[280px]">
              Орієнтовна цифра без зобовʼязань.<br />
              Точну вартість фіксуємо листом на пошту.
            </p>
          </div>
        </Reveal>

        {/* layout: poster price (left) + spec inputs (right) */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-px bg-[var(--border)] border border-[var(--border)]">
          {/* === POSTER PRICE === */}
          <Reveal>
            <div className="relative p-8 sm:p-10 bg-[var(--bg)] min-h-[420px] flex flex-col"
                 style={{ background: "linear-gradient(160deg, rgba(47,107,255,0.10), rgba(8,13,26,0.4)), var(--bg)" }}>
              <div className="diag-stripes absolute inset-0 pointer-events-none" />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="mono-label">ORIENTATIVE TOTAL · USD</span>
                  <span className="mono text-xs text-[var(--faint)]">
                    LANE / {ORIGINS.find((x) => x.id === origin)?.label.toUpperCase()} → UA
                  </span>
                </div>

                <div className="mt-auto">
                  <div className="flex items-end gap-3">
                    <span className="font-display font-extrabold leading-none text-gradient tabular-nums text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem]">
                      ${animated.toLocaleString("en-US")}
                    </span>
                    <span className="mono text-[var(--faint)] text-sm mb-3">/ ВІД</span>
                  </div>
                  <div className="mt-2 mono text-sm text-[var(--muted)] tabular-nums">
                    ETA · {days[0]}—{days[1]} ДНІВ
                  </div>

                  {/* breakdown — telemetry table */}
                  <ul className="mt-7 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                    {[
                      { code: "01", label: "ФРАХТ / OCEAN", val: freight },
                      { code: "02", label: "ОФОРМЛЕННЯ / DDP", val: customs },
                      { code: "03", label: "ДОСТАВКА / UA INLAND", val: local },
                    ].map((row) => (
                      <li key={row.code} className="grid grid-cols-[auto_1fr_auto] gap-4 items-baseline py-3">
                        <span className="mono-label">{row.code}</span>
                        <span className="text-sm text-[var(--text)]">{row.label}</span>
                        <span className="mono font-semibold tabular-nums">${row.val.toLocaleString("en-US")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* === INPUT SPEC === */}
          <Reveal delay={120}>
            <div className="p-8 sm:p-10 bg-[var(--bg)] h-full flex flex-col gap-7">
              <Seg label="ORIGIN / ЗВІДКИ" value={origin} onChange={setOrigin} options={ORIGINS} />
              <Seg label="VEHICLE / ТИП АВТО" value={type} onChange={setType} options={TYPES} />
              <Seg label="DESTINATION / КУДИ" value={city} onChange={setCity} options={CITIES} />

              <div className="mt-auto pt-4 border-t border-[var(--border)]">
                <p className="mono text-[0.72rem] text-[var(--faint)] leading-relaxed mb-4">
                  * Розрахунок не враховує комісії аукціону та індивідуальні умови
                  страхування. Точний інвойс — у відповідь на заявку.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button onClick={openLead} className="btn btn-primary justify-center flex-1">
                    Точний прорахунок <ArrowRight width={17} height={17} />
                  </button>
                  <a href={CONTACT.telegram} className="btn btn-ghost justify-center">
                    Telegram <Send width={15} height={15} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
