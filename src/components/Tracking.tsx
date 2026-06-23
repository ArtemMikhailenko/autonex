import { Reveal } from "./Reveal";

const EVENTS = [
  { time: "08:42", code: "AUC", text: "Лот виграно на Copart — BMW X5 2021", state: "done" },
  { time: "11:15", code: "PCK", text: "Авто забране з майданчика, фото-звіт надіслано", state: "done" },
  { time: "14:30", code: "PRT", text: "Доставлено в порт Newark, NJ", state: "done" },
  { time: "—",     code: "OCN", text: "Завантажено на MSC ANNA · контейнер MSKU-7741203", state: "live" },
  { time: "—",     code: "EU",  text: "Розвантаження · Клайпеда", state: "queued" },
  { time: "—",     code: "UA",  text: "Розмитнення · доставка авто-возом", state: "queued" },
];

function stateStyle(s: string) {
  if (s === "done") return { dot: "bg-emerald-400", text: "text-[var(--text)]", label: "OK" };
  if (s === "live") return { dot: "bg-[var(--brand-bright)] pulse-dot", text: "text-[var(--text)]", label: "LIVE" };
  return { dot: "bg-white/15", text: "text-[var(--faint)]", label: "WAIT" };
}

function MapDevice() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-8 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,107,255,0.3), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative clip-blade-tr overflow-hidden border border-[var(--border-strong)] bg-[#06090f]">
        {/* device chrome */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="mono text-[0.7rem] text-[var(--faint)] tabular-nums">
            track.autonex.com / LOT-38291
          </span>
          <span className="mono-label !text-[var(--brand-bright)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            LIVE
          </span>
        </div>

        {/* map */}
        <div className="relative">
          <svg viewBox="0 0 600 320" className="w-full h-auto block">
            <defs>
              <linearGradient id="rtg" x1="0" y1="0" x2="600" y2="0">
                <stop stopColor="#4f8bff" />
                <stop offset="1" stopColor="#2f6bff" />
              </linearGradient>
            </defs>
            <rect width="600" height="320" fill="#06090f" />
            {Array.from({ length: 17 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="600" y2={i * 20} stroke="#0f1a32" strokeWidth="0.6" />
            ))}
            {Array.from({ length: 31 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="320" stroke="#0f1a32" strokeWidth="0.6" />
            ))}
            {/* abstract continents */}
            <path d="M30 110 C90 70 160 60 200 90 C250 130 280 110 320 130 C350 145 380 130 400 150" stroke="#1c2c4d" strokeWidth="60" fill="none" opacity="0.35" strokeLinecap="round" />
            <path d="M420 100 C460 90 510 110 540 140 C560 160 570 200 540 220" stroke="#1c2c4d" strokeWidth="55" fill="none" opacity="0.35" strokeLinecap="round" />
            {/* route */}
            <path d="M70 200 C170 80 320 230 460 110 510 70 540 120 540 120" fill="none" stroke="#1c2c4d" strokeWidth="4" />
            <path d="M70 200 C170 80 320 230 460 110 510 70 540 120 540 120" fill="none" stroke="url(#rtg)" strokeWidth="2.4" className="route-dash" />
            {/* origin / destination */}
            <circle cx="70" cy="200" r="6" fill="#4f8bff" />
            <text x="80" y="218" fontFamily="ui-monospace, monospace" fontSize="10" fill="#9aa1ad">NEWARK · USA</text>
            <circle cx="540" cy="120" r="6" fill="#34d399" />
            <text x="468" y="108" fontFamily="ui-monospace, monospace" fontSize="10" fill="#9aa1ad">КИЇВ · UA</text>
            {/* current ship */}
            <g>
              <circle cx="345" cy="170" r="14" fill="rgba(79,139,255,0.18)" />
              <circle cx="345" cy="170" r="6" fill="#4f8bff" className="pulse-dot" />
              <text x="358" y="173" fontFamily="ui-monospace, monospace" fontSize="10" fill="#eef2fb">VESSEL · MSC ANNA</text>
            </g>
          </svg>
        </div>

        {/* footer telemetry strip */}
        <div className="grid grid-cols-4 border-t border-[var(--border)] mono text-[0.72rem]">
          {[
            ["VESSEL", "MSC ANNA"],
            ["SPEED", "18.4 KN"],
            ["ETA", "14 ДНІВ"],
            ["PROGRESS", "62%"],
          ].map(([k, v], i) => (
            <div key={k} className={`px-4 py-3 ${i > 0 ? "border-l border-[var(--border)]" : ""}`}>
              <div className="text-[var(--faint)]">{k}</div>
              <div className="text-[var(--text)] mt-0.5 tabular-nums">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Tracking() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12">
            <div>
              <span className="mono-label flex items-center gap-2.5">
                <span className="slash" aria-hidden />
                CONTROL / LIVE TRACKING
              </span>
              <h2 className="h-title text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] mt-3 max-w-2xl">
                Бачиш авто.<br />
                Бачиш кожен <span className="text-gradient">кілометр.</span>
              </h2>
            </div>
            <p className="mono text-xs text-[var(--faint)] lg:text-right max-w-[260px]">
              GPS · vessel-AIS · фото-звіти.<br />
              Жодних «зателефонуйте завтра».
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12">
          <Reveal>
            <MapDevice />
          </Reveal>

          {/* event log — looks like a real timeline */}
          <Reveal delay={120}>
            <div className="mono-label mb-4">EVENT LOG / LOT-38291</div>
            <ol className="border-t border-[var(--border)]">
              {EVENTS.map((e) => {
                const s = stateStyle(e.state);
                return (
                  <li key={e.code} className="grid grid-cols-[60px_1fr_auto] gap-4 items-start py-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${s.dot} mt-2`} />
                      <span className="mono text-xs text-[var(--faint)] tabular-nums">{e.time}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="mono-label !text-[var(--brand-bright)]">{e.code}</span>
                      </div>
                      <div className={`text-sm mt-1 ${s.text}`}>{e.text}</div>
                    </div>
                    <span className="mono text-[0.66rem] text-[var(--faint)] mt-1">{s.label}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
