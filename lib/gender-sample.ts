import { enrichSocialPosts, type Brief, type SocialPostDraft } from "@/lib/brief";
import type { Locale } from "@/lib/locales";

export const GENDER_SAMPLE_PDF_URL = "/sample-reports/GenderSnapshot2025.pdf";

type GenderContent = Omit<Brief, "mode" | "analysisMethod" | "sampleId" | "scenario" | "communicationMode" | "sourceFile" | "socialPosts"> & { socialPosts: SocialPostDraft[] };

const evidenceQuotes = {
  poverty: "Globally, 9.2 per cent of women and girls live in extreme poverty (376 million), compared to 8.6 per cent of men and boys (355 million).",
  digital: "Globally, 70 per cent of men use the Internet compared to 65 per cent of women.",
  leadership: "Women’s representation in local governments stagnated at 35.5% in 2023 and 2024.",
  data: "Close to 7 in 10 have seen reduced international or domestic funding for statistics since January 2025 (68.3 per cent).",
  tracker: "No indicator or subindicator has reached ‘target met or almost met’.",
} as const;

const content: Record<Locale, GenderContent> = {
  en: {
    title: "Progress on the Sustainable Development Goals: The Gender Snapshot 2025",
    documentType: "Public United Nations report · UN Women and UN DESA",
    executiveSummary: "The report assesses gender equality across the Sustainable Development Goals thirty years after the Beijing Platform for Action. It documents progress alongside persistent and intersecting gaps in poverty, digital access, leadership, peace and security, climate justice and gender data. Its SDG 5 tracker concludes that gender equality remains off track and calls for bold investment, collective action and stronger data systems.",
    analysisProfile: { complexity: "medium", estimatedPages: 40, keyMessageCount: 5, basis: "The demonstration maps five communication messages to quantitative findings and direct evidence in the 40-page public report." },
    summarySections: {
      background: "The 2025 edition reviews gender equality across the SDGs at a pivotal moment: thirty years after the Beijing Platform for Action and five years before the 2030 Agenda deadline.",
      reportOverview: {
        topic: "Global progress on gender equality across the Sustainable Development Goals",
        researchContext: "An annual UN Women and UN DESA assessment combining cross-SDG evidence, priority action areas and the SDG 5 tracker.",
        coreQuestion: "Where has progress for women and girls advanced, where is it stalled, and what investment and policy action are required before 2030?",
      },
      mainThemes: [
        { title: "Gender equality remains off track", description: "The SDG 5 tracker finds that no assessed indicator has reached or almost reached its target.", pages: "28–29" },
        { title: "Poverty and public investment", description: "Gendered poverty reflects exclusion from labour markets, services, assets and social protection.", pages: "6, 12" },
        { title: "Digital access and economic opportunity", description: "Unequal Internet access and emerging technologies may reproduce existing disadvantages.", pages: "5, 20–21" },
        { title: "Voice, safety and decision-making", description: "Violence, slow leadership gains and underrepresentation continue to constrain equal participation.", pages: "7–8, 16–17" },
        { title: "Gender data and accountability", description: "Funding cuts and data gaps threaten the evidence needed to guide and monitor action.", pages: "26–29" },
      ],
      keyFindings: [
        { title: "Female extreme poverty remains higher", detail: "In 2025, 9.2% of women and girls live in extreme poverty, compared with 8.6% of men and boys.", page: "12" },
        { title: "The digital gender gap persists", detail: "In 2024, 65% of women used the Internet compared with 70% of men; closing the gap could benefit more than 340 million women and girls by 2050.", page: "21" },
        { title: "Leadership gains are too slow", detail: "Women held 35.5% of local government seats and 30.0% of managerial positions; at the current pace, parity in management remains decades away.", page: "17" },
        { title: "Gender data financing is declining", detail: "68.3% of surveyed national statistics offices reported reduced international or domestic funding for statistics since January 2025.", page: "26" },
        { title: "SDG 5 is not on track", detail: "No SDG 5 indicator or subindicator assessed in the tracker has reached ‘target met or almost met’.", page: "28" },
      ],
      evidenceAreas: [
        { type: "Population estimate", label: "Extreme poverty", evidence: "376 million women and girls were estimated to live in extreme poverty in 2025.", page: "12" },
        { type: "Access indicator", label: "Internet use", evidence: "Internet use stood at 65% for women and 70% for men in 2024.", page: "21" },
        { type: "Representation indicator", label: "Local government", evidence: "Women’s representation in local government stagnated at 35.5% in 2023 and 2024.", page: "17" },
        { type: "Institutional survey", label: "Statistics funding", evidence: "68.3% of surveyed national statistics offices reported funding reductions since January 2025.", page: "26" },
        { type: "SDG tracker", label: "Distance to SDG 5 targets", evidence: "No assessed indicator or subindicator has reached or almost reached its target.", page: "28" },
      ],
      communicationImplications: "Communication should pair the report’s urgency with specific, evidence-backed routes for action and avoid presenting global averages as universal experiences.",
      communicationGuidance: {
        public: "Explain how gender gaps affect daily access to income, technology, safety, services and decision-making, using a small number of clearly sourced figures.",
        policy: "Connect each priority action to financing, legal reform, public services and measurable accountability before 2030.",
        media: "Lead with the off-track SDG 5 finding, then provide disaggregated figures and the methodological context behind global and regional estimates.",
        emphasize: "The report combines urgency with six actionable areas: digital inclusion, poverty, violence, decision-making, peace and security, and climate justice.",
        avoid: "Do not imply that progress is uniform, that a global average describes every region, or that one intervention can resolve intersecting inequalities.",
      },
    },
    keyMessages: [
      { title: "Gender equality across the SDGs remains off track and requires accelerated action before 2030.", whyItMatters: "The final five years of the 2030 Agenda are a narrowing window to protect gains and close persistent gaps.", communicationPurpose: "Establish urgency without overstating the evidence.", evidence: evidenceQuotes.tracker, page: "28", relevantData: "The tracker records 9 indicators with marginal progress, 1 with moderate progress, 8 with insufficient data and none on track or target met.", audience: "Policy makers, media and development partners", communicationAngle: "Policy action · Public accountability" },
      { title: "Women and girls continue to face a higher risk of extreme poverty.", whyItMatters: "Gendered poverty limits access to services, autonomy and resilience and reflects structural exclusion across multiple systems.", communicationPurpose: "Connect poverty figures to public investment and social protection.", evidence: evidenceQuotes.poverty, page: "12", relevantData: "376 million women and girls versus 355 million men and boys were estimated to live in extreme poverty in 2025.", audience: "Policy makers, public and civil society", communicationAngle: "Public awareness · Social protection" },
      { title: "Closing the digital gender gap is an economic and development priority.", whyItMatters: "Digital exclusion restricts access to education, services, employment and emerging economic opportunities.", communicationPurpose: "Frame digital inclusion as a cross-SDG enabler.", evidence: evidenceQuotes.digital, page: "21", relevantData: "Closing the gap could benefit more than 340 million women and girls by 2050.", audience: "Policy makers, technology partners, media and public", communicationAngle: "Policy investment · Digital inclusion" },
      { title: "Women’s decision-making power is advancing too slowly.", whyItMatters: "Representation affects whose priorities shape institutions, budgets and public policy.", communicationPurpose: "Translate representation data into an accountability message.", evidence: evidenceQuotes.leadership, page: "17", relevantData: "Women held 30.0% of managerial positions; at the current pace, parity would take nearly a century.", audience: "Policy makers, media, employers and civil society", communicationAngle: "Public accountability · Institutional change" },
      { title: "Cuts to gender data funding put evidence-based action at risk.", whyItMatters: "Without timely, disaggregated data, institutions cannot identify gaps, target resources or measure progress responsibly.", communicationPurpose: "Make data financing visible as gender-equality infrastructure.", evidence: evidenceQuotes.data, page: "26", relevantData: "68.3% of surveyed national statistics offices reported funding reductions, including impacts on major household and health surveys.", audience: "Donors, policy makers, media and national statistics offices", communicationAngle: "Data investment · Public accountability" },
    ],
    audiences: [
      { name: "National policy makers", priority: "Decision-maker", needs: "Prioritized actions, financing implications and measurable commitments", approach: "Lead with the SDG 5 tracker and connect findings to budgets, laws and public services.", channels: "Policy brief, ministerial briefing, LinkedIn" },
      { name: "Media and data journalists", priority: "Public-information multiplier", needs: "Verified toplines, regional context, definitions and source pages", approach: "Provide a concise data note and distinguish global estimates from regional variation.", channels: "Press briefing, media note, X" },
      { name: "Women-led and civil-society organizations", priority: "Accountability and engagement partner", needs: "Accessible evidence, participation routes and policy commitments to monitor", approach: "Pair evidence with consultation and recognize lived experience and intersectional inequalities.", channels: "Dialogue, social media, advocacy toolkit" },
      { name: "Donors and development partners", priority: "Financing and implementation partner", needs: "Investment gaps, scalable actions and data-system requirements", approach: "Link financing decisions to the six priority action areas and monitoring needs.", channels: "Partner briefing, funding dialogue, sector newsletter" },
    ],
    socialPosts: [
      { platform: "LinkedIn", post: "The Gender Snapshot 2025 shows that gender equality across the SDGs remains off track. Accelerated investment, collective action and stronger gender data are essential to protect gains and deliver for all women and girls before 2030.", notes: "Institutional · Evidence led · Link to public report" },
      { platform: "X", post: "No SDG 5 indicator assessed in The Gender Snapshot 2025 has reached or almost reached its target. The evidence points to an urgent need for investment, accountability and better gender data.", notes: "Concise · Source linked · Public information" },
      { platform: "Instagram", post: "Gender equality is not on track. The Gender Snapshot 2025 highlights six areas for action—from digital inclusion and poverty reduction to safety, leadership, peace and climate justice.", notes: "Accessible · Carousel-ready · Human review required" },
    ],
    recommendations: [
      { title: "Use a small number of source-linked figures", description: "Pair each public claim with its page and explain the population, year and geographic scope." },
      { title: "Connect urgency to action", description: "Frame the off-track finding alongside the report’s six priority areas rather than as a stand-alone crisis message." },
      { title: "Protect nuance", description: "Avoid presenting global averages as uniform national or regional conditions." },
    ],
    documentFacts: { theme: "Gender equality across the SDGs", priorityAudience: "Policy makers and public-information partners", tone: "Urgent, evidence-led, action-oriented" },
    evidence: [
      { label: "Gendered extreme poverty", page: "12", directEvidence: evidenceQuotes.poverty, communicationInsight: "The comparison shows a persistent gender gap and supports communication on social protection, services and economic inclusion.", suggestedUse: { targetAudience: "Policy makers, public and civil society", recommendedFraming: "Poverty is shaped by structural exclusion and requires gender-responsive public investment.", channel: "Policy explainer, media briefing and LinkedIn" } },
      { label: "Digital gender divide", page: "21", directEvidence: evidenceQuotes.digital, communicationInsight: "The gap should be communicated as a barrier to jobs, learning and services, not only to device ownership.", suggestedUse: { targetAudience: "Technology partners, policy makers and public", recommendedFraming: "Digital inclusion enables progress across multiple SDGs.", channel: "Data card, web story and social media" } },
      { label: "Women in leadership", page: "17", directEvidence: evidenceQuotes.leadership, communicationInsight: "Stagnation provides a clear accountability line while requiring context on regional and institutional differences.", suggestedUse: { targetAudience: "Policy makers, media and employers", recommendedFraming: "Progress in representation remains too slow to achieve parity.", channel: "Media note, policy briefing and X" } },
      { label: "Gender data financing", page: "26", directEvidence: evidenceQuotes.data, communicationInsight: "Data funding is a precondition for targeting resources and measuring whether policies reach women and girls.", suggestedUse: { targetAudience: "Donors, statistics offices and policy makers", recommendedFraming: "Better decisions require sustained investment in gender data.", channel: "Donor briefing, data explainer and LinkedIn" } },
      { label: "SDG 5 tracker", page: "28", directEvidence: evidenceQuotes.tracker, communicationInsight: "This is the report’s strongest headline, but it should be paired with the tracker methodology and concrete areas for action.", suggestedUse: { targetAudience: "Media, policy makers and public", recommendedFraming: "Gender equality is off track, but the report identifies actionable priorities.", channel: "Press briefing, headline graphic and web story" } },
    ],
    caveats: ["This is a portfolio demonstration using a public report. Outputs are illustrative and require human review."],
  },
  fr: {} as GenderContent,
  zh: {} as GenderContent,
};

