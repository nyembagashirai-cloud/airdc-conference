// 24th AIRDC Conference programme.
// Source: official programme document (Day 1 to Day 3 lunch confirmed).
// Day 3 afternoon and Day 4 are not yet released and are intentionally omitted.

export type ProgrammeTopic = {
  label?: string;
  title: string;
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
      {
        startTime: "16:00",
        endTime: "18:00",
        title: "AIRDC Committee Meeting",
        type: "MEETING",
      },
      {
        startTime: "16:00",
        endTime: "19:00",
        title: "Arrival and Registration of Guests",
        type: "REGISTRATION",
      },
      {
        startTime: "19:00",
        endTime: "21:00",
        title: "Welcome Cocktail",
        type: "SOCIAL",
      },
    ],
  },
  {
    day: "Day 2",
    dateLabel: "Monday, 28 September 2026",
    items: [
      {
        startTime: "08:00",
        endTime: "09:00",
        title: "Registration",
        type: "REGISTRATION",
      },
      {
        startTime: "09:00",
        endTime: "09:30",
        title: "Official Opening and Welcome Address",
        subtitle: "Patrick Kusikwenyu, Chairman, Local Organising Committee",
        description: "Followed by remarks by the AIRDC President.",
        type: "PLENARY",
      },
      {
        startTime: "09:30",
        endTime: "10:00",
        title: "Opening Remarks by the Guest of Honour",
        subtitle: "Guest of Honour to be announced",
        type: "KEYNOTE",
      },
      {
        startTime: "10:00",
        endTime: "10:30",
        title: "Coffee Break",
        type: "BREAK",
      },
      {
        startTime: "10:30",
        endTime: "13:00",
        title: "Session 1: Geo Politics and Impact of Insurance",
        type: "PLENARY",
        topics: [
          {
            label: "Topic 1",
            title:
              "Hidden Tax on Risk: How global friction redefines local insurance in developing countries",
            speakerLabel: "Speaker",
            speakers: ["To be announced"],
          },
          {
            label: "Topic 2",
            title:
              "Panel Discussion. The ultimate stress test: How developing country insurers survive economic disruptions",
            speakerLabel: "Panellists",
            speakers: [
              "Regional Reinsurers",
              "Zimbabwean Regulator",
              "UNCTAD (Multilateral Development Partners)",
            ],
          },
        ],
      },
      {
        startTime: "13:00",
        endTime: "14:00",
        title: "Lunch Break",
        type: "BREAK",
      },
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
            speakers: ["Kennedy Chengeta"],
          },
          {
            label: "Topic 4",
            title:
              "Hunting the Invisible: The battle of insurers against cyber crime",
            speakerLabel: "Panellists",
            speakers: [
              "Mr Derek Masvosvere, Director Africa, Linkshadow",
              "Mr Vivek, Group CEO, Insursa",
            ],
          },
        ],
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
        title: "ESG and Sustainable Insurance",
        type: "PLENARY",
        topics: [
          {
            label: "Topic 5",
            title:
              "ESG, Sustainable Insurance and Climate Risk: Towards a transformation of the global insurance landscape",
            speakerLabel: "Speaker",
            speakers: ["Tawanda Collins Muzamwese"],
          },
        ],
      },
      {
        startTime: "10:00",
        endTime: "10:30",
        title: "Coffee Break",
        type: "BREAK",
      },
      {
        startTime: "10:30",
        endTime: "13:00",
        title: "Session 3: Regulators Session",
        type: "PANEL",
        topics: [
          {
            label: "Topic 6",
            title:
              "Keeping the Money at Home: How regulators are containing premium flight from developing countries",
          },
        ],
      },
      {
        startTime: "13:00",
        endTime: "14:00",
        title: "Lunch Break",
        type: "BREAK",
      },
    ],
  },
];
