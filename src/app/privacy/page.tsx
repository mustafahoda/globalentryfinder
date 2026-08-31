import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GlobalEntryFinder handles data on this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-paper py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Privacy Policy</h1>
          <p className="font-mono text-xs text-slate mb-8">Last updated: August 2026</p>

          <div className="font-body text-slate leading-relaxed flex flex-col gap-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2">
                Who runs this site
              </h2>
              <p>
                GlobalEntryFinder is an independent comparison resource operated by the same team
                that built Snapslot, a paid Global Entry appointment-alert service. We disclose
                this because we compare Snapslot against other services on this site and think you
                should know the relationship.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2">
                What we collect
              </h2>
              <p>
                This site does not require an account, does not have a login, and does not ask
                for your name, email, or phone number. The 2-question quiz on the homepage runs
                entirely in your browser — your answers are never sent to or stored on any server,
                and they disappear the moment you close or refresh the page.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2">
                Analytics
              </h2>
              <p>
                We use standard web analytics to understand which pages get visited, in aggregate.
                This does not identify you individually. If you&apos;d prefer not to be measured
                at all, most browsers offer a &quot;do not track&quot; or ad-blocking option that
                will stop this.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2">
                Outbound links
              </h2>
              <p>
                Every service on this site — including Snapslot — has its own separate privacy
                policy that governs what happens once you click through to it. We&apos;re not
                responsible for how those third-party sites handle your data; check their own
                policies before signing up.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2">
                Contact
              </h2>
              <p>
                Questions about this policy can be sent to the same team that runs Snapslot via
                the contact details on{" "}
                <a
                  href="https://snapslot.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline underline-offset-2"
                >
                  snapslot.co
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
