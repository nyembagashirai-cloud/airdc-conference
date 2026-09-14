// Confirmed sponsors and partners for the 24th AIRDC Conference.
// Sponsors added through the admin dashboard take precedence over this list.
// This file is the published fallback, exactly like src/data/speakers.ts.

export type StaticSponsor = {
  id: string;
  name: string;
  tier: string; // PLATINUM | DIAMOND | GOLD | SILVER | BRONZE | SUPPORTING_PARTNER
  logoUrl: string | null;
  website: string | null;
  description: string | null;
  order: number;
};

export const SPONSORS: StaticSponsor[] = [
  {
    id: "fbc-insurance",
    name: "FBC Insurance Company Limited",
    tier: "GOLD",
    logoUrl: "/images/sponsors/fbc-insurance.png",
    website: "https://www.fbc.co.zw",
    description: null,
    order: 1,
  },
];
