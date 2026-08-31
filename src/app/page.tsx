import type { Metadata } from "next";
import Link from "next/link";
import TriageQuiz from "@/components/TriageQuiz";
import ComparisonTable from "@/components/ComparisonTable";
import LiveTracker from "@/components/LiveTracker";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { FAQ_ITEMS } from "@/lib/faqData";

const HEADLINE = "Which appointment finder is right for you?";
const SITE_URL = "https://www.globalentryfinder.com";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GlobalEntryFinder",
  url: SITE_URL,
  description:
    "An independent comparison of Global Entry appointment-alert services, with a two-question quiz and a live tracker of the official CBP scheduler.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="flex items-center gap-8 py-4 px-5 sm:px-8 md:px-16">
        <span className="font-semibold text-lg mr-auto">GlobalEntryFinder</span>
        <a href="#which" className="text-sm hover:text-accent">
          Which finder
        </a>
        <a href="#compare" className="text-sm hover:text-accent">
          All seven compared
        </a>
        <a href="#faq" className="text-sm hover:text-accent">
          FAQ
        </a>
        <Link href="/privacy" className="text-sm hover:text-accent">
          Privacy
        </Link>
        <span className="hidden sm:inline-flex items-center text-accent px-2 py-1 text-sm">
          Updated August 2026
        </span>
      </nav>

      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 pt-8 sm:pt-12 pb-24">
        <h1
          id="which"
          className="text-ink text-[clamp(34px,5vw,56px)] leading-[1.06] tracking-[-0.02em] m-0 max-w-[24ch] -ml-[0.035em]"
        >
          {HEADLINE}
        </h1>
        <p className="text-[clamp(17px,1.6vw,19px)] leading-[30px] max-w-[56ch] mt-6 text-neutral-800">
          You&apos;ve refreshed the Global Entry site for weeks and it always says no
          appointments available. Answer two questions and we&apos;ll tell you which service fits,
          or whether you should skip all of them.
        </p>

        <LiveTracker />

        <TriageQuiz />

        <div id="compare" className="pt-14 sm:pt-20">
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-5">
            <h2 className="text-[clamp(24px,2.6vw,30px)] m-0">Or read the full comparison</h2>
            <span className="text-[15px] text-neutral-700">
              Five hosted services, plus two open-source tools you run yourself
            </span>
          </div>
          <ComparisonTable />
          <p className="text-[15px] leading-[26px] mt-5 max-w-[68ch] text-neutral-700">
            The self-hosted options are free, real, open-source projects, but &quot;free&quot;
            means you&apos;re the one running the code, keeping it online, and troubleshooting it
            when it breaks — that&apos;s the trade against paying a hosted service to do it for
            you. None of these services, including Snapslot, book the appointment for you; you
            always confirm it yourself on the official Trusted Traveler Program website.
          </p>
        </div>

        <div id="faq" className="pt-14 sm:pt-20">
          <h2 className="text-[clamp(24px,2.6vw,30px)] m-0 mb-5">Frequently asked questions</h2>
          <FaqSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
