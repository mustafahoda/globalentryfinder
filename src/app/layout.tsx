import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const SITE_URL = "https://www.globalentryfinder.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GlobalEntryFinder — Compare Global Entry Appointment Alert Services",
    template: "%s | GlobalEntryFinder",
  },
  description:
    "A 2-question quiz and a side-by-side comparison of the services that watch the Global Entry scheduler for canceled appointments and alert you the moment one opens.",
  openGraph: {
    title: "GlobalEntryFinder — Compare Global Entry Appointment Alert Services",
    description:
      "A 2-question quiz and a side-by-side comparison of Global Entry appointment alert services.",
    url: SITE_URL,
    siteName: "GlobalEntryFinder",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">{children}</body>
    </html>
  );
}
