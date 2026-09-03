"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKED_LOCATIONS, TTP_SLOTS_ENDPOINT, type TtpSlot } from "@/lib/ttpLocations";

const POLL_INTERVAL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

export type LocationStatus = "loading" | "open" | "none" | "error";

export interface LocationState {
  status: LocationStatus;
  earliest?: TtpSlot;
  flash?: boolean;
}

export interface LiveTrackerState {
  locations: Record<number, LocationState>;
  lastChecked: Date | null;
  secondsRemaining: number;
  progressPct: number;
  openCount: number;
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

/**
 * Polls the official TTP scheduler once, on a shared interval, regardless of how many
 * components render tracker UI — LiveTrackerTicker and LiveTracker both read this same state
 * via LiveTrackerProvider instead of each running their own fetch loop.
 */
export function useLiveTracker(): LiveTrackerState {
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
  const openCount = Object.values(locations).filter((l) => l.status === "open").length;

  return { locations, lastChecked, secondsRemaining, progressPct, openCount };
}
