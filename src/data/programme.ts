// 24th AIRDC Conference programme.
// Source: "v5 AIRDC Programme.docx" received 23 September 2026 (Day 1 to Day 3 confirmed).
// Day 4 is not included in the programme document and is intentionally omitted.

export type ProgrammeTopic = {
  label?: string;
  title: string;
  moderator?: string;
  speakerLabel?: string;
  speakers?: string[];
};

export type ProgrammeItem = {
  startTime: string;
  endTime?: string;
  title: string;
  subtitle?: string;
  description?: string;
  venue?: string;
  type: string;
  topics?: ProgrammeTopic[];
};

export type ProgrammeDay = {
  day: string;
  dateLabel: string;
  items: ProgrammeItem[];
};

export const PROGRAMME: ProgrammeDay[] = [
  {
    day: "Day 1",
    dateLabel: "Sunday, 27 September 2026",
    items: [
      { startTime: "16:00", endTime: "18:00", title: "AIRDC Board Meeting", type: "MEETING" },
      { startTime: "16:00", endTime: "19:00", title: "Arrival and Registration of Guests", type: "REGISTRATION" },
      {
        startTime: "19:00",
        endTime: "21:00",
        title: "Welcome Cocktail",
        subtitle: "Welcome remarks by the AIRDC LOC Chairman, P Kusikwenyu",
        description: "Followed by remarks from AIRDC and ICZ.",
        type: "SOCIAL",
      },
    ],
  },
  {
    day: "Day 2",
    dateLabel: "Monday, 28 September 2026",
    items: [
      { startTime: "08:00", endTime: "09:00", title: "Registration", type: "REGISTRATION" },
      {
        startTime: "09:00",
        endTime: "09:30",
        title: "Official Opening and Welcome Address",
        subtitle: "Patrick Kusikwenyu, Chairman, Local Organising Committee",
        description:
          "Remarks by the AIRDC President, Dr Aaron Issa Anafure. Commissioner's remarks and introduction of the Guest of Honour by Dr Grace Muradzikwa.",
        type: "PLENARY",
      },
      {
        startTime: "09:30",
        endTime: "10:00",
        title: "Opening Remarks by the Guest of Honour",
        subtitle: "Minister M Ncube",
        type: "KEYNOTE",
      },
      { startTime: "10:00", endTime: "10:30", title: "Coffee Break", type: "BREAK" },
      {
        startTime: "10:30",
        endTime: "13:00",
        title: "Session 1: Geopolitics and Impact of Insurance",
        type: "PLENARY",
        topics: [
          {
            label: "Topic 1",
            title:
              "ESG, Sustainable Insurance and Climate Risk: Towards a transformation of the global insurance landscape",
            speakerLabel: "Speaker",
            speakers: ["Dr Tawanda Collins Muzamwese, CEO, African Sustainability Consultants"],
          },
          {
            label: "Topic 2",
            title:
              "Panel Discussion. The ultimate stress test: How developing country insurers survive economic disruptions",
            moderator: "Patience Mashaire Marwiro",
            speakerLabel: "Panellists",
            speakers: [
              "Mr Mufaro Chaukruka, Founding MD, Emeritus Resseguros",
              "Mr Chunky Chhetry, CEO, Sagarmatha Lumbini Insurance",
              "Mr Livingstone Magorimbo, Chief Actuary, FML",
            ],
          },
        ],
      },
      { startTime: "13:00", endTime: "14:00", title: "Lunch Break", type: "BREAK" },
      {
        startTime: "14:00",
        endTime: "16:00",
        title: "Session 2: Impact of AI and Technology on Insurance",
        type: "PLENARY",
        topics: [
          {
            label: "Topic 3",
            title: "Digitalisation of Insurance: A case for AI",
            speakerLabel: "Speaker",
            speakers: ["Kennedy Chengeta, Co-founder, KaribuTech AI"],
          },
          {
            label: "Topic 4",
            title: "Hunting the Invisible: The battle of insurers against cyber crime",
            speakerLabel: "Panellists",
            speakers: [
              "Mr Derek Masvosvere, Director Africa, Linkshadow",
              "Jithesh Leo Prince, Business Head, Platform Solutions, Insursa",
              "Abel Moyo, Head of Innovation, Zimnat",
            ],
          },
        ],
      },
      {
        startTime: "16:00",
        endTime: "17:00",
        title: "AIRDC General Membership Meeting",
        subtitle: "AIRDC members only",
        type: "MEETING",
      },
    ],
  },
  {
    day: "Day 3",
    dateLabel: "Tuesday, 29 September 2026",
    items: [
      {
        startTime: "09:00",
        endTime: "10:00",
        title: "Session 3: Geopolitics and Impact of Insurance",
        type: "PLENARY",
        topics: [
          {
            label: "Topic 5",
            title:
              "Hidden Tax on Risk: How global friction redefines local insurance in developing countries",
            speakerLabel: "Speaker",
            speakers: ["Wadzanayi B Phiri, Coronation Solutions (Private) Limited"],
          },
        ],
      },
      { startTime: "10:00", endTime: "10:30", title: "Coffee Break", type: "BREAK" },
      {
        startTime: "10:30",
        endTime: "13:00",
        title: "Session 4: Regulators Session",
        type: "PANEL",
        topics: [
          {
            label: "Topic 6",
            title:
              "Keeping the Money at Home: How regulators are containing premium flight from developing countries",
            moderator: "Dr Clementine Chinyuku",
            speakerLabel: "Panellists",
            speakers: [
              "Mr Emmanuel O Amaoh, Ghana National Insurance Commission",
              "Pushpa Kunwar, Nepal Insurance Authority",
              "Mrs Sibongile Siwela, Director Insurance, IPEC",
            ],
          },
        ],
      },
      { startTime: "13:00", endTime: "14:00", title: "Lunch Break", type: "BREAK" },
      {
        startTime: "14:00",
        endTime: "14:30",
        title: "Closing Ceremony",
        subtitle: "Handover of the AIRDC Presidency",
        type: "PLENARY",
      },
      { startTime: "18:00", title: "Gala Dinner", subtitle: "Theme: Ethnic", type: "SOCIAL" },
    ],
  },
];
