import RadarHero from "@/components/RadarHero";
import Quiz from "@/components/Quiz";
import ComparisonTable from "@/components/ComparisonTable";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-paper">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-widest text-teal mb-3">
              GLOBAL ENTRY APPOINTMENT ALERTS, COMPARED
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-ink">
              Find the appointment finder that&apos;s actually right for you.
            </h1>
            <p className="mt-4 font-body text-lg text-slate leading-relaxed">
              A handful of services quietly watch the Trusted Traveler Program scheduler and text
              or email you the second a canceled Global Entry slot opens up. They&apos;re not all
              the same. Answer two questions and we&apos;ll tell you which one fits.
            </p>
            <a
              href="#quiz"
              className="mt-6 inline-flex items-center rounded-md bg-ink px-5 py-3 font-mono text-sm font-semibold text-paper hover:bg-ink-raised transition"
            >
              Take the 2-question quiz ↓
            </a>
          </div>
          <RadarHero />
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="bg-ink py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-widest text-amber mb-2">TWO QUESTIONS</p>
            <h2 className="font-display text-3xl font-bold text-paper">Which one should you use?</h2>
          </div>
          <Quiz />
        </div>
      </section>

      {/* Why this exists */}
      <section className="bg-paper py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">
            Why this comparison exists
          </h2>
          <div className="font-body text-slate leading-relaxed flex flex-col gap-4">
            <p>
              If you&apos;ve applied for Global Entry and checked the official scheduler, you
              already know the problem: popular enrollment centers can show no open interview
              slots for months, while people who booked ahead of you cancel or reschedule every
              single day. Those canceled slots get released back into the system in real time,
              but they&apos;re usually gone within minutes. Nobody can watch a scheduling page
              around the clock, so a small industry of alert services exists to do it for you.
            </p>
            <p>
              These services all do roughly the same core job — poll the official scheduler and
              notify you when a slot opens at a location you picked. Where they differ is price,
              how many locations you can watch, whether the alert reaches you by text or email,
              and whether you can filter for specific days of the week. Those differences matter
              more than they look on a features page, which is why we built the quiz above
              instead of just a table.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-paper-dim py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-ink mb-2">The full comparison</h2>
          <p className="font-body text-slate mb-6">
            Checked directly against each service&apos;s own site.
          </p>
          <ComparisonTable />
        </div>
      </section>

      {/* How to pick */}
      <section className="bg-paper py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">
            A few things worth knowing before you sign up for any of these
          </h2>
          <div className="font-body text-slate leading-relaxed flex flex-col gap-4">
            <p>
              Text beats email for this specific job. Cancellation slots can disappear within
              minutes, and email routinely lands in a spam or promotions folder where nobody
              checks it fast enough. If speed matters to you, weight SMS-based services more
              heavily than the comparison table alone suggests.
            </p>
            <p>
              None of these services book the appointment for you. You&apos;ll always confirm it
              yourself on the official Trusted Traveler Program website using your own login. Be
              careful of anything that claims otherwise — that would mean handing your government
              login credentials to a third party, which you should never do.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
