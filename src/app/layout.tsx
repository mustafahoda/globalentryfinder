import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://www.globalentryfinder.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Global Entry Appointment Finder for 2026 (Compared)",
    template: "%s | GlobalEntryFinder",
  },
  description:
    "Answer two questions and we'll tell you which Global Entry appointment-alert service fits your situation, plus a full price and feature comparison.",
  openGraph: {
    title: "Best Global Entry Appointment Finder for 2026 (Compared)",
    description:
      "Answer two questions and we'll tell you which Global Entry appointment-alert service fits your situation.",
    url: SITE_URL,
    siteName: "GlobalEntryFinder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Best Global Entry Appointment Finder for 2026 (Compared)",
    description:
      "Answer two questions and we'll tell you which Global Entry appointment-alert service fits your situation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={serif.variable}>
      <body className="bg-bg text-ink font-serif antialiased">{children}</body>
      <GoogleAnalytics gaId="G-4BZFB88P2L" />
    </html>
  );
}
