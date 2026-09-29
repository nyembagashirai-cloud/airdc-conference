// Media coverage of the 24th AIRDC Conference.
// Each item links out to the original article. Summaries are written for this site;
// the full text stays with the publisher.
// Articles published through /admin/news are shown alongside these.

export type ExternalArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: "NEWS" | "ANNOUNCEMENT" | "PRESS_RELEASE" | "UPDATE" | "INSIGHT";
  publishedAt: string;
  coverImage: string;
  source: string;
  sourceUrl: string;
};

export const EXTERNAL_ARTICLES: ExternalArticle[] = [
  {
    id: "kusikwenyu-airdc-presidency",
    title: "Kusikwenyu takes AIRDC presidency, pledges to build stronger insurance ecosystem",
    excerpt:
      "Patrick Kusikwenyu took over the AIRDC presidency for 2026 to 2028 from Chai Sophonpanich at the Harare conference. He plans to lift member participation, create benchmarking opportunities between insurers, expand training with national insurance associations and deepen collaboration on technology and AI across Africa, Asia and Latin America.",
    category: "NEWS",
    publishedAt: "2026-09-29",
    coverImage: "/images/gallery/day-1/airdc-239.jpg",
    source: "Insurance24",
    sourceUrl: "https://insurance24.co.zw/kusikwenyu-takes-airdc-presidency-pledges-to-build-stronger-insurance-ecosystem/",
  },
  {
    id: "phiri-stress-test-resilience",
    title: "Insurers urged to stress-test against shocks and build resilience",
    excerpt:
      "Wadzanayi Phiri of Coronation Solutions set out five priorities for African insurers: an honest read of market friction, stress-testing for severe shocks, products built for African customers, coordination across the industry and clear accountability. She also urged pension trustees to weigh liquidity and offshore investment risks carefully.",
    category: "NEWS",
    publishedAt: "2026-09-29",
    coverImage: "/images/gallery/day-1/airdc-201.jpg",
    source: "Insurance24",
    sourceUrl: "https://insurance24.co.zw/insurers-urged-to-stress-test-against-shocks-and-build-resilience/",
  },
  {
    id: "mnangagwa-protection-gap",
    title: "Mnangagwa challenges insurers to close Zimbabwe's protection gap",
    excerpt:
      "Officially opening the conference, Deputy Minister of Finance Hon. David Kudakwashe Mnangagwa called on insurers to treat insurance as economic infrastructure and reach farmers, small businesses and informal enterprises, backed by index-based and parametric cover, public-private partnerships and safe digital channels.",
    category: "NEWS",
    publishedAt: "2026-09-28",
    coverImage: "/images/gallery/day-1/airdc-197.jpg",
    source: "Insurance24",
    sourceUrl: "https://insurance24.co.zw/mnangagwa-challenges-insurers-to-close-zimbabwes-protection-gap/",
  },
  {
    id: "ipec-sustainability-trust",
    title: "IPEC urges insurance industry to put sustainability and trust at centre of innovation",
    excerpt:
      "IPEC Commissioner Dr Grace Muradzikwa told delegates that resilience and public confidence go hand in hand, urging insurers to make sure new technology improves access and affordability for ordinary policyholders as markets face climate, cyber and geopolitical risk.",
    category: "NEWS",
    publishedAt: "2026-09-28",
    coverImage: "/images/gallery/day-1/airdc-238.jpg",
    source: "Insurance24",
    sourceUrl: "https://insurance24.co.zw/ipec-urges-insurance-industry-to-put-sustainability-and-trust-at-centre-of-innovation/",
  },
  {
    id: "kusikwenyu-formalisation",
    title: "Zimbabwe formalisation opens new insurance opportunities: Kusikwenyu",
    excerpt:
      "Patrick Kusikwenyu said the formalisation of Zimbabwe's economy is bringing SMEs and entrepreneurs into reach, but insurers need new products for them, alongside answers to climate risk, pressure on reinsurance capacity and wider use of parametric cover and technology.",
    category: "NEWS",
    publishedAt: "2026-09-28",
    coverImage: "/images/gallery/day-1/airdc-195.jpg",
    source: "Insurance24",
    sourceUrl: "https://insurance24.co.zw/zimbabwe-formalisation-opens-new-insurance-opportunities-kusikwenyu/",
  },
];
