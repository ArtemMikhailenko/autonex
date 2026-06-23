"use client";

import { useEffect, useState } from "react";
import { Logo, LogoMark } from "./Logo";
import { Phone, Send, Menu, X } from "./icons";
import { NAV, CONTACT } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,7,15,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="container-x flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <LogoMark size={32} />
          <Logo className="text-[1.35rem]" />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 text-[0.92rem] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-white/5"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 text-[0.92rem] font-semibold text-[var(--text)] hover:text-[var(--brand-bright)] transition-colors"
          >
            <Phone width={18} height={18} className="text-[var(--brand-bright)]" />
            {CONTACT.phone}
          </a>
          <button data-lead className="btn btn-primary !py-2.5 !px-4 !text-sm">
            Залишити заявку
            <Send width={16} height={16} />
          </button>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden grid place-items-center w-11 h-11 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text)]"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-400 ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
        style={{ background: "rgba(5,7,15,0.96)", backdropFilter: "blur(14px)" }}
      >
        <nav className="container-x py-5 flex flex-col gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-base font-medium text-[var(--muted)] border-b border-[var(--border)]"
            >
              {n.label}
            </a>
          ))}
          <div className="flex flex-col gap-2.5 pt-4">
            <a href={CONTACT.phoneHref} className="btn btn-ghost justify-center">
              <Phone width={18} height={18} /> {CONTACT.phone}
            </a>
            <button data-lead onClick={() => setOpen(false)} className="btn btn-primary justify-center">
              Залишити заявку <Send width={16} height={16} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
