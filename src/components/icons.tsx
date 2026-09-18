import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)}><path d="M3 5.5C3 4 4 3 5.5 3H7l2 5-2.5 1.5a12 12 0 0 0 6 6L14 13l5 2v1.5C19 18 18 19 16.5 19 9 19 3 13 3 5.5Z" /></svg>
);
export const Send = (p: P) => (
  <svg {...base(p)}><path d="m21 4-9.5 9.5" /><path d="M21 4 14 21l-3-7-7-3 17-7Z" /></svg>
);
export const Truck = (p: P) => (
  <svg {...base(p)}><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>
);
export const Globe = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Pin = (p: P) => (
  <svg {...base(p)}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Eye = (p: P) => (
  <svg {...base(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const Camera = (p: P) => (
  <svg {...base(p)}><path d="M3 8h3l2-2.5h8L18 8h3v11H3z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
export const Tag = (p: P) => (
  <svg {...base(p)}><path d="M3 12V4h8l9 9-7 7-9-9Z" /><circle cx="8" cy="8" r="1.4" /></svg>
);
export const Bolt = (p: P) => (
  <svg {...base(p)}><path d="M13 2 5 13h6l-1 9 8-11h-6z" /></svg>
);
export const Headset = (p: P) => (
  <svg {...base(p)}><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2ZM20 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2Z" /><path d="M20 17v1a3 3 0 0 1-3 3h-3" /></svg>
);
export const Handshake = (p: P) => (
  <svg {...base(p)}><path d="m12 8 2-2a2.8 2.8 0 0 1 4 4l-4 4-2-2" /><path d="m12 8-2-2a2.8 2.8 0 0 0-4 4l5 5a2 2 0 0 0 3 0" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}><path d="m5 12 5 5 9-11" /></svg>
);
export const Star = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" /></svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Play = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}><path d="M7 5v14l12-7z" /></svg>
);
export const X = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Doc = (p: P) => (
  <svg {...base(p)}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 13h6M9 17h6" /></svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>
);
