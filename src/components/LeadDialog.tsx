"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Send, Check, Phone } from "./icons";
import { LogoMark } from "./Logo";

type Status = "idle" | "loading" | "success" | "error";

export function LeadDialog() {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => setStatus("idle"), 250);
  }, []);

  // open from any [data-lead] element, or a custom event with optional context
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("[data-lead]");
      if (el) {
        e.preventDefault();
        setContext((el as HTMLElement).dataset.leadContext ?? "");
        setOpen(true);
      }
    };
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail as { context?: string } | undefined;
      setContext(detail?.context ?? "");
      setOpen(true);
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
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />
      <div className="relative w-full max-w-md card clip-blade !rounded-2xl p-6 sm:p-8 shadow-2xl"
           style={{ background: "linear-gradient(180deg, #0c1224, #070b16)" }}>
        <button
          aria-label="Закрити"
          onClick={close}
          className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-lg border border-[var(--border-strong)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          <X width={18} height={18} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <span className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-[rgba(47,107,255,0.15)] text-[var(--brand-bright)] mb-5">
              <Check width={32} height={32} />
            </span>
            <h3 className="font-display font-bold text-xl">Заявку прийнято!</h3>
            <p className="text-[var(--muted)] text-sm mt-2 max-w-xs mx-auto">
              Наш менеджер звʼяжеться з вами найближчим часом. Зазвичай — протягом 15 хвилин.
            </p>
            <button onClick={close} className="btn btn-ghost justify-center mt-6 w-full">
              Готово
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 mb-1">
              <LogoMark size={26} />
              <span className="slash" aria-hidden />
            </div>
            <h3 className="font-display font-bold text-2xl mt-3">Залишити заявку</h3>
            <p className="text-[var(--muted)] text-sm mt-1.5">
              Розрахуємо вартість і терміни доставки вашого авто.
            </p>
            {context && (
              <div className="chip mt-4 !text-[var(--brand-bright)] border-[rgba(47,107,255,0.35)]">
                {context}
              </div>
            )}

            <form onSubmit={submit} className="mt-5 space-y-4">
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
                  rows={2}
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
  );
}
