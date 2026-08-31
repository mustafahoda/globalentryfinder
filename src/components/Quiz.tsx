"use client";

import { useState } from "react";
import { getService } from "@/lib/comparisonData";

type LocationAnswer = "metro" | "smaller";
type UrgencyAnswer = "asap" | "no-rush";

interface Recommendation {
  slug: string;
  why: string;
}

function recommend(location: LocationAnswer, urgency: UrgencyAnswer): Recommendation {
  if (urgency === "asap" && location === "metro") {
    return {
      slug: "snapslot",
      why: "You're near several enrollment centers and can't afford to wait — Snapslot texts you the instant a slot opens at any of up to 5 locations you pick.",
    };
  }
  if (urgency === "asap" && location === "smaller") {
    return {
      slug: "snapslot",
      why: "With one realistic center and a tight timeline, speed is everything — Snapslot's SMS alerts and day-of-week filtering make sure you only get pinged for slots you can actually make.",
    };
  }
  if (urgency === "no-rush" && location === "metro") {
    return {
      slug: "ttptracker",
      why: "No rush and multiple centers nearby — TTPTracker's free browser-only tier watches up to 3 locations with day-of-week filtering, no payment required.",
    };
  }
  return {
    slug: "ttp-appointments",
    why: "One center, no urgency — TTP Appointments' free tier covers a single location by email at no cost, which is all you need here.",
  };
}

const QUESTIONS = [
  {
    id: "location" as const,
    prompt: "Where are you today?",
    options: [
      { value: "metro" as const, label: "A big metro area", hint: "Several enrollment centers within driving distance" },
      { value: "smaller" as const, label: "A smaller city or rural area", hint: "Really only one realistic option nearby" },
    ],
  },
  {
    id: "urgency" as const,
    prompt: "How soon do you need the appointment?",
    options: [
      { value: "asap" as const, label: "ASAP", hint: "I'm traveling soon and can't wait months" },
      { value: "no-rush" as const, label: "No rush", hint: "I have plenty of time before I need Global Entry" },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState<LocationAnswer | null>(null);
  const [urgency, setUrgency] = useState<UrgencyAnswer | null>(null);

  const result = location && urgency ? recommend(location, urgency) : null;

  function reset() {
    setStep(0);
    setLocation(null);
    setUrgency(null);
  }

  if (result) {
    const service = getService(result.slug);
    return (
      <div className="rounded-xl bg-paper text-ink shadow-xl overflow-hidden max-w-md mx-auto">
        <div className="p-6">
          <p className="font-mono text-[11px] tracking-widest text-slate mb-1">RECOMMENDATION</p>
          <h3 className="font-display text-2xl font-bold">{service.name}</h3>
          <p className="mt-3 font-body text-sm text-slate leading-relaxed">{result.why}</p>
        </div>
        <div
          className="relative border-t-2 border-dashed border-ink/20 p-6 bg-paper-dim"
          aria-hidden="false"
        >
          <span className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-ink" />
          <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-ink" />
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-xs text-slate">
              <p>SVC {service.slug.toUpperCase().slice(0, 8)}</p>
              <p>{service.price}</p>
            </div>
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center rounded-md bg-amber px-4 py-2 font-mono text-xs font-semibold text-ink hover:brightness-95 transition"
            >
              Get {service.name} →
            </a>
          </div>
        </div>
        <button
          onClick={reset}
          className="w-full py-3 text-center font-mono text-[11px] tracking-wider text-slate hover:text-ink transition border-t border-ink/10"
        >
          RETAKE THE QUIZ
        </button>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div className="rounded-xl bg-ink-raised border border-white/10 p-6 max-w-md mx-auto">
      <p className="font-mono text-[11px] tracking-widest text-amber mb-1">
        QUESTION {step + 1} OF {QUESTIONS.length}
      </p>
      <h3 className="font-display text-xl font-semibold text-paper mb-4">{question.prompt}</h3>
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              if (question.id === "location") setLocation(opt.value as LocationAnswer);
              else setUrgency(opt.value as UrgencyAnswer);
              setStep((s) => Math.min(s + 1, QUESTIONS.length - 1));
            }}
            className="text-left rounded-lg border border-white/15 bg-white/5 px-4 py-3 hover:border-amber hover:bg-amber/10 transition"
          >
            <span className="block font-body font-semibold text-paper">{opt.label}</span>
            <span className="block font-mono text-xs text-paper/50 mt-0.5">{opt.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
