import { getService } from "./comparisonData";

export interface FaqItem {
  question: string;
  answer: string;
  links?: { label: string; url: string }[];
}

const trustedTravelerScheduler = getService("trusted-traveler-scheduler");
const goesNotify = getService("goes-notify");

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do any of these services book the Global Entry appointment for me?",
    answer:
      "No. None of them — including Snapslot — can book an interview on your behalf. They only alert you when a slot opens; you still log in yourself on the official Trusted Traveler Program website to claim it.",
  },
  {
    question: "Is it ever safe to give one of these services my Login.gov or TTP password?",
    answer:
      "No. A legitimate appointment-alert service never needs your government login credentials to watch a public scheduler. If one asks for it, don't use it.",
  },
  {
    question: "What's the difference between a hosted service and a self-hosted tool?",
    answer:
      "A hosted service, like Snapslot or the others in the table, is ready to use the moment you sign up. A self-hosted tool is free, open-source code that you install and run yourself — on a spare computer, a VPS, or similar — and keep online, which is real technical work rather than a signup form. If you're technical and want to save the money, consider using one of the self-hosted options below instead.",
    links: [
      { label: trustedTravelerScheduler.name, url: trustedTravelerScheduler.url },
      { label: goesNotify.name, url: goesNotify.url },
    ],
  },
  {
    question: "Is a browser notification a good way to get Global Entry alerts?",
    answer:
      "It can be, if the setup fits how you actually use your computer. A browser-based alert (like TTPTracker's free tier) is free and fires instantly while the tab is open. That's a good fit if you keep a laptop on and awake near you during the hours you're realistically watching. It's a weaker fit if cancellations are likely to post overnight or while you're away from your desk, since the tab has to stay open and your computer has to stay awake to catch them. Close the tab, let your laptop sleep, or step away, and you'll miss it entirely. SMS doesn't have that limitation, which is the main trade-off between the two.",
  },
  {
    question: "How does the live tracker on this page work?",
    answer:
      "It polls the official CBP Trusted Traveler Program scheduler directly from your browser every five minutes, for a handful of major enrollment centers, and shows the next open slot it finds. It's the same kind of polling the alert services in the comparison table do — just running visibly in your own browser instead of on their servers.",
  },
  {
    question: "Why does GlobalEntryFinder recommend Snapslot?",
    answer:
      "We also built Snapslot. We think it's the strongest all-around option for most people — SMS speed, up to 5 locations watched at once, day-of-week filtering — but every number in the comparison table and quiz is a real, checked fact, not just a reason to promote it.",
  },
  {
    question: "What if none of these services find me a slot in time?",
    answer:
      "None of them guarantee a slot — they only make you faster at seeing one when it opens. If you're stuck, consider enrollment centers farther from home, look into Enrollment on Arrival at some airports, or keep an eye on the scheduler yourself in the meantime.",
  },
  {
    question: "Does applying for Global Entry cost anything beyond these services?",
    answer:
      "Yes. Applying for Global Entry itself costs a separate $120 government fee, paid directly to CBP — that's unrelated to, and required regardless of, any appointment-alert service on this page.",
  },
];
