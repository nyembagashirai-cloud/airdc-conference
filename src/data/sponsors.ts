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
    id: "icz",
    name: "Insurance Council of Zimbabwe",
    tier: "DIAMOND",
    logoUrl: "/images/sponsors/icz.png",
    website: null,
    description: null,
    order: 1,
  },
  {
    id: "fbc-reinsurance",
    name: "FBC Reinsurance",
    tier: "SILVER",
    logoUrl: "/images/sponsors/fbc-insurance.png",
    website: "https://www.fbc.co.zw",
    description: null,
    order: 2,
  },
  {
    id: "zep-re",
    name: "ZEP-RE (PTA Reinsurance Company)",
    tier: "BRONZE",
    logoUrl: "/images/sponsors/zep-re.png",
    website: null,
    description: null,
    order: 3,
  },
  {
    id: "ecgc",
    name: "ECGC",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/ecgc.png",
    website: null,
    description: null,
    order: 4,
  },
  {
    id: "sanctuary",
    name: "Sanctuary Insurance Company",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/sanctuary.png",
    website: null,
    description: null,
    order: 5,
  },
  {
    id: "coronation",
    name: "Coronation Solutions (Pvt) Ltd",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/coronation.png",
    website: null,
    description: null,
    order: 6,
  },
  {
    id: "emeritus-re",
    name: "Emeritus Reinsurance",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/emeritus.png",
    website: null,
    description: null,
    order: 7,
  },
  {
    id: "zb-re",
    name: "ZB Reinsurance",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/zb-financial-holdings.png",
    website: null,
    description: null,
    order: 8,
  },
  {
    id: "hamilton",
    name: "Hamilton Insurance",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/hamilton.png",
    website: null,
    description: null,
    order: 9,
  },
  {
    id: "nicoz-diamond",
    name: "NicozDiamond Insurance Limited",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/nicoz-diamond.png",
    website: null,
    description: null,
    order: 10,
  },
  {
    id: "fbc-insurance",
    name: "FBC Insurance Company Limited",
    tier: "SUPPORTING_PARTNER",
    logoUrl: "/images/sponsors/fbc-insurance.png",
    website: "https://www.fbc.co.zw",
    description: null,
    order: 11,
  },
];