const localizedOverrides: Record<"fr" | "zh", Partial<GenderContent>> = {
  fr: {
    title: "Progrès vers les objectifs de développement durable : Gros plan sur l’égalité des sexes 2025",
    documentType: "Rapport public des Nations Unies · ONU Femmes et DAES",
    executiveSummary: "Le rapport évalue l’égalité des sexes dans l’ensemble des ODD, trente ans après le Programme d’action de Beijing. Il documente les progrès et les écarts persistants en matière de pauvreté, d’accès numérique, de leadership, de paix et de sécurité, de justice climatique et de données de genre.",
    documentFacts: { theme: "Égalité des sexes dans les ODD", priorityAudience: "Décideurs et partenaires d’information publique", tone: "Urgent, factuel et orienté vers l’action" },
    caveats: ["Cette démonstration de portfolio utilise un rapport public. Les résultats sont illustratifs et nécessitent une révision humaine."],
  },
  zh: {
    title: "可持续发展目标进展：《2025年性别平等快照》",
    documentType: "联合国公开报告 · 联合国妇女署与联合国经社部",
    executiveSummary: "报告在《北京行动纲要》通过三十周年之际评估各项可持续发展目标中的性别平等进展，既记录已有成果，也揭示贫困、数字接入、领导力、和平与安全、气候正义和性别数据方面持续且相互交织的差距。",
    documentFacts: { theme: "可持续发展目标中的性别平等", priorityAudience: "政策制定者与公共信息伙伴", tone: "紧迫、循证、行动导向" },
    caveats: ["本作品集演示使用公开报告。所有输出均为示例内容，必须经过人工审核。"],
  },
};

function localizedContent(locale: Locale): GenderContent {
  if (locale === "en") return content.en;
  const base = content.en;
  const override = localizedOverrides[locale];
  return { ...base, ...override } as GenderContent;
}

export function getGenderSampleBrief(locale: Locale): Brief {
  const base = localizedContent(locale);
  return {
    ...base,
    mode: "demo",
    analysisMethod: "illustrative",
    sampleId: "gender-snapshot-2025",
    scenario: "sample",
    communicationMode: "awareness",
    sourceFile: "GenderSnapshot2025.pdf",
    socialPosts: enrichSocialPosts(base.socialPosts, locale, "awareness", base.documentFacts.theme),
  };
}
