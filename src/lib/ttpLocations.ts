/**
 * A handful of major Global Entry enrollment centers to watch in the live tracker. Location
 * IDs confirmed live against CBP's own scheduler API on 2026-08-31 via
 * https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global%20Entry
 */
export interface TrackedLocation {
  id: number;
  code: string;
  name: string;
}

export const TRACKED_LOCATIONS: TrackedLocation[] = [
  { id: 5140, code: "JFK", name: "New York (JFK)" },
  { id: 5180, code: "LAX", name: "Los Angeles (LAX)" },
  { id: 5183, code: "ORD", name: "Chicago O'Hare" },
  { id: 5182, code: "ATL", name: "Atlanta" },
  { id: 5441, code: "BOS", name: "Boston (Logan)" },
  { id: 6940, code: "DEN", name: "Denver" },
];

export const TTP_SLOTS_ENDPOINT = "https://ttp.cbp.dhs.gov/schedulerapi/slots";

export interface TtpSlot {
  locationId: number;
  startTimestamp: string;
  endTimestamp: string;
  active: boolean;
  duration: number;
  remoteInd: boolean;
}
