import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GlobalEntryFinder handles data on this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-16 pt-12 pb-20">
        <h1 className="text-[clamp(28px,4vw,40px)] m-0 mb-2">Privacy Policy</h1>
        <p className="text-[13px] text-neutral-700 mb-9">Last updated: August 2026</p>

        <div className="flex flex-col gap-7 text-neutral-800 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2">Who runs this site</h2>
            <p className="m-0">
              GlobalEntryFinder is an independent comparison resource operated by the same team
              that built Snapslot, a paid Global Entry appointment-alert service. We disclose
              this because we compare Snapslot against other services on this site and think you
              should know the relationship.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">What we collect</h2>
            <p className="m-0">
              This site does not require an account, does not have a login, and does not ask for
              your name, email, or phone number. The 2-question quiz on the homepage runs
              entirely in your browser — your answers are saved only to your own browser&apos;s
              local storage (so the page remembers your last answers if you come back), never
              sent to or stored on any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Analytics</h2>
            <p className="m-0">
              We use standard web analytics to understand which pages get visited, in aggregate.
              This does not identify you individually. Most browsers offer a &quot;do not
              track&quot; or ad-blocking option if you&apos;d rather not be measured at all.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Outbound links</h2>
            <p className="m-0">
              Every service on this site — including Snapslot — has its own separate privacy
              policy that governs what happens once you click through to it. We&apos;re not
              responsible for how those third-party sites handle your data; check their own
              policies before signing up.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="m-0">
              Questions about this policy can be sent to the same team that runs Snapslot via the
              contact details on{" "}
              <a
                href="https://snapslot.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                snapslot.co
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
