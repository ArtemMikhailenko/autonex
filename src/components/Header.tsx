"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "./icons";
import { NAV } from "@/lib/data";

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
        background: scrolled ? "rgba(7,11,22,0.96)" : "rgba(7,11,22,0.9)",
        backdropFilter: "blur(16px) saturate(140%)",
        borderBottom: "1px solid rgba(140,175,255,0.14)",
        boxShadow: scrolled ? "0 10px 30px -18px rgba(0,0,0,0.9)" : "none",
      }}
    >
      <div className="container-x flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center shrink-0" aria-label="AUTONEX Logistics">
          <span className="relative block h-[56px] w-[86px] shrink-0">
            <Image src="/images/logo-full.png" alt="AUTONEX Logistics" fill priority sizes="86px" className="object-contain mix-blend-screen" />
          </span>
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
          <button data-lead data-lead-context="Хедер" className="btn btn-primary !py-2.5 !px-5 !text-sm">
            Розрахувати вартість <ArrowRight width={16} height={16} />
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
        style={{ background: "rgba(7,11,22,0.98)", backdropFilter: "blur(14px)" }}
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
          <button
            data-lead
            data-lead-context="Мобільне меню"
            onClick={() => setOpen(false)}
            className="btn btn-primary justify-center mt-4"
          >
            Розрахувати вартість <ArrowRight width={16} height={16} />
          </button>
        </nav>
      </div>
    </header>
  );
}
