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
  /** "hosted" = a paid/free SaaS you sign up for; "self-hosted" = you run the code yourself. */
  kind: "hosted" | "self-hosted";
  /** What it takes to get running -- trivial for hosted services, real work for self-hosted ones. */
  setup: string;
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
    kind: "hosted",
    setup: "None — sign up and go",
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
    kind: "hosted",
    setup: "None — sign up and go",
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
    kind: "hosted",
    setup: "None — sign up and go",
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
    kind: "hosted",
    setup: "None — sign up and go",
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
    kind: "hosted",
    setup: "None — sign up and go",
  },
  {
    slug: "trusted-traveler-scheduler",
    name: "trusted-traveler-scheduler (GitHub)",
    price: "Free — you provide the hosting",
    locations: "Any — you configure location IDs",
    delivery: "Discord/webhook, configurable",
    dayOfWeekFiltering: false,
    freeOptionAvailable: true,
    url: "https://github.com/everettsouthwick/trusted-traveler-scheduler",
    kind: "self-hosted",
    setup: "Docker image or Python 3.7+; you write the config file and keep it running somewhere",
  },
  {
    slug: "goes-notify",
    name: "goes-notify (GitHub)",
    price: "Free — you provide the hosting",
    locations: "One center + date per config",
    delivery: "macOS alert, Gmail, or console log",
    dayOfWeekFiltering: false,
    freeOptionAvailable: true,
    url: "https://github.com/Drewster727/goes-notify",
    kind: "self-hosted",
    setup: "Python 2 script; most-starred open-source option, but dated and no longer actively developed",
  },
];

export function getService(slug: string): ServiceRow {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}
