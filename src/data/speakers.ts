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
    speakerType: "Moderator",
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
    speakerType: "Speaker",
    photo: "/images/speakers/wadzanayi-phiri.jpg",
    bio: [
      "Wadzanayi Phiri is the Founder and Managing Director of Coronation Solutions (Private) Limited, a management consulting firm established in 2018. She possesses over 25 years of extensive industry experience, having held various roles at Old Mutual, AON, Comarton Consultants, Marsh Zimbabwe, and Coronation Solutions.",
      "For the past eight years, Wadzanayi has specialised in advising corporate boards and executive leadership across Enterprise Risk Management, Corporate Governance, Regulatory Compliance, and Corporate Finance. She holds a Master of Business Administration (MBA), a Bachelor of Business Administration and a Diploma in Insurance, among other professional designations. Wadzanayi is also a certified leadership executive coach.",
    ].join("\n\n"),
    featured: true,
    order: 7,
  },
  {
    slug: "patience-mashaire-marwiro",
    name: "Patience Mashaire Marwiro, FIISA, ACII",
    title: "Managing Director",
    organisation: "Emeritus International Reinsurance Company Botswana",
    country: "Botswana",
    speakerType: "Moderator",
    photo: "/images/speakers/patience-mashaire-marwiro.jpg",
    bio: [
      "Mrs. Patience Mashaire Marwiro is a seasoned insurance executive with over 25 years of experience in the insurance and reinsurance industry across Zimbabwe and Botswana. She currently serves as the Managing Director of Emeritus International Reinsurance Company Botswana, a position she has held since 2023. Her leadership journey includes over 20 years in senior management, with deep expertise in underwriting, marketing, operations, risk management, compliance, and financial reporting. Mrs. Marwiro has also served on various boards for over 15 years, reflecting her strategic influence within the industry.",
      "A Chartered Insurer (CII) and Fellow of the Insurance Institute of South Africa, she holds an MSc in Risk Management and Insurance, an MBA, and multiple advanced insurance qualifications from IISA and the CII (UK). She is well versed in both Zimbabwean and Botswana regulatory frameworks and is passionate about driving operational excellence and sustainable growth. Mrs. Marwiro is a respected figure in the African insurance space and actively contributes to industry development through her roles with organisations such as the Insurance Institute of Botswana, the Botswana Short-Term Insurance Underwriters Association, and regional bodies like OESAI and AIO.",
    ].join("\n\n"),
    featured: true,
    order: 8,
  },{
  slug: 'kennedy-chengeta',
  name: 'Dr. Kennedy Chengeta',
  title: 'Co-founder & AI/Automation Lead, KaribuTech AI; Camunda Chapter Lead — Hyperautomation & AI, Southern Africa',
  organisation: 'KaribuTech AI',
  country: 'South Africa',
  speakerType: 'Speaker',
  photo: '/images/speakers/kennedy-chengeta.jpg',
  featured: true,
  order: 9,
  bio: `Kennedy Chengeta is an artificial intelligence researcher and enterprise architect with more than two decades in financial services technology, including nine years in insurance. He is co-founder and AI/Automation Lead at KaribuTech AI in Johannesburg, and Camunda Chapter Lead for hyperautomation and AI in Southern Africa.

He designed eLife at ZB Life Assurance, which served as the insurer's core administration system for twelve years, and is currently running a proof of value for AI-enabled life insurance with a leading Southern African insurer. He spent a decade at Standard Bank leading integration and workflow automation, contributing to the award-winning MyMo onboarding platform and to digital payments modernisation across twenty-one countries.

He holds a PhD in Computer Science from the University of KwaZulu-Natal and is the author of 26 published books on artificial intelligence in insurance, reinsurance, actuarial practice and enterprise architecture, including "Digitization of the Insurance Domain," "Artificial Intelligence for Reinsurance," and "Actuarial Science and Artificial Intelligence at Crossroads."

He is a TOGAF Certified Architect, NVIDIA AI Technical Foundation Partner, Microsoft Foundation AI Partner, and 2022 IBM TechScale winner. He was a keynote presenter on AI at the Deep Learning Indaba Zimbabwe 2026 and a key presenter at the Camunda Berlin Conference on Insurance Hyperautomation, 2022.

Session: "Digitisation of Insurance — A Case for Artificial Intelligence and Generative AI" — 28 September 2026, 14:00, Technology & Innovation track.`,
},
{
  slug: 'chunky-chhetry',
  name: 'Mr. Chunky Chhetry',
  title: "CEO, Sagarmatha Lumbini Insurance; Immediate Past President, Nepal Insurers' Association",
  organisation: 'Sagarmatha Lumbini Insurance',
  country: 'Nepal',
  speakerType: 'Panel Speaker',
  photo: '/images/speakers/chunky-chhetry.jpg',
  featured: true,
  order: 10,
  bio: `Mr. Chunky Chhetry is a highly accomplished business leader with extensive experience in the insurance industry. He currently serves as CEO of Sagarmatha Lumbini Insurance, where he has been pivotal in driving the company's strategic vision and ensuring its sustained growth and success. His deep expertise spans underwriting, claims management, risk assessment and regulatory compliance, giving him a comprehensive understanding of the industry's complexities and challenges.

He is known for his collaborative leadership style, prioritising open communication and fostering a culture of innovation and continuous improvement, and encourages the adoption of new technologies and processes to enhance customer experience and operational efficiency.

In addition to his role at Sagarmatha Lumbini Insurance, Mr. Chhetry holds several prestigious positions, including Immediate Past President of the Nepal Insurers' Association; Vice President – Insurance of ICC Nepal (2024-2026); Treasurer of the managing committee of the Management Association of Nepal; Tariff Committee Member at the Nepal Insurance Authority; Marketing and Strategy Executive Member at Nepal Re-Insurance Co. Ltd.; Trustee Member of the Association of Insurers and Reinsurers of Developing Countries (AIRDC) (2024-2026); Vice President of the Sri Lanka Chamber of Commerce; Member of the Nepal Capital Market Promotion Committee under the Nepal Chamber of Commerce; Member of the Banking Insurance & Financial Committee under the Nepal Chamber of Commerce; and Executive Member of the Federation of Nepalese Chambers of Commerce and Industry.`,
},
{
  slug: 'jithesh-leo-prince',
  name: 'Jithesh Leo Prince',
  title: 'Business Head, Platform Solutions',
  organisation: 'Insursa',
  country: '',
  speakerType: 'Panel Speaker',
  photo: '/images/speakers/jithesh-leo-prince.jpg',
  featured: true,
  order: 11,
  bio: `Jithesh Leo Prince leads Platform Solutions Strategy at Insursa, driving product innovation and implementation across Africa, the Middle East and the US. With more than 15 years in Insurtech, he bridges business needs and technical delivery to create tailored digital platforms.

As Business Head, Platforms, he oversees client-centric solutions, aligning product design with regional priorities. His ability to convert complex requirements into scalable systems supports Insursa's rapid platform adoption. Jithesh brings focused technical leadership and strategic clarity to every engagement.`,
},
{
  slug: 'abel-moyo',
  name: 'Abel Moyo',
  title: 'Head of Innovation, AI and Data, Zimnat Group',
  organisation: 'Zimnat Group',
  country: 'Zimbabwe',
  speakerType: 'Panel Speaker',
  photo: '/images/speakers/abel-moyo.jpg',
  featured: true,
  order: 12,
  bio: `Abel Moyo is a technology executive and InsurTech leader currently serving as Head of Innovation, AI and Data for the Zimnat Group. He also leads the TENDDAI business, delivering practical insurance technology solutions for organisations such as MucaRe ReInsurance, Minerva, GrandRe and several other financial services players.

Abel brings a practical African enterprise perspective to digital transformation. His work sits at the intersection of technology and strategy, helping organisations move beyond traditional systems into intelligent, connected and customer-centric business models. In the insurance sector, he is passionate about how InsurTech can transform distribution, underwriting, claims, compliance, policy administration, customer servicing and embedded insurance through AI, automation, data integration and digital ecosystems.

Some of his innovations include AI-powered AML screening, claims automation engines, digital onboarding platforms, finance automation tools and enterprise workflow systems. He also sits on multiple boards and technology committees across private sector and Government institutions, including PRAZ.`,
},
{
  slug: 'sibongile-siwela',
  name: 'Mrs. Sibongile Siwela',
  title: 'Director of Insurance and Microinsurance',
  organisation: 'Insurance and Pensions Commission (IPEC)',
  country: 'Zimbabwe',
  speakerType: 'Panel Speaker',
  photo: '/images/speakers/sibongile-siwela.jpg',
  featured: true,
  order: 13,
  bio: `Sibongile Siwela is the Director of Insurance and Microinsurance at the Insurance and Pensions Commission (IPEC) in Zimbabwe. She is an accomplished insurance practitioner with over 30 years of extensive experience spanning both insurance operations and regulatory oversight.

Sibongile joined IPEC in 2019, bringing with her a wealth of knowledge gained from 27 years in a leading life insurance company, where she held various managerial positions across the insurance value chain. Her roles provided deep exposure to product development, underwriting, claims management, customer service and strategic leadership, making her a well-rounded expert in insurance business operations. She has since accumulated an additional seven years of regulatory experience, further strengthening her expertise in prudential and market conduct supervision.

In her current role as Director, she is responsible for prudential supervision of insurance entities, to ensure compliance, financial soundness and stability; market conduct regulation, aimed at protecting policyholders and promoting fair business practices; and driving the development and innovation of the insurance and microinsurance sectors in Zimbabwe.

She holds a Master's degree in Business Administration and a Bachelor of Science Honours Degree in Risk Management and Insurance from the National University of Science and Technology, Zimbabwe (NUST). She also holds a Diploma in Insurance with the Insurance Institute of Zimbabwe (IIZ). Her vast experience, strategic insight and dedication to regulatory excellence continue to make her a key contributor to the growth and transformation of Zimbabwe's insurance industry.`,
},
{
  slug: 'mufaro-chauruka',
  name: 'Mr. Mufaro Chauruka FIISA',
  title: 'Founding Managing Director',
  organisation: 'Emeritus Resseguros',
  country: 'Mozambique',
  speakerType: 'Panel Speaker',
  photo: '/images/speakers/mufaro-chauruka.jpg',
  featured: true,
  order: 14,
  bio: `Mufaro Chauruka is an experienced reinsurance executive with more than three decades of insurance and reinsurance experience across underwriting, business leadership, market development and professional capacity building.

He began his career in Zimbabwe in 1992 as a trainee underwriter and progressed through increasingly senior responsibilities before being seconded to Mozambique in 2006 to establish Zimre Mozambique, now Emeritus Resseguros, where he continues to serve as founding Managing Director. The company was incorporated in March 2007 and commenced operations in May 2007.

He served on the Executive Committee and Board of the African Insurance Organisation from 2012 to 2015. He is the Alternate Board Member for Mozambique at OESAI and a Fiscal Council Board Member of the Insurance Association of Mozambique (AMS).

He holds a Master of Business Administration (2006) and a Bachelor of Business Studies (Honours) (1991), both from the University of Zimbabwe. He is an Associate (1996) and a Fellow (2014) of the Insurance Institute of South Africa.

He has completed a range of technical and specialist insurance and reinsurance programmes in the United Kingdom, Switzerland and Zimbabwe, and is actively involved in developing insurance professionals through seminar presentations, technical knowledge sharing and market-focused capacity-building initiatives.`,
},
{
  slug: 'pushpa-kunwar',
  name: 'Ms. Pushpa Kunwar',
  title: 'Deputy Director',
  organisation: 'Nepal Insurance Authority',
  country: 'Nepal',
  speakerType: 'Panel Speaker',
  photo: '/images/speakers/pushpa-kunwar.jpg',
  featured: true,
  order: 15,
  bio: `"Passionate about strengthening domestic market infrastructure and leveraging smart regulatory frameworks to foster consumer trust and innovation."

Pushpa Kunwar is an insurance professional with over a decade of experience across the insurance, banking and education sectors.

An MBA graduate and a Fellow of the Insurance Institute of India (FIII), Pushpa has over eight years of experience with the Nepal Insurance Authority, leading impactful initiatives across the Product Development, Human Resources, and Research and Statistics departments. During this period she has contributed significantly to product review and design, the development of regulations, and enhanced decision making through the use of data and research.

This deep regulatory expertise is further enriched by foundational experience in the banking sector and a background in education, giving her a multisectoral perspective on insurance sector regulation.`,
},
];
