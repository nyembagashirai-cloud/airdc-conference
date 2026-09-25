// 24th AIRDC Conference programme.
// Source: "FINAL AIRDC PROGRAMM.docx", the final approved programme (received 25 September 2026).
// Every line below is copied exactly from the document, in the same order.
// Text wrapped in **double asterisks** is bold in the document.
// Admin dashboard sessions take precedence over this file when any exist.

export type ProgrammeLine = { text: string; indent?: boolean };

export type ProgrammeRow = {
  time: string[];
  blocks: ProgrammeLine[][];
  tone?: "break" | "social" | "meeting" | "registration";
};

export type ProgrammeDay = { heading: string; rows: ProgrammeRow[] };

export const PROGRAMME_HEADER = {
  title: "24TH AIRDC CONFERENCE PROGRAMME",
  theme: "Theme: “Insurance resilience in the face of geopolitical and technological disruption for developing markets”",
  organisation: "ASSOCIATION OF INSURERS AND REINSURERS OF DEVELOPING COUNTRIES",
  dates: "27 – 30 SEPTEMBER 2026",
  venue: "RAINBOW TOWERS: THE SHERATON HOTEL, HARARE, ZIMBABWE",
};

export const PROGRAMME: ProgrammeDay[] = [
  {
    heading: "DAY 1: Sunday 27 September 2026",
    rows: [
      {
        time: ["16:00 – 18:00"],
        tone: "meeting",
        blocks: [
          [
            { text: "AIRDC Board Meeting" },
          ],
        ],
      },
      {
        time: ["16:00 - 19:00"],
        tone: "registration",
        blocks: [
          [
            { text: "Arrival & Registration of Guests" },
          ],
        ],
      },
      {
        time: ["19:00 – 21:00"],
        tone: "social",
        blocks: [
          [
            { text: "Welcome Cocktail" },
            { text: "Welcome Remarks – AIRDC LOC Chairman – **P Kusikwenyu**" },
            { text: "Remarks - AIRDC & ICZ" },
          ],
        ],
      },
    ],
  },
  {
    heading: "DAY 2: Monday 28 September 2026",
    rows: [
      {
        time: ["08:00 – 09:00"],
        tone: "registration",
        blocks: [
          [
            { text: "Registration" },
          ],
        ],
      },
      {
        time: ["09:00 – 09:30"],
        blocks: [
          [
            { text: "Official Opening and Welcome Address by the Local Organising Committee Chairman, **Patrick Kusikwenyu**" },
            { text: "**AIRDC President’s** remarks presented by **Dr Aaron Issa Anafure**" },
            { text: "Commissioner’s Remarks and Introduction of Guest of Honour **Dr Grace Muradzikwa**" },
          ],
        ],
      },
      {
        time: ["09:30 – 10:00"],
        blocks: [
          [
            { text: "Opening Remarks by Guest of Honour: **Minister M Ncube**" },
          ],
        ],
      },
      {
        time: ["10:00 – 10:30"],
        tone: "break",
        blocks: [
          [
            { text: "**Coffee Break**" },
          ],
        ],
      },
      {
        time: ["10:30 – 13:00"],
        blocks: [
          [
            { text: "**Session 1:** Environmental Disruption and Impact on Insurance" },
          ],
          [
            { text: "**Topic 1: \"ESG, Sustainable Insurance and Climate Risk - Towards a transformation of the global Insurance Landscape**" },
            { text: "Speaker: **Dr**. **Tawanda Collins Muzamwese, CEO, African Sustainability Consultants**" },
          ],
          [
            { text: "**Topic 2:** Panel Discussion: **Moderator, Patience Mashaire Marwiro**: The ultimate stress test: How developing country insurers survive economic disruptions" },
            { text: "**Panelists:** 1: **Mr Mufaro Chauruka, Founding MD, Emeritus Resseguros**" },
            { text: "**2: Mr Chunky Chhetry, CEO, Sagarmatha Lumbini Insurance**", indent: true },
            { text: "**3. Mr Livingstone Magorimbo, Chief Actuary, First Mutual**", indent: true },
          ],
        ],
      },
      {
        time: ["13:00 – 14:00"],
        tone: "break",
        blocks: [
          [
            { text: "**Lunch Break**" },
          ],
        ],
      },
      {
        time: ["14:00 – 16:00", "16:00 – 17:00"],
        blocks: [
          [
            { text: "**Session 2:** Impact of AI and Technology on Insurance" },
          ],
          [
            { text: "**Topic 3:** Digitalisation of Insurance – A case for AI" },
            { text: "Speaker: **Kennedy Chengeta, Co-founder, KaribuTech AI**" },
          ],
          [
            { text: "**Topic 4:** Hunting the Invisible: **Don Mlambo, Cyber Security Specialist, NMB** The battle of insurers against Cyber Crime" },
            { text: "Panelists: **1**. **Mr. Derek Masvosvere, Director Africa at Linkshadow**" },
            { text: "**2. Jithesh Leo Prince, Business Head, Platform Solutions**", indent: true },
            { text: "**3. Abel Moyo, Head Innovation, Zimnat**", indent: true },
            { text: "" },
            { text: "**AIRDC General Membership Meeting (AIRDC Members Only)**" },
          ],
        ],
      },
    ],
  },
  {
    heading: "DAY 3: Tuesday 29 September 2026",
    rows: [
      {
        time: ["09:00 – 10:00"],
        blocks: [
          [
            { text: "**Session 3:** Geopolitics and Impact on Insurance" },
          ],
          [
            { text: "**Topic 5:** Hidden Tax on Risk – How global friction redefines local insurance in developing countries" },
            { text: "Speaker: **Wadzanayi B Phiri, Coronation Solutions (Private) Limited**" },
          ],
        ],
      },
      {
        time: ["10:00 – 10:30"],
        tone: "break",
        blocks: [
          [
            { text: "**Coffee Break**" },
          ],
        ],
      },
      {
        time: ["10:30 – 13:00"],
        blocks: [
          [
            { text: "**Session 3:** Regulators Session" },
          ],
          [
            { text: "**Topic 6: Moderator – Dr Clementine Chinyuku:** Keeping the Money at Home – How regulators are containing premium flight from developing countries" },
            { text: "" },
            { text: "Panelists: 1. **Mr Emmanuel O Amaoh, Ghana National Insurance Commission**" },
            { text: "2. **Pushpa Kunwar, Nepal Insurance Authority**", indent: true },
            { text: "**3. Mrs Sibongile Siwela, Director Insurance, IPEC**", indent: true },
          ],
        ],
      },
      {
        time: ["13:00 – 14:00", "14:00 - 1430"],
        tone: "break",
        blocks: [
          [
            { text: "**Lunch Break**" },
            { text: "" },
            { text: "**Closing Ceremony (Handover of AIRDC Presidency)**" },
          ],
        ],
      },
      {
        time: ["1800"],
        tone: "social",
        blocks: [
          [
            { text: "**GALA DINNER - ETHNIC**" },
          ],
        ],
      },
    ],
  },
];
