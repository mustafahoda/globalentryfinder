"use client";

import { useEffect, useState } from "react";
import { STAGES, URGENCIES, RECOMMENDATIONS, type Stage, type Urgency } from "@/lib/triageData";

const STORAGE_KEY = "gef-triage";

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-left text-base rounded-sm px-4 py-3 min-h-[44px] border transition-colors ${
        active
          ? "bg-accent-700 border-accent-700 text-bg"
          : "bg-transparent border-neutral-400 text-ink hover:border-accent"
      }`}
      style={active ? { background: "#006786", borderColor: "#006786" } : undefined}
    >
      {label}
    </button>
  );
}

export default function TriageQuiz() {
  const [stage, setStage] = useState<Stage>("approved");
  const [urgency, setUrgency] = useState<Urgency>("weeks");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved?.stage && saved?.urgency) {
        setStage(saved.stage);
        setUrgency(saved.urgency);
      }
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  function pick(next: { stage?: Stage; urgency?: Urgency }) {
    const merged = { stage: next.stage ?? stage, urgency: next.urgency ?? urgency };
    setStage(merged.stage);
    setUrgency(merged.urgency);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // private browsing / storage disabled -- quiz still works, just doesn't persist
    }
  }

  const rec = RECOMMENDATIONS[`${stage}|${urgency}`];

  return (
    <div className="grid gap-9 md:gap-14 md:grid-cols-2 items-start pt-9 md:pt-12">
      <div className="flex flex-col gap-10">
        <div>
          <span className="block text-[13px] tracking-[0.08em] uppercase text-neutral-700 mb-4">
            One — where are you today?
          </span>
          <div className="flex flex-wrap gap-2.5">
            {STAGES.map((s) => (
              <Chip
                key={s.key}
                label={s.label}
                active={stage === s.key}
                onClick={() => pick({ stage: s.key })}
              />
            ))}
          </div>
        </div>
        <div>
          <span className="block text-[13px] tracking-[0.08em] uppercase text-neutral-700 mb-4">
            Two — how soon do you need it?
          </span>
          <div className="flex flex-wrap gap-2.5">
            {URGENCIES.map((u) => (
              <Chip
                key={u.key}
                label={u.label}
                active={urgency === u.key}
                onClick={() => pick({ urgency: u.key })}
              />
            ))}
          </div>
        </div>
        <p className="text-[15px] leading-[26px] max-w-[44ch] text-neutral-700 m-0">
          Both answers stay in your browser. We don&apos;t ask for an email address, and we
          can&apos;t sell one we never had.
        </p>
      </div>

      <div>
        <span className="block text-[13px] tracking-[0.08em] uppercase text-neutral-700 mb-4">
          {rec.kicker}
        </span>
        <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.1] m-0">{rec.name}</h2>
        <p className="text-lg leading-[30px] mt-5 max-w-[44ch] text-neutral-800">{rec.line}</p>
        <div className="flex flex-col gap-2.5 mt-7">
          {rec.why.map((w) => (
            <p key={w} className="flex gap-3 m-0 text-base leading-7 max-w-[44ch] text-neutral-800">
              <span className="font-semibold" style={{ color: "#006786" }}>
                →
              </span>
              <span>{w}</span>
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 mt-8 items-start">
          <a
            href={rec.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-sm px-5 py-3 text-sm font-semibold text-bg"
            style={{ background: "#0088B0" }}
          >
            {rec.cta}
          </a>
          <span className="text-[13px] text-neutral-700">{rec.note}</span>
        </div>
      </div>
    </div>
  );
}
