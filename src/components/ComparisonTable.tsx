import { services } from "@/lib/comparisonData";

const FEATURES: { key: "price" | "locations" | "delivery"; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "locations", label: "Locations watched" },
  { key: "delivery", label: "Delivery" },
];

function CheckOrDash({ value }: { value: boolean }) {
  return value ? (
    <span className="text-teal font-mono">YES</span>
  ) : (
    <span className="text-slate/40 font-mono">—</span>
  );
}

export default function ComparisonTable() {
  return (
    <div className="w-full">
      {/* phone: stacked spec cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {services.map((s) => (
          <div
            key={s.slug}
            className={`rounded-lg border p-4 ${
              s.isSnapslot ? "border-amber/60 bg-amber/[0.06]" : "border-slate/20 bg-white/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-semibold text-ink">{s.name}</span>
              {s.isSnapslot && (
                <span className="font-mono text-[10px] tracking-wider text-ink bg-amber px-2 py-0.5 rounded">
                  OUR PICK
                </span>
              )}
            </div>
            <dl className="flex flex-col gap-1 text-sm">
              {FEATURES.map((f) => (
                <div key={f.key} className="flex justify-between gap-3">
                  <dt className="text-slate">{f.label}</dt>
                  <dd className="text-right font-mono text-ink">{s[f.key]}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-3">
                <dt className="text-slate">Day-of-week filtering</dt>
                <dd className="text-right">
                  <CheckOrDash value={s.dayOfWeekFiltering} />
                </dd>
              </div>
            </dl>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-mono text-teal underline underline-offset-2"
            >
              Visit {s.name} →
            </a>
          </div>
        ))}
      </div>

      {/* tablet+: instrument-panel table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr>
              <th className="text-left font-body font-normal text-slate pb-3 pr-4 align-bottom" />
              {services.map((s) => (
                <th key={s.slug} className="text-center align-bottom pb-3 px-3">
                  <div
                    className={`rounded-t-md pt-2 pb-3 px-2 ${
                      s.isSnapslot ? "bg-amber/15 border-t-2 border-x border-amber" : ""
                    }`}
                  >
                    <div className="font-display text-ink text-base normal-case tracking-normal">
                      {s.name}
                    </div>
                    {s.isSnapslot && (
                      <span className="mt-1 inline-block font-mono text-[10px] tracking-wider text-ink bg-amber px-2 py-0.5 rounded">
                        OUR PICK
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((f) => (
              <tr key={f.key} className="border-t border-slate/15">
                <td className="py-3 pr-4 text-slate whitespace-nowrap">{f.label}</td>
                {services.map((s) => (
                  <td
                    key={s.slug}
                    className={`py-3 px-3 text-center text-ink ${
                      s.isSnapslot ? "bg-amber/[0.08] border-x border-amber/40" : ""
                    }`}
                  >
                    {s[f.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-slate/15">
              <td className="py-3 pr-4 text-slate whitespace-nowrap">Day-of-week filtering</td>
              {services.map((s) => (
                <td
                  key={s.slug}
                  className={`py-3 px-3 text-center ${
                    s.isSnapslot ? "bg-amber/[0.08] border-x border-b-2 border-amber/40" : ""
                  }`}
                >
                  <CheckOrDash value={s.dayOfWeekFiltering} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4" />
              {services.map((s) => (
                <td key={s.slug} className="py-3 px-3 text-center">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal underline underline-offset-2"
                  >
                    Visit site →
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate/70 font-body">
        Checked directly against each service&apos;s own site (August 2026). None of these
        services — including Snapslot — book the appointment for you; you always confirm it
        yourself on the official Trusted Traveler Program website.
      </p>
    </div>
  );
}
