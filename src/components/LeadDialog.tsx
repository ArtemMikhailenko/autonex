"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, Send, Check, Phone } from "./icons";
import { CONTACT } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export function LeadDialog() {
  const [mounted, setMounted] = useState(false); // in the DOM
  const [shown, setShown] = useState(false); // slid in
  const [context, setContext] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const close = useCallback(() => {
    setShown(false);
    // let the slide-out finish before unmounting
    setTimeout(() => {
      setMounted(false);
      setStatus("idle");
    }, 420);
  }, []);

  const openSheet = useCallback((ctx: string) => {
    setContext(ctx);
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, []);

  // open from any [data-lead] element, or a custom event with optional context
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("[data-lead]");
      if (el) {
        e.preventDefault();
        openSheet((el as HTMLElement).dataset.leadContext ?? "");
      }
    };
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail as { context?: string } | undefined;
      openSheet(detail?.context ?? "");
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", onClick);
    window.addEventListener("autonex:lead", onEvent as EventListener);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("autonex:lead", onEvent as EventListener);
      document.removeEventListener("keydown", onKey);
    };
  }, [close, openSheet]);

  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, context }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      {/* backdrop */}
      <div
        onClick={close}
        aria-hidden
        className={`absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity duration-400 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* sheet: rises from the bottom on phones, slides in from the right on desktop */}
      <aside
        className={`absolute flex flex-col overflow-hidden
          inset-x-0 bottom-0 max-h-[92vh] rounded-t-[26px]
          sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[430px] sm:rounded-t-none
          transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          ${shown ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}`}
        style={{
          background: "linear-gradient(180deg, #0d1426 0%, #070b16 60%)",
          boxShadow: "0 -20px 60px -20px rgba(0,0,0,0.8), -24px 0 70px -30px rgba(0,0,0,0.9)",
        }}
      >
        {/* brand edge */}
        <span
          className="absolute inset-x-0 top-0 h-px sm:inset-x-auto sm:inset-y-0 sm:left-0 sm:w-px sm:h-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--brand-bright), transparent)",
          }}
        />
        <span
          className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20"
          aria-hidden
        />

        <button
          aria-label="Закрити"
          onClick={close}
          className="absolute top-5 right-5 z-10 grid place-items-center w-9 h-9 rounded-lg border border-[var(--border-strong)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand)] transition-colors"
        >
          <X width={18} height={18} />
        </button>

        <div className="flex-1 overflow-y-auto flex flex-col px-6 sm:px-8 pt-8 sm:pt-10 pb-6">
          <div className="w-full my-auto">
          {status === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <span className="grid place-items-center w-16 h-16 rounded-full bg-[rgba(47,107,255,0.15)] text-[var(--brand-bright)] mb-5">
                <Check width={32} height={32} />
              </span>
              <h3 className="font-display font-bold text-xl">Заявку прийнято!</h3>
              <p className="text-[var(--muted)] text-sm mt-2 max-w-xs">
                Наш менеджер звʼяжеться з вами найближчим часом. Зазвичай — протягом
                15 хвилин.
              </p>
              <button onClick={close} className="btn btn-ghost justify-center mt-7 w-full max-w-[240px]">
                Готово
              </button>
            </div>
          ) : (
            <>
              <span className="relative block h-11 w-[68px]">
                <Image
                  src="/images/logo-full.webp"
                  alt="AUTONEX"
                  fill
                  sizes="68px"
                  className="object-contain object-left"
                />
              </span>
              <h3 className="font-display font-bold text-2xl mt-5">Залишити заявку</h3>
              <p className="text-[var(--muted)] text-sm mt-2">
                Розрахуємо вартість і терміни доставки вашого авто.
              </p>
              {context && (
                <div className="chip mt-4 !text-[var(--brand-bright)] border-[rgba(47,107,255,0.35)]">
                  {context}
                </div>
              )}

              <form onSubmit={submit} className="mt-7 space-y-4">
                <div>
                  <label className="field-label">Ваше імʼя</label>
                  <input
                    className="field"
                    placeholder="Олександр"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    minLength={2}
                  />
                </div>
                <div>
                  <label className="field-label">Телефон</label>
                  <input
                    className="field"
                    type="tel"
                    inputMode="tel"
                    placeholder="+38 (0__) ___ __ __"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Посилання на авто / коментар</label>
                  <textarea
                    className="field resize-none"
                    rows={3}
                    placeholder="Lot на Copart / IAAI або питання…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Не вдалося надіслати. Перевірте дані або напишіть нам у Telegram.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary justify-center w-full disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Надсилаємо…"
                  ) : (
                    <>
                      Надіслати заявку <Send width={16} height={16} />
                    </>
                  )}
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-[var(--faint)]">
                  <Phone width={13} height={13} /> Передзвонимо протягом 15 хвилин
                </p>
              </form>
            </>
          )}
          </div>
        </div>

        {/* the empty tail of a full-height sheet is better spent on a way out */}
        <div className="shrink-0 border-t border-white/[0.08] px-6 sm:px-8 py-4">
          <div className="text-[0.58rem] uppercase tracking-[0.2em] text-[var(--faint)]">
            Не любите форми?
          </div>
          <div className="flex items-center gap-5 mt-2.5">
            <a
              href={CONTACT.phoneHref}
              className="mono text-[0.92rem] text-white tabular-nums hover:text-[var(--brand-bright)] transition-colors"
            >
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.telegram}
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--brand-bright)] transition-colors ml-auto"
            >
              <Send width={14} height={14} /> Telegram
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
