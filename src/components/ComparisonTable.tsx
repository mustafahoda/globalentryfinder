import { services } from "@/lib/comparisonData";

export default function ComparisonTable() {
  return (
    <table className="w-full border-collapse text-sm gef-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Locations watched</th>
          <th>Delivery</th>
          <th>Day-of-week filtering</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s.slug}>
            <td>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="font-semibold text-[17px]">{s.name}</span>
                {s.isSnapslot && (
                  <span
                    className="inline-flex items-center text-[11px] tracking-[0.02em] px-2.5 py-[3px] rounded-sm"
                    style={{ background: "#E9F8FF", color: "#004961" }}
                  >
                    Our pick
                  </span>
                )}
              </div>
            </td>
            <td>{s.locations}</td>
            <td>{s.delivery}</td>
            <td>{s.dayOfWeekFiltering ? "Yes" : "—"}</td>
            <td>
              <span
                className="font-semibold text-[17px]"
                style={s.isSnapslot ? { color: "#006786" } : undefined}
              >
                {s.price}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
