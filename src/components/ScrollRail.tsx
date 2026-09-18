"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", n: "01" },
  { id: "how", n: "02" },
  { id: "calc", n: "03" },
  { id: "why", n: "04" },
  { id: "cases", n: "05" },
  { id: "reviews", n: "06" },
  { id: "contacts", n: "07" },
];

export function ScrollRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="scroll-rail hidden xl:flex" aria-label="Розділи">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={`rail-item ${active === s.id ? "active" : ""}`}>
          {s.n}
        </a>
      ))}
    </nav>
  );
}
