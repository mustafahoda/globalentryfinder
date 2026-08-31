import { getService } from "./comparisonData";

export type Stage = "approved" | "renewing" | "notyet";
export type Urgency = "today" | "weeks" | "months";

export const STAGES: { key: Stage; label: string }[] = [
  { key: "approved", label: "Conditionally approved, hunting an interview" },
  { key: "renewing", label: "Renewing an existing membership" },
  { key: "notyet", label: "Haven't applied yet" },
];

export const URGENCIES: { key: Urgency; label: string }[] = [
  { key: "today", label: "Within two weeks" },
  { key: "weeks", label: "Within a month or two" },
  { key: "months", label: "No rush" },
];

export interface Recommendation {
  kicker: string;
  name: string;
  line: string;
  why: string[];
  cta: string;
  href: string;
  note: string;
}

const snapslot = getService("snapslot");
const ttptracker = getService("ttptracker");

const TTP_APPLY_URL = "https://ttp.cbp.dhs.gov/";

const SNAPSLOT_PICK: Omit<Recommendation, "line"> = {
  kicker: "For you, we'd use",
  name: snapslot.name,
  why: [
    "Texts you the instant a slot opens, up to 5 enrollment centers at once",
    "Day-of-week filtering, so you're only pinged for slots you can actually make",
    `${snapslot.price} (${snapslot.duration}), no auto-renewal`,
  ],
  cta: `Check availability at ${snapslot.name}`,
  href: snapslot.url,
  note: "Snapslot is a sister service to GlobalEntryFinder — same team.",
};

const APPLY_FIRST: Omit<Recommendation, "line"> = {
  kicker: "Not yet — do this first",
  name: "Apply on the official CBP site",
  why: [
    "No appointment-alert service can book an interview before CBP conditionally approves your application",
    "Applying costs a one-time $120 government fee, paid directly to CBP",
    "Come back once you're conditionally approved — that's when speed starts to matter",
  ],
  cta: "Apply at ttp.cbp.dhs.gov",
  href: TTP_APPLY_URL,
  note: "We'd rather tell you this than sell you a scanner.",
};

const MAY_NOT_NEED: Omit<Recommendation, "line"> = {
  kicker: "First, the good news",
  name: "You may not need this",
  why: [
    "Renewal applicants generally keep their benefits while the renewal is pending",
    "Many Global Entry renewals are approved with no in-person interview at all",
    "Only look at an alert service if CBP specifically asks you to interview",
  ],
  cta: "Check your renewal status at ttp.cbp.dhs.gov",
  href: TTP_APPLY_URL,
  note: "No signup, nothing to buy — come back if an interview is required.",
};

export const RECOMMENDATIONS: Record<`${Stage}|${Urgency}`, Recommendation> = {
  "approved|today": {
    ...SNAPSLOT_PICK,
    line: "Under two weeks means speed decides who gets the slot — SMS beats every free or email-based option here.",
  },
  "approved|weeks": {
    ...SNAPSLOT_PICK,
    line: "You're conditionally approved with a month or two of runway — still enough urgency that SMS speed and day-of-week filtering are worth the one-time cost.",
  },
  "approved|months": {
    kicker: "For you, we'd use",
    name: ttptracker.name,
    line: "No rush and you're conditionally approved — the free browser-only tier watches up to 3 centers with day-of-week filtering, no payment required.",
    why: [
      "Free tier available — no cost while you wait",
      "Watches up to 3 enrollment centers at once",
      "Has day-of-week filtering, same as the paid tier",
    ],
    cta: `Check ${ttptracker.name}`,
    href: ttptracker.url,
    note: "A free tool we think is genuinely good for this case.",
  },
  "renewing|today": {
    ...SNAPSLOT_PICK,
    line: "If your renewal has been flagged for an interview and time is short, speed is the only variable left.",
  },
  "renewing|weeks": {
    ...MAY_NOT_NEED,
    line: "Renewals keep your benefits while the application is pending, and many are approved with no interview at all.",
  },
  "renewing|months": {
    ...MAY_NOT_NEED,
    line: "File the renewal now — most renewals never reach an interview, so there's nothing to shop for yet.",
  },
  "notyet|today": {
    ...APPLY_FIRST,
    line: "There's no way to get a Global Entry interview inside two weeks from a standing start — apply first, then set up alerts once you're conditionally approved.",
  },
  "notyet|weeks": {
    ...APPLY_FIRST,
    line: "No finder can book an interview until CBP conditionally approves your application. That step is free of any third-party fee and comes first.",
  },
  "notyet|months": {
    ...APPLY_FIRST,
    line: "With no rush, start the application now — conditional approval can itself take weeks, and paying for slot alerts before that buys you nothing.",
  },
};
