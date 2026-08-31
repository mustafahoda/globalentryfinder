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
  duration: string;
  locations: string;
  delivery: string;
  dayOfWeekFiltering: boolean;
  freeOptionAvailable: boolean;
  url: string;
  isSnapslot?: boolean;
  /** "hosted" = a paid/free SaaS you sign up for; "self-hosted" = you run the code yourself. */
  kind: "hosted" | "self-hosted";
}

export const services: ServiceRow[] = [
  {
    slug: "snapslot",
    name: "Snapslot",
    price: "$20 one-time",
    duration: "31 days",
    locations: "Up to 5",
    delivery: "SMS",
    dayOfWeekFiltering: true,
    freeOptionAvailable: false,
    url: "https://snapslot.co/signup?utm_source=globalentryfinder&utm_medium=referral&utm_campaign=comparison&utm_content=table",
    isSnapslot: true,
    kind: "hosted",
  },
  {
    slug: "appointment-scanner",
    name: "Appointment Scanner",
    price: "$29 one-time",
    duration: "1 month",
    locations: "Up to 3",
    delivery: "SMS, email, or browser",
    dayOfWeekFiltering: false,
    freeOptionAvailable: false,
    url: "https://appointmentscanner.com",
    kind: "hosted",
  },
  {
    slug: "ttptracker",
    name: "TTPTracker",
    price: "$27.99 one-time; free browser-only tier available",
    duration: "30 days (paid) / ongoing (free tier)",
    locations: "Up to 3",
    delivery: "SMS (paid) or browser (free)",
    dayOfWeekFiltering: true,
    freeOptionAvailable: true,
    url: "https://ttptracker.com",
    kind: "hosted",
  },
  {
    slug: "ttp-appointments",
    name: "TTP Appointments",
    // Paid tier listed first for consistency with every other multi-tier row.
    price: "$24.99 one-time Premium, or free tier",
    duration: "1 month (Premium) / Ongoing (free)",
    locations: "Up to 5 (Premium) / 1 (free)",
    delivery: "SMS + email (Premium) or email (free)",
    dayOfWeekFiltering: false,
    freeOptionAvailable: true,
    url: "https://ttpappointments.com",
    kind: "hosted",
  },
  {
    slug: "global-entry-alerts",
    name: "Global Entry Alerts",
    price: "$19.99 one-time",
    duration: "30 days",
    locations: "Up to 5",
    delivery: "SMS",
    dayOfWeekFiltering: false,
    freeOptionAvailable: false,
    url: "https://globalentryalerts.com",
    kind: "hosted",
  },
  {
    slug: "global-entry-spotter",
    name: "Global Entry Spotter",
    price: "$25 one-time",
    duration: "Until you're booked — no fixed expiration",
    locations: "Up to 3",
    delivery: "SMS",
    dayOfWeekFiltering: false,
    freeOptionAvailable: false,
    url: "https://globalentryspotter.com",
    kind: "hosted",
  },
  {
    slug: "trusted-traveler-scheduler",
    name: "trusted-traveler-scheduler (GitHub)",
    price: "Free — you provide the hosting",
    duration: "Ongoing",
    locations: "Any — you configure location IDs",
    delivery: "Discord/webhook, configurable",
    dayOfWeekFiltering: false,
    freeOptionAvailable: true,
    url: "https://github.com/everettsouthwick/trusted-traveler-scheduler",
    kind: "self-hosted",
  },
  {
    slug: "goes-notify",
    name: "goes-notify (GitHub)",
    price: "Free — you provide the hosting",
    duration: "Ongoing",
    locations: "One center + date per config",
    delivery: "macOS alert, Gmail, or console log",
    dayOfWeekFiltering: false,
    freeOptionAvailable: true,
    url: "https://github.com/Drewster727/goes-notify",
    kind: "self-hosted",
  },
];

export function getService(slug: string): ServiceRow {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}
