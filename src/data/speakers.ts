// Confirmed speakers for the 24th AIRDC Conference.
// Speakers added through the admin dashboard take precedence over this list.
// This file is the published fallback so the website always shows the
// confirmed line-up, exactly like src/data/programme.ts does for the programme.

export type StaticSpeaker = {
  slug: string;
  name: string;
  title: string;
  organisation: string;
  country: string;
  speakerType: string;
  photo: string;
  bio: string;
  featured: boolean;
  order: number;
};

export const SPEAKERS: StaticSpeaker[] = [
  {
    slug: "aaron-issa-anafure",
    name: "Dr. Aaron Issa Anafure",
    title: "AIRDC President and Chief Executive Officer",
    organisation: "Quality Life Assurance Company (QLAC)",
    country: "Ghana",
    speakerType: "Keynote Speaker",
    photo: "/images/speakers/aaron-issa-anafure.jpg",
    bio: [
      "Dr. Aaron Issa Anafure is an accomplished Ghanaian insurance executive and corporate leader with extensive experience in insurance management, financial services and corporate governance. He is the Chief Executive Officer of Quality Life Assurance Company (QLAC) and has previously served as CEO of SIC Life and CDH Life Insurance Company Limited.",
      "Dr. Anafure holds a Doctor of Business Administration (DBA) in Management, specialising in Corporate Governance, from Swiss Management Centre (SMC), Switzerland. He also holds an Executive Master of Business Administration (EMBA) in Finance and a Bachelor of Science (BSc) in Business Administration, Marketing, both from the University of Ghana Business School (UGBS), University of Ghana.",
      "In addition to his university qualifications, he holds a Diploma from the West African Insurance Institute (WAII), Liberia, and is a Fellow of the West African Insurance Institute, The Gambia, and the Insurance Institute of Ghana. He is also a Chartered Insurer of the UK.",
    ].join("\n\n"),
    featured: true,
    order: 1,
  },
  {
    slug: "tawanda-collins-muzamwese",
    name: "Dr. Tawanda Collins Muzamwese",
    title: "Chief Executive Officer and Founder",
    organisation: "Toxiconsol Consultancy t/a African Sustainability Consultants",
    country: "Zimbabwe",
    speakerType: "Keynote Speaker",
    photo: "/images/speakers/tawanda-collins-muzamwese.jpg",
    bio: [
      "Tawanda Collins Muzamwese is an International ESG Consultant who has carried out audits, training and consultancy in more than 100 businesses drawn from 30 countries across the world. He has trained over 5 000 people in sustainability. He is the Chief Executive Officer (CEO) and Founder of Toxiconsol Consultancy t/a African Sustainability Consultants. His experience spans 17 years working with manufacturing, mining, construction, security, service, aviation, energy and international organisations.",
      "He earned a PhD from the University of Twente, Netherlands. He also received a Master of Environmental and Energy Management (Cum Laude/Distinction) from Universiteit Twente, Netherlands and a BSc (Hons) Applied Environmental Science (Distinction/First Class) from the University of Zimbabwe. He is Certified in Benefit Cost Analysis, Valuing Life and Health by the Harvard University School of Public Health, Boston, Massachusetts, USA and also Certified in Sustainable Development in Extractive Industries by Columbia University, New York, USA. He is a Certified Lead Auditor in ISO 45001, ISO 14001 and ISO 9001, certified by DQS and PECB, Canada.",
      "Tawanda is a leading expert in Sustainability Reporting, certified on AA 1000 Sustainability Assurance by MAS Business School, Spain. He has done consultancy, auditing and training in the Netherlands, Germany, United States of America, China, Zimbabwe, South Africa, Mozambique, Kenya, South Korea, Ghana, Uganda, Israel, Kingdom of Bahrain, Egypt, Eritrea, Lesotho, Malawi and Tanzania among others. In 2018, he became the first Zimbabwean certified on AA 1000 Sustainability Assurance by MAS Business School, Spain and the first Zimbabwean certified to assure sustainability reports and ESG claims made by companies.",
      "In 2022, he received the Alumni Impact Award from the United States Department of State in Washington DC and in 2023 received the Exchange Alumni Lifetime Impact Award from the US Embassy in Harare.",
    ].join("\n\n"),
    featured: true,
    order: 2,
  },
  {
    slug: "clementine-chinyuku",
    name: "Dr. Clementine Chinyuku",
    title: "Group Head, Life",
    organisation: "WAICA Re",
    country: "Zimbabwe",
    speakerType: "Panel Speaker",
    photo: "/images/speakers/clementine-chinyuku.jpg",
    bio: [
      "Dr. Clementine Chinyuku is the Group Head, Life at WAICA Re and has over 20 years of expertise spanning Reinsurance, Life Assurance, Administration, and technical training. Dr. Chinyuku holds an LLB (Law) degree from the University of South Africa, a Master's Degree in Risk and Insurance from the National University of Science and Technology, Zimbabwe, and a PhD in Business Studies and Administration from the University of Zambia. She is also a Fellow of the Insurance Institute of South Africa (FIISA).",
      "Dr. Chinyuku serves as President of the Insurance Institute of Zimbabwe (IIZ) and is a member of the Life Offices Association Board. She has served as the 1st Vice President of Women in Insurance Zimbabwe (WIZ) and as a member of the Credsure Health board. She has received several awards, including GRC Ambassador of the Year at the Women in Governance, Risk & Compliance Awards (2024) and Outstanding Insurance Leader of the Year (Gold Winner) at the Megafest Women's Business Awards (2024). Dr. Chinyuku also received the prestigious Angaza Award as one of the top 10 women to watch in the financial services sector in Africa, ranking number 3 out of over 100 participants in 2025.",
      "Beyond her professional role, Dr. Chinyuku is passionate about mentoring the next generation of insurance professionals and dedicates her time to training at the local, regional, and international levels. She is committed to empowering young professionals in the industry and building a legacy of excellence through skills development and mentoring.",
    ].join("\n\n"),
    featured: true,
    order: 3,
  },
  {
    slug: "livingstone-magorimbo",
    name: "Livingstone Magorimbo, FIA, FASSA",
    title: "Group Chief Actuary",
    organisation: "First Mutual Holdings Limited",
    country: "Zimbabwe",
    speakerType: "Panel Speaker",
    photo: "/images/speakers/livingstone-magorimbo.jpg",
    bio: [
      "Livingstone Magorimbo is the Group Chief Actuary of First Mutual Holdings Limited, bringing a wealth of pan-African financial services experience to the executive leadership team. He oversees actuarial governance, product strategy, and risk mitigation across the Group's operations in Zimbabwe, Botswana, Mozambique, and Malawi.",
      "Before joining First Mutual, Livingstone served as the CEO of Tangerine Life Insurance in Nigeria, where he successfully engineered major mergers and acquisitions to expand the business into a multi-line insurance and pension group. Over his distinguished career, he has held key leadership positions at premier insurance institutions in Zimbabwe, Nigeria, and Ghana.",
      "A Fellow of both the Institute and Faculty of Actuaries (UK) and the Actuarial Society of South Africa, Livingstone is the current President of the Actuarial Society of Zimbabwe (ASZ). He remains dedicated to harnessing technology to foster financial inclusion and social mobility across emerging African markets.",
    ].join("\n\n"),
    featured: true,
    order: 4,
  },
  {
    slug: "derek-masvosvere",
    name: "Derek Masvosvere",
    title: "Regional Sales Head, Africa",
    organisation: "LinkShadow",
    country: "",
    speakerType: "Panel Speaker",
    photo: "/images/speakers/derek-masvosvere.jpg",
    bio: [
      "Derek Masvosvere is a cybersecurity and technology leader with extensive experience spanning Europe, Africa, and the Middle East, working with global organisations and technology companies across diverse markets.",
      "His career includes consulting experience with IBM and PwC, followed by senior cybersecurity and channel roles with tech leaders such as Darktrace and SentinelOne, where he worked closely with enterprise customers, technology partners, and cybersecurity ecosystems across the region.",
      "Derek currently serves as Regional Sales Head, Africa at LinkShadow, helping organisations strengthen their cyber defence capabilities and navigate an increasingly complex threat landscape.",
      "With a background combining technology consulting, cybersecurity, strategic partnerships, and go-to-market leadership, Derek brings a practical and regional perspective on the evolution of cyber threats and how organisations can build stronger, more resilient digital ecosystems.",
    ].join("\n\n"),
    featured: true,
    order: 5,
  },
  {
    slug: "emmanuel-okyere-amoah",
    name: "Emmanuel Okyere Amoah",
    title: "Executive Assistant to the Deputy Commissioner of Insurance",
    organisation: "National Insurance Commission (NIC)",
    country: "Ghana",
    speakerType: "Panel Speaker",
    photo: "/images/speakers/emmanuel-okyere-amoah.jpg",
    bio: [
      "Emmanuel Okyere Amoah serves as Executive Assistant to the Deputy Commissioner of Insurance at the National Insurance Commission (NIC) of Ghana. In this role, he supports executive decision-making and strategic planning, contributing to the Commission's efforts to modernise Ghana's insurance industry through technology-driven initiatives and inclusive policy frameworks.",
      "With over sixteen years of experience in insurance operations, regulation, and compliance, Emmanuel brings a wealth of industry expertise to his work. His professional background includes specialised training as an Insurance Investigator, which has equipped him with significant experience in regulatory enforcement, risk assessment, and market oversight. He also possesses strong corporate governance credentials, having previously served as Board Secretary to the Driver and Vehicle Licensing Authority (DVLA) of Ghana.",
      "Currently, Emmanuel plays a key role in supporting the leadership of the National Insurance Commission in its mission to sanitise the insurance market, enhance consumer confidence, increase insurance penetration, and position Ghana as a leading insurance hub in Africa.",
      "Emmanuel is a graduate of the University of Ghana, the West African Insurance Institute, and the Ghana Insurance College. He is a Member of the Chartered Insurance Institute (CII), United Kingdom.",
    ].join("\n\n"),
    featured: true,
    order: 6,
  },
  {
    slug: "wadzanayi-phiri",
    name: "Wadzanayi Phiri",
    title: "Founder and Managing Director",
    organisation: "Coronation Solutions (Private) Limited",
    country: "Zimbabwe",
    speakerType: "Panel Speaker",
    photo: "/images/speakers/wadzanayi-phiri.jpg",
    bio: [
      "Wadzanayi Phiri is the Founder and Managing Director of Coronation Solutions (Private) Limited, a management consulting firm established in 2018. She possesses over 25 years of extensive industry experience, having held various roles at Old Mutual, AON, Comarton Consultants, Marsh Zimbabwe, and Coronation Solutions.",
      "For the past eight years, Wadzanayi has specialised in advising corporate boards and executive leadership across Enterprise Risk Management, Corporate Governance, Regulatory Compliance, and Corporate Finance. She holds a Master of Business Administration (MBA), a Bachelor of Business Administration and a Diploma in Insurance, among other professional designations. Wadzanayi is also a certified leadership executive coach.",
    ].join("\n\n"),
    featured: true,
    order: 7,
  },

  // ── Awaiting profile ────────────────────────────────────────────────────────
  // Photo is already in place at /images/speakers/patience-speaker.jpg.
  // Fill in the name, title, organisation and biography below, then remove the
  // // marks at the start of each line to publish this speaker.
  //
  // {
  //   slug: "patience",
  //   name: "",
  //   title: "",
  //   organisation: "",
  //   country: "Zimbabwe",
  //   speakerType: "Panel Speaker",
  //   photo: "/images/speakers/patience-speaker.jpg",
  //   bio: "",
  //   featured: true,
  //   order: 8,
  // },
];
