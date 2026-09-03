"use client";

import { createContext, useContext } from "react";
import { useLiveTracker, type LiveTrackerState } from "@/lib/useLiveTracker";

const LiveTrackerContext = createContext<LiveTrackerState | null>(null);

export function LiveTrackerProvider({ children }: { children: React.ReactNode }) {
  const state = useLiveTracker();
  return <LiveTrackerContext.Provider value={state}>{children}</LiveTrackerContext.Provider>;
}

export function useLiveTrackerContext(): LiveTrackerState {
  const ctx = useContext(LiveTrackerContext);
  if (!ctx) throw new Error("useLiveTrackerContext must be used within LiveTrackerProvider");
  return ctx;
}
