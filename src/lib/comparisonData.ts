/**
 * Global Entry appointment-alert services, compared. Ported from snapslot.co's own
 * `ComparisonTable.tsx` (facts verified via WebSearch/WebFetch against each service's own site,
 * 2026-08-26) so the numbers don't drift between the two sites. Re-verify before reusing if it's
 * been a while, since pricing/plans can change without notice.
 */
export interface ServiceRow {
  slug: string;
  name: string;
  price: string;
  locations: string;
  delivery: string;
  dayOfWeekFiltering: boolean;
  freeOptionAvailable: boolean;
  url: string;
  isSnapslot?: boolean;
}

export const services: ServiceRow[] = [
  {
    slug: "snapslot",
    name: "Snapslot",
    price: "$20 one-time (31 days)",
    locations: "Up to 5",
    delivery: "SMS",
    dayOfWeekFiltering: true,
    freeOptionAvailable: false,
    url: "https://snapslot.co/signup?utm_source=globalentryfinder&utm_medium=referral&utm_campaign=comparison&utm_content=table",
    isSnapslot: true,
  },
  {
    slug: "appointment-scanner",
    name: "Appointment Scanner",
    price: "$29 one-time (1 month)",
    locations: "Up to 3",
    delivery: "SMS, email, or browser",
    dayOfWeekFiltering: false,
    freeOptionAvailable: false,
    url: "https://appointmentscanner.com",
  },
  {
    slug: "ttptracker",
    name: "TTPTracker",
    price: "One-time (30 days); free browser-only tier available",
    locations: "Up to 3",
    delivery: "SMS (paid) or browser (free)",
    dayOfWeekFiltering: true,
    freeOptionAvailable: true,
    url: "https://ttptracker.com",
  },
  {
    slug: "ttp-appointments",
    name: "TTP Appointments",
    price: "Free tier, or $24.99 one-time Premium (1 month)",
    locations: "1 (free) / Up to 5 (Premium)",
    delivery: "Email (free) or SMS + email (Premium)",
    dayOfWeekFiltering: false,
    freeOptionAvailable: true,
    url: "https://ttpappointments.com",
  },
  {
    slug: "global-entry-alerts",
    name: "Global Entry Alerts",
    price: "$19.99 one-time (30 days)",
    locations: "Up to 5",
    delivery: "SMS",
    dayOfWeekFiltering: false,
    freeOptionAvailable: false,
    url: "https://globalentryalerts.com",
  },
];

export function getService(slug: string): ServiceRow {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}
