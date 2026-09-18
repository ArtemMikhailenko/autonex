import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  organizationSchema,
  serviceSchema,
} from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "доставка авто з США",
    "доставка авто з Європи",
    "пригін авто під ключ",
    "авто з аукціону Copart",
    "авто з аукціону IAAI",
    "розмитнення авто",
    "автовоз з Європи",
    "доставка авто з Німеччини",
    "доставка авто з Польщі",
    "автологістика Україна",
    "AUTONEX",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: { "uk-UA": "/" },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "AUTONEX — автовоз із авто на нічній трасі та мережа маршрутів",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "automotive logistics",
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: "#070b16",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${sans.variable} ${display.variable} ${mono.variable}`}>
        <script
          type="application/ld+json"
          // structured data mirrors what the page actually shows
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), serviceSchema()]),
          }}
        />
        <div className="page-bg" aria-hidden />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
