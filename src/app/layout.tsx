import type { Metadata } from "next";
import { Manrope, Unbounded, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUTONEX — Доставка авто з США та Європи під ключ",
  description:
    "AUTONEX — автологістика повного циклу. Доставляємо авто з аукціонів США та Європи під ключ: швидко, прозоро, з онлайн-трекінгом. Розрахуйте вартість за 30 секунд.",
  keywords: [
    "доставка авто з США",
    "автологістика",
    "пригнати авто",
    "авто з аукціону",
    "Copart IAAI",
    "AUTONEX",
  ],
  openGraph: {
    title: "AUTONEX — Доставка авто з США та Європи під ключ",
    description:
      "Від аукціону до вашого міста — швидко, прозоро та без зайвих клопотів.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${sans.variable} ${display.variable} ${mono.variable}`}>
        <div className="page-bg" aria-hidden />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
