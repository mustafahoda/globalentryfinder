"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKED_LOCATIONS, TTP_SLOTS_ENDPOINT, type TtpSlot } from "@/lib/ttpLocations";

const POLL_INTERVAL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

type LocationStatus = "loading" | "open" | "none" | "error";

interface LocationState {
  status: LocationStatus;
  earliest?: TtpSlot;
  flash?: boolean;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Formats a raw "YYYY-MM-DDTHH:mm" TTP timestamp without any timezone conversion -- the
 * string already represents the enrollment center's own local time, and running it through
 * `new Date()` would silently reinterpret it in the viewer's timezone instead. */
function formatSlotTime(raw: string): string {
  const [datePart, timePart] = raw.split("T");
  if (!datePart || !timePart) return raw;
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour24, minute] = timePart.split(":").map(Number);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${MONTHS[month - 1]} ${day}, ${year} · ${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

async function fetchEarliestSlot(locationId: number): Promise<TtpSlot | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const url = `${TTP_SLOTS_ENDPOINT}?orderBy=soonest&limit=1&locationId=${locationId}&minimum=1`;
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: TtpSlot[] = await res.json();
    return data.find((s) => s.active) ?? null;
  } finally {
    clearTimeout(timeout);
  }
}

export default function LiveTracker() {
  const [locations, setLocations] = useState<Record<number, LocationState>>(() =>
    Object.fromEntries(TRACKED_LOCATIONS.map((l) => [l.id, { status: "loading" as const }])),
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [msRemaining, setMsRemaining] = useState(POLL_INTERVAL_MS);
  const nextPollAtRef = useRef<number>(Date.now() + POLL_INTERVAL_MS);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const results = await Promise.allSettled(
        TRACKED_LOCATIONS.map((loc) => fetchEarliestSlot(loc.id)),
      );
      if (cancelled) return;

      setLocations((prev) => {
        const next = { ...prev };
        TRACKED_LOCATIONS.forEach((loc, i) => {
          const result = results[i];
          const prevEarliest = prev[loc.id]?.earliest?.startTimestamp;
          if (result.status === "fulfilled") {
            const slot = result.value;
            const changed = slot?.startTimestamp !== prevEarliest;
            next[loc.id] = {
              status: slot ? "open" : "none",
              earliest: slot ?? undefined,
              flash: changed,
            };
          } else {
            next[loc.id] = { status: "error", flash: false };
          }
        });
        return next;
      });
      setLastChecked(new Date());
      nextPollAtRef.current = Date.now() + POLL_INTERVAL_MS;

      // clear the flash highlight shortly after so it reads as a pulse, not a permanent state
      setTimeout(() => {
        if (cancelled) return;
        setLocations((prev) => {
          const next = { ...prev };
          for (const id of Object.keys(next)) {
            next[Number(id)] = { ...next[Number(id)], flash: false };
          }
          return next;
        });
      }, 1600);
    }

    poll();
    const pollId = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(pollId);
    };
  }, []);

  useEffect(() => {
    const tickId = setInterval(() => {
      setMsRemaining(Math.max(0, nextPollAtRef.current - Date.now()));
    }, 1000);
    return () => clearInterval(tickId);
  }, []);

  const secondsRemaining = Math.ceil(msRemaining / 1000);
  const progressPct = 100 - (msRemaining / POLL_INTERVAL_MS) * 100;

  return (
    <div className="rounded-md border border-black/10 bg-surface/60 px-4 sm:px-5 py-4 mt-8 overflow-hidden">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-2" />
        </span>
        <span className="text-[13px] tracking-[0.08em] uppercase text-neutral-800 font-semibold">
          Live tracker
        </span>
        <span className="text-[13px] text-neutral-700">
          Polling the official TTP scheduler every 5 minutes, right in your browser
        </span>
        <span className="ml-auto text-[12px] text-neutral-600 tabular-nums">
          {lastChecked
            ? `Checked ${lastChecked.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} · next check in ${secondsRemaining}s`
            : "Checking now…"}
        </span>
      </div>

      <div className="h-[2px] w-full bg-black/10 mt-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-[width] duration-1000 ease-linear"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
        {TRACKED_LOCATIONS.map((loc) => {
          const state = locations[loc.id];
          return (
            <div
              key={loc.id}
              className={`shrink-0 rounded-sm border px-3 py-2 min-w-[148px] transition-colors duration-700 ${
                state?.flash
                  ? "border-accent bg-accent-100"
                  : "border-black/10 bg-bg"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold tracking-wide">{loc.code}</span>
                {state?.status === "loading" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-pulse" />
                )}
                {state?.status === "open" && (
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#0088B0" }} />
                )}
              </div>
              <p className="text-[12px] mt-1 m-0 leading-snug text-neutral-800">
                {state?.status === "loading" && "Scanning…"}
                {state?.status === "none" && "No openings"}
                {state?.status === "error" && "Unavailable"}
                {state?.status === "open" && state.earliest && (
                  <span className="font-medium" style={{ color: "#006786" }}>
                    {formatSlotTime(state.earliest.startTimestamp)}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
