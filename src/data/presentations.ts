// Speaker presentations and papers from the 24th AIRDC Conference.
// Files live in public/publications/presentations/. Add new items to the top of the list.

export type Presentation = {
  id: string;
  title: string;
  subtitle?: string;
  speaker: string;
  speakerSlug?: string;
  organisation: string;
  session: string;
  date: string;
  kind: "Slides" | "Paper";
  pages: number;
  sizeMb: number;
  file: string;
  cover: string;
  coverShape: "landscape" | "portrait";
};

export const PRESENTATIONS: Presentation[] = [
  {
    id: "digitalisation-of-insurance-a-case-for-ai",
    title: "Digitalisation of Insurance: A Case for AI",
    subtitle: "Wolf Pack Strategy: Winning the AI Race",
    speaker: "Dr. Kennedy Chengeta",
    speakerSlug: "kennedy-chengeta",
    organisation: "KaribuTech AI",
    session: "Session 2: Impact of AI and Technology on Insurance, Topic 3",
    date: "28 September 2026",
    kind: "Slides",
    pages: 203,
    sizeMb: 17,
    file: "/publications/presentations/digitalisation-of-insurance-a-case-for-ai-kennedy-chengeta.pdf",
    cover: "/publications/presentations/digitalisation-of-insurance-a-case-for-ai-cover.jpg",
    coverShape: "landscape",
  },
  {
    id: "ai-blueprint-series-for-insurance-leaders",
    title: "The AI Blueprint Series for Insurance Leaders",
    subtitle: "Twelve blueprints for putting AI to work safely and profitably, from the CEO to the regulator",
    speaker: "Dr. Kennedy Chengeta and Justice Muguda",
    speakerSlug: "kennedy-chengeta",
    organisation: "KaribuTech AI",
    session: "Companion paper to Session 2, Topic 3",
    date: "September 2026",
    kind: "Paper",
    pages: 243,
    sizeMb: 4.3,
    file: "/publications/presentations/ai-blueprint-series-for-insurance-leaders-kaributech-ai.pdf",
    cover: "/publications/presentations/ai-blueprint-series-cover.jpg",
    coverShape: "portrait",
  },
];
