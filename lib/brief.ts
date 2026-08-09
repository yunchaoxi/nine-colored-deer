import type { Locale } from "@/lib/locales";
import { buildDemoAnalysis, type DemoAnalysisOptions } from "@/lib/demo-analysis";

export type CommunicationMode = "advocacy" | "awareness" | "media" | "engagement";

export type EvidenceItem = {
  label: string;
  page: string;
  directEvidence: string;
  communicationInsight: string;
  suggestedUse: { targetAudience: string; recommendedFraming: string; channel: string };
};

export type SocialPostDraft = { platform: string; post: string; notes: string };
export type SocialPost = SocialPostDraft & { hashtags: string[]; communicationPurpose: string; targetAudience: string };
export type CommunicationMaterial = {
  objective: string;
  targetAudience: string;
  keyMessage: string;
  suggestedCopy: string;
  recommendedChannels: string;
  callToAction: string;
  hashtags: string[];
};

export type DocumentComplexity = "short" | "medium" | "long";
export type ReportOverview = { topic: string; researchContext: string; coreQuestion: string };
export type MainTheme = { title: string; description: string; pages: string };
export type EvidenceArea = { type: string; label: string; evidence: string; page: string };
export type CommunicationGuidance = { public: string; policy: string; media: string; emphasize: string; avoid: string };

export type Brief = {
  mode: "demo" | "live";
  analysisMethod?: "illustrative" | "local-extraction";
  sampleId?: "gender-snapshot-2025" | "youth-employment";
  analysisProfile?: { complexity: DocumentComplexity; estimatedPages?: number; keyMessageCount: number; basis: string };
  scenario: "sample" | "upload";
  communicationMode: CommunicationMode;
  sourceFile: string;
  title: string;
  documentType: string;
  executiveSummary: string;
  summarySections: { background: string; reportOverview?: ReportOverview; mainThemes?: MainTheme[]; keyFindings: Array<{ title: string; detail: string; page: string }>; evidenceAreas?: EvidenceArea[]; communicationImplications: string; communicationGuidance?: CommunicationGuidance };
  keyMessages: Array<{ title: string; whyItMatters?: string; communicationPurpose: string; evidence: string; page: string; relevantData?: string; audience: string; communicationAngle?: string }>;
  audiences: Array<{ name: string; priority: string; needs: string; approach?: string; channels: string }>;
  socialPosts: SocialPost[];
  communicationMaterial?: CommunicationMaterial;
  recommendations: Array<{ title: string; description: string }>;
  documentFacts: { theme: string; priorityAudience: string; tone: string };
  evidence: EvidenceItem[];
  caveats: string[];
};

type BriefContent = Omit<Brief, "mode" | "scenario" | "communicationMode" | "sourceFile" | "socialPosts"> & { socialPosts: SocialPostDraft[] };

const socialPurpose: Record<Locale, Record<CommunicationMode, string>> = {
  en: {
    advocacy: "Support evidence-informed policy attention and stakeholder action.",
    awareness: "Explain the public relevance of the findings in accessible language.",
    media: "Provide a concise, source-grounded line for media and public-information use.",
    engagement: "Invite informed participation and stakeholder dialogue.",
  },
  fr: {
    advocacy: "Soutenir l’attention politique et l’action des parties prenantes sur la base des faits.",
    awareness: "Expliquer la portée publique des conclusions dans un langage accessible.",
    media: "Fournir un message concis et sourcé pour les médias et l’information publique.",
    engagement: "Inviter à une participation éclairée et au dialogue avec les parties prenantes.",
  },
  zh: {
    advocacy: "以证据支持政策关注和利益相关方行动。",
    awareness: "以易于理解的语言说明报告发现与公众的关系。",
    media: "为媒体和公共信息传播提供简明且有来源依据的表述。",
    engagement: "促进知情参与和利益相关方对话。",
  },
};

const socialAudiences: Record<Locale, Record<string, string>> = {
  en: {
    LinkedIn: "Policymakers, programme partners and professional stakeholders",
    X: "Media, public-information partners and public audiences",
    Instagram: "Young people, youth-led organizations and public audiences",
  },
  fr: {
    LinkedIn: "Décideurs, partenaires de programme et parties prenantes professionnelles",
    X: "Médias, partenaires d’information publique et grand public",
    Instagram: "Jeunes, organisations de jeunesse et grand public",
  },
  zh: {
    LinkedIn: "政策制定者、项目伙伴和专业利益相关方",
    X: "媒体、公共信息伙伴和公众",
    Instagram: "青年、青年组织和公众",
  },
};

function suggestedHashtags(platform: string, locale: Locale, theme: string) {
  const isYouthEmployment = /youth|jeunes|青年/i.test(theme);
  const isGenderEquality = /gender|genre|性别/i.test(theme);
  const tags = isGenderEquality
    ? {
        en: ["#GenderEquality", "#SDG5", "#GenderData", "#WomenAndGirls"],
        fr: ["#ÉgalitéDesGenres", "#ODD5", "#DonnéesDeGenre", "#FemmesEtFilles"],
        zh: ["#性别平等", "#可持续发展目标5", "#性别数据", "#妇女与女童"],
      }[locale]
    : isYouthEmployment
    ? {
        en: ["#YouthEmployment", "#DecentWork", "#SDG8", "#YouthParticipation"],
        fr: ["#EmploiDesJeunes", "#TravailDécent", "#ODD8", "#ParticipationDesJeunes"],
        zh: ["#青年就业", "#体面劳动", "#可持续发展目标8", "#青年参与"],
      }[locale]
    : {
        en: ["#PublicInformation", "#SDGs", "#EvidenceBasedCommunication", "#StakeholderEngagement"],
        fr: ["#InformationPublique", "#ODD", "#CommunicationFondéeSurLesFaits", "#Participation"],
        zh: ["#公共信息", "#可持续发展目标", "#循证传播", "#利益相关方参与"],
      }[locale];

  if (platform === "X") return [tags[0], tags[2]];
  if (platform === "Instagram") return tags;
  return tags.slice(0, 3);
}

export function enrichSocialPosts(posts: SocialPostDraft[], locale: Locale, mode: CommunicationMode, theme: string): SocialPost[] {
  return posts.map((item) => ({
    ...item,
    hashtags: suggestedHashtags(item.platform, locale, theme),
    communicationPurpose: socialPurpose[locale][mode],
    targetAudience: socialAudiences[locale][item.platform] ?? socialAudiences[locale].LinkedIn,
  }));
}

const content: Record<Locale, BriefContent> = {
  en: {
    title: "Global Youth Employment Outlook",
    documentType: "Sample public report",
    executiveSummary: "The report examines persistent barriers affecting young people's access to decent employment and highlights the need for coordinated policy action. It finds that education-to-work transitions remain uneven, particularly for groups facing structural exclusion. The report recommends aligning skills development with labour-market needs, expanding inclusive social protection and strengthening partnerships among governments, employers, educators and youth-led organizations.",
    summarySections: {
      background: "The report examines how structural, educational and labour-market barriers continue to limit young people’s access to decent employment across regions.",
      keyFindings: [
        { title: "Unequal transitions", detail: "Education-to-work pathways remain uneven, with the greatest barriers affecting young people facing structural exclusion.", page: "18" },
        { title: "Skills must reflect demand", detail: "Training programmes are more effective when they respond to changing labour-market conditions and remain accessible to disadvantaged groups.", page: "31" },
        { title: "Participation strengthens trust", detail: "Early, meaningful youth participation improves programme relevance, accountability and public confidence.", page: "52" },
      ],
      communicationImplications: "Public communication should connect policy recommendations to lived experience, avoid presenting regional conditions as uniform, and give young people a visible role as participants—not only beneficiaries. All public claims should retain clear source references.",
    },
    keyMessages: [
      { title: "Young people need clearer, more inclusive pathways from education to decent work.", communicationPurpose: "Establish the central public narrative and frame youth employment as a coordinated policy responsibility.", evidence: "“Young people facing multiple forms of exclusion encounter the greatest barriers during the transition from education to employment.”", page: "18", audience: "Policymakers, media and the general public" },
      { title: "Skills initiatives work best when they reflect real labour-market conditions.", communicationPurpose: "Encourage decision-makers and delivery partners to connect training investments with changing labour demand.", evidence: "“Skills programmes show stronger employment outcomes when curricula are aligned with current and anticipated labour-market demand.”", page: "31", audience: "Employers, educators and labour ministries" },
      { title: "Meaningful youth participation should shape both policy design and delivery.", communicationPurpose: "Position young people as partners in policy design and strengthen participation-focused calls to action.", evidence: "“Youth participation from the policy-design stage improves programme relevance, accountability and public trust.”", page: "52", audience: "Youth organizations and implementation partners" },
    ],
    audiences: [
      { name: "National policymakers", priority: "Primary", needs: "Concise policy implications and feasible actions", channels: "Briefing note, LinkedIn, stakeholder event" },
      { name: "Media and public-information partners", priority: "Multiplier", needs: "Clear findings, context and verified evidence", channels: "Press briefing, media kit, X" },
      { name: "Youth-led organizations", priority: "Priority stakeholder", needs: "Accessible language and meaningful participation routes", channels: "Social media, dialogue, short video" },
      { name: "Employers and educators", priority: "Implementation partner", needs: "Practical relevance and partnership opportunities", channels: "LinkedIn, webinar, sector newsletter" },
    ],
    socialPosts: [
      { platform: "LinkedIn", post: "Young people need inclusive pathways from education to decent work. This report highlights how coordinated action on skills, social protection and youth participation can help close persistent access gaps.", notes: "Professional · Policy focused · Suggested CTA: Explore the report" },
      { platform: "X", post: "Decent work for young people requires more than skills alone. Coordinated policy, inclusive protection and meaningful youth participation all matter.", notes: "Concise · Public facing · Suggested tags: #YouthEmployment #DecentWork" },
      { platform: "Instagram", post: "From education to employment, too many young people still face barriers. Better pathways begin with inclusive policy—and with young people at the table.", notes: "Accessible · Visual led · Suggested format: three-panel carousel" },
    ],
    recommendations: [
      { title: "Lead with people, then policy", description: "Open public content with the lived impact of employment barriers before explaining institutional recommendations." },
      { title: "Segment by decision role", description: "Use concise policy actions for government audiences and participation pathways for youth organizations." },
      { title: "Create an evidence carousel", description: "Translate three report findings into accessible visual cards with source pages in the caption." },
      { title: "Plan for sensitivities", description: "Avoid implying uniform regional conditions and review references to vulnerable groups with care." },
    ],
    documentFacts: { theme: "Decent work for youth", priorityAudience: "Policymakers", tone: "Urgent, constructive" },
    evidence: [
      { label: "Access barriers", page: "18", directEvidence: "“Young people facing multiple forms of exclusion encounter the greatest barriers during the transition from education to employment.”", communicationInsight: "The finding supports a people-centred narrative that frames youth employment as a cross-sector public issue rather than an individual skills deficit.", suggestedUse: { targetAudience: "Policymakers, media and the general public", recommendedFraming: "Access to decent work requires coordinated action across education, labour policy and social protection.", channel: "Media briefing, policy explainer and LinkedIn" } },
      { label: "Skills alignment", page: "31", directEvidence: "“Skills programmes show stronger employment outcomes when curricula are aligned with current and anticipated labour-market demand.”", communicationInsight: "The evidence connects skills investment to employment outcomes while cautioning against presenting training as a stand-alone solution.", suggestedUse: { targetAudience: "Labour ministries, employers and education providers", recommendedFraming: "Skills investments should connect to real and emerging employment pathways.", channel: "Policy brief, stakeholder presentation and LinkedIn" } },
      { label: "Partnerships", page: "47", directEvidence: "“Implementation depends on sustained cooperation among public institutions, employers, education providers and youth-led organizations.”", communicationInsight: "The finding provides a basis for shared-responsibility messaging and for naming the contribution expected from each partner group.", suggestedUse: { targetAudience: "Implementation partners, donors and institutional stakeholders", recommendedFraming: "Progress depends on clearly defined roles and sustained partnership.", channel: "Partner briefing, web story and stakeholder event" } },
      { label: "Youth participation", page: "52", directEvidence: "“Youth participation from the policy-design stage improves programme relevance, accountability and public trust.”", communicationInsight: "This supports portraying young people as decision-making partners and including a visible participation pathway in public communication.", suggestedUse: { targetAudience: "Youth-led organizations, programme teams and public audiences", recommendedFraming: "Policies for young people are stronger when young people help shape them.", channel: "Instagram carousel, youth dialogue and X" } },
    ],
    caveats: ["Sample content is illustrative and is not an official institutional publication."],
  },
  fr: {
    title: "Perspectives mondiales de l’emploi des jeunes",
    documentType: "Rapport public exemple",
    executiveSummary: "Le rapport examine les obstacles persistants qui limitent l’accès des jeunes à un emploi décent et souligne la nécessité d’une action publique coordonnée. Il constate que le passage de l’éducation à l’emploi reste inégal, en particulier pour les groupes confrontés à une exclusion structurelle. Il recommande d’aligner le développement des compétences sur les besoins du marché du travail, d’étendre une protection sociale inclusive et de renforcer les partenariats entre pouvoirs publics, employeurs, établissements d’enseignement et organisations dirigées par des jeunes.",
    summarySections: {
      background: "Le rapport analyse comment les obstacles structurels, éducatifs et liés au marché du travail continuent de limiter l’accès des jeunes à un emploi décent dans différentes régions.",
      keyFindings: [
        { title: "Des transitions inégales", detail: "Les parcours entre l’éducation et l’emploi restent inégaux, les obstacles les plus importants touchant les jeunes confrontés à une exclusion structurelle.", page: "18" },
        { title: "Des compétences adaptées à la demande", detail: "Les programmes de formation sont plus efficaces lorsqu’ils répondent à l’évolution du marché du travail et restent accessibles aux groupes défavorisés.", page: "31" },
        { title: "La participation renforce la confiance", detail: "Une participation précoce et réelle des jeunes améliore la pertinence, la redevabilité et la confiance du public.", page: "52" },
      ],
      communicationImplications: "La communication publique doit relier les recommandations politiques aux expériences vécues, éviter de présenter les situations régionales comme uniformes et rendre visible le rôle des jeunes comme participants, et non uniquement comme bénéficiaires. Chaque affirmation publique doit conserver une référence claire à sa source.",
    },
    keyMessages: [
      { title: "Les jeunes ont besoin de parcours plus clairs et plus inclusifs entre l’éducation et le travail décent.", communicationPurpose: "Établir le récit public central et présenter l’emploi des jeunes comme une responsabilité politique coordonnée.", evidence: "« Les jeunes confrontés à plusieurs formes d’exclusion rencontrent les obstacles les plus importants lors du passage de l’éducation à l’emploi. »", page: "18", audience: "Décideurs, médias et grand public" },
      { title: "Les initiatives de développement des compétences sont plus efficaces lorsqu’elles reflètent les réalités du marché du travail.", communicationPurpose: "Encourager les décideurs et partenaires à relier les investissements dans la formation à l’évolution de la demande de travail.", evidence: "« Les programmes de compétences produisent de meilleurs résultats d’emploi lorsque les cursus répondent à la demande actuelle et future du marché du travail. »", page: "31", audience: "Employeurs, éducateurs et ministères du travail" },
      { title: "Une participation réelle des jeunes doit guider la conception et la mise en œuvre des politiques.", communicationPurpose: "Présenter les jeunes comme partenaires de la conception des politiques et renforcer les appels à la participation.", evidence: "« La participation des jeunes dès la conception des politiques améliore la pertinence, la redevabilité et la confiance du public. »", page: "52", audience: "Organisations de jeunesse et partenaires de mise en œuvre" },
    ],
    audiences: [
      { name: "Décideurs nationaux", priority: "Principal", needs: "Implications politiques concises et mesures réalisables", channels: "Note d’information, LinkedIn, réunion de parties prenantes" },
      { name: "Médias et partenaires d’information publique", priority: "Relais", needs: "Conclusions claires, contexte et éléments vérifiés", channels: "Point presse, dossier média, X" },
      { name: "Organisations dirigées par des jeunes", priority: "Partie prenante prioritaire", needs: "Langage accessible et possibilités de participation réelle", channels: "Réseaux sociaux, dialogue, vidéo courte" },
      { name: "Employeurs et éducateurs", priority: "Partenaire de mise en œuvre", needs: "Pertinence pratique et possibilités de partenariat", channels: "LinkedIn, webinaire, bulletin sectoriel" },
    ],
    socialPosts: [
      { platform: "LinkedIn", post: "Les jeunes ont besoin de parcours inclusifs entre l’éducation et le travail décent. Ce rapport montre comment une action coordonnée sur les compétences, la protection sociale et la participation des jeunes peut réduire les inégalités d’accès.", notes: "Professionnel · Axé sur les politiques · Appel proposé : consulter le rapport" },
      { platform: "X", post: "Le travail décent pour les jeunes ne dépend pas uniquement des compétences. Des politiques coordonnées, une protection inclusive et une participation réelle des jeunes sont essentielles.", notes: "Concis · Grand public · Mots-dièse suggérés : #EmploiDesJeunes #TravailDécent" },
      { platform: "Instagram", post: "De l’éducation à l’emploi, trop de jeunes rencontrent encore des obstacles. De meilleurs parcours commencent par des politiques inclusives—et par la participation des jeunes.", notes: "Accessible · Visuel · Format suggéré : carrousel en trois volets" },
    ],
    recommendations: [
      { title: "Commencer par les personnes, puis expliquer les politiques", description: "Présenter d’abord les effets concrets des obstacles à l’emploi avant d’exposer les recommandations institutionnelles." },
      { title: "Segmenter selon le rôle décisionnel", description: "Proposer des actions politiques concises aux autorités et des voies de participation aux organisations de jeunesse." },
      { title: "Créer un carrousel fondé sur les faits", description: "Transformer trois conclusions du rapport en cartes visuelles accessibles, avec les pages sources en légende." },
      { title: "Anticiper les sensibilités", description: "Éviter de présenter les situations régionales comme uniformes et revoir avec soin les références aux groupes vulnérables." },
    ],
    documentFacts: { theme: "Travail décent pour les jeunes", priorityAudience: "Décideurs", tone: "Urgent, constructif" },
    evidence: [
      { label: "Obstacles à l’accès", page: "18", directEvidence: "« Les jeunes confrontés à plusieurs formes d’exclusion rencontrent les obstacles les plus importants lors du passage de l’éducation à l’emploi. »", communicationInsight: "Cette conclusion soutient un récit centré sur les personnes, qui présente l’emploi des jeunes comme un enjeu public transversal plutôt que comme un simple déficit de compétences individuelles.", suggestedUse: { targetAudience: "Décideurs, médias et grand public", recommendedFraming: "L’accès au travail décent exige une action coordonnée entre éducation, politique du travail et protection sociale.", channel: "Point presse, explicatif de politique publique et LinkedIn" } },
      { label: "Alignement des compétences", page: "31", directEvidence: "« Les programmes de compétences produisent de meilleurs résultats d’emploi lorsque les cursus répondent à la demande actuelle et future du marché du travail. »", communicationInsight: "L’élément relie les investissements dans les compétences aux résultats d’emploi sans présenter la formation comme une solution suffisante à elle seule.", suggestedUse: { targetAudience: "Ministères du travail, employeurs et établissements d’enseignement", recommendedFraming: "Les investissements dans les compétences doivent mener à des parcours d’emploi réels et émergents.", channel: "Note de politique, présentation aux parties prenantes et LinkedIn" } },
      { label: "Partenariats", page: "47", directEvidence: "« La mise en œuvre dépend d’une coopération durable entre institutions publiques, employeurs, établissements d’enseignement et organisations dirigées par des jeunes. »", communicationInsight: "Cette conclusion fonde un message de responsabilité partagée et permet de préciser la contribution attendue de chaque groupe partenaire.", suggestedUse: { targetAudience: "Partenaires de mise en œuvre, donateurs et parties prenantes institutionnelles", recommendedFraming: "Les progrès dépendent de rôles clairement définis et de partenariats durables.", channel: "Réunion de partenaires, article web et événement de parties prenantes" } },
      { label: "Participation des jeunes", page: "52", directEvidence: "« La participation des jeunes dès la conception des politiques améliore la pertinence, la redevabilité et la confiance du public. »", communicationInsight: "Cet élément permet de présenter les jeunes comme partenaires de décision et d’intégrer une voie de participation visible dans la communication publique.", suggestedUse: { targetAudience: "Organisations de jeunesse, équipes de programme et grand public", recommendedFraming: "Les politiques destinées aux jeunes sont plus solides lorsque les jeunes contribuent à les façonner.", channel: "Carrousel Instagram, dialogue avec les jeunes et X" } },
    ],
    caveats: ["Ce contenu exemple est fourni à titre illustratif et ne constitue pas une publication institutionnelle officielle."],
  },
  zh: {
    title: "全球青年就业展望",
    documentType: "公共报告示例",
    executiveSummary: "报告分析了青年获得体面就业所面临的持续性障碍，并强调需要采取协调一致的政策行动。报告指出，从教育到就业的过渡仍不均衡，面临结构性排斥的群体受到的影响尤为突出。报告建议使技能发展更好地对应劳动力市场需求，扩大包容性社会保障，并加强政府、雇主、教育机构和青年组织之间的伙伴关系。",
    summarySections: {
      background: "报告分析了结构性、教育和劳动力市场障碍如何持续限制不同地区青年获得体面就业的机会。",
      keyFindings: [
        { title: "就业过渡机会不均", detail: "从教育到就业的路径仍不均衡，面临结构性排斥的青年承受着最显著的机会障碍。", page: "18" },
        { title: "技能项目必须对应市场需求", detail: "培训项目在回应劳动力市场变化并确保弱势群体能够参与时更为有效。", page: "31" },
        { title: "青年参与有助于建立信任", detail: "尽早开展有意义的青年参与，能够提高项目相关性、问责性和公众信任。", page: "52" },
      ],
      communicationImplications: "公共传播应将政策建议与真实生活经验联系起来，避免将不同地区的情况描述为完全一致，并突出青年作为参与者而非单纯受益者的角色。所有面向公众的事实主张都应保留清晰的来源信息。",
    },
    keyMessages: [
      { title: "青年需要更清晰、更包容的路径，从教育顺利过渡到体面就业。", communicationPurpose: "建立首要公共叙事，将青年就业呈现为需要多方协调的政策责任。", evidence: "“面临多重排斥的青年，在从教育过渡到就业的过程中遭遇最为显著的障碍。”", page: "18", audience: "政策制定者、媒体和公众" },
      { title: "技能项目只有回应真实的劳动力市场状况，才能发挥最大作用。", communicationPurpose: "推动决策者和实施伙伴将技能投资与不断变化的劳动力需求联系起来。", evidence: "“当课程与当前及未来劳动力市场需求保持一致时，技能项目能够取得更好的就业成效。”", page: "31", audience: "雇主、教育工作者和劳工部门" },
      { title: "有意义的青年参与应贯穿政策设计与实施。", communicationPurpose: "将青年定位为政策设计伙伴，并强化以参与为导向的行动号召。", evidence: "“从政策设计阶段开始的青年参与，能够提高项目相关性、问责性和公众信任。”", page: "52", audience: "青年组织和实施伙伴" },
    ],
    audiences: [
      { name: "国家政策制定者", priority: "主要受众", needs: "简明的政策影响与可行行动", channels: "政策简报、LinkedIn、利益相关方会议" },
      { name: "媒体与公共信息伙伴", priority: "传播放大者", needs: "清晰的主要发现、背景和经核验的证据", channels: "新闻吹风会、媒体资料包、X" },
      { name: "青年主导的组织", priority: "重点利益相关方", needs: "易于理解的语言和有意义的参与渠道", channels: "社交媒体、对话活动、短视频" },
      { name: "雇主与教育工作者", priority: "实施伙伴", needs: "实践相关性和伙伴合作机会", channels: "LinkedIn、网络研讨会、行业通讯" },
    ],
    socialPosts: [
      { platform: "LinkedIn", post: "青年需要从教育通向体面就业的包容性路径。本报告说明，围绕技能、社会保障和青年参与采取协调行动，有助于缩小长期存在的机会差距。", notes: "专业 · 聚焦政策 · 建议行动号召：阅读报告" },
      { platform: "X", post: "促进青年体面就业不能只依靠技能培训。协调的政策、包容性保障和有意义的青年参与同样重要。", notes: "简洁 · 面向公众 · 建议标签：#青年就业 #体面劳动" },
      { platform: "Instagram", post: "从教育到就业，仍有太多青年面临障碍。更好的发展路径始于包容性政策，也始于让青年真正参与决策。", notes: "易于理解 · 视觉优先 · 建议形式：三页轮播图" },
    ],
    recommendations: [
      { title: "先讲人的处境，再讲政策", description: "公共传播内容应先呈现就业障碍对人的实际影响，再说明机构层面的政策建议。" },
      { title: "根据决策角色细分受众", description: "面向政府受众提供简明政策行动，面向青年组织提供明确参与路径。" },
      { title: "制作循证信息轮播图", description: "将三项报告发现转化为易懂的视觉卡片，并在说明文字中标注来源页码。" },
      { title: "提前识别敏感议题", description: "避免暗示各地区情况完全一致，并谨慎审核涉及弱势群体的表述。" },
    ],
    documentFacts: { theme: "青年体面就业", priorityAudience: "政策制定者", tone: "紧迫、建设性" },
    evidence: [
      { label: "机会障碍", page: "18", directEvidence: "“面临多重排斥的青年，在从教育过渡到就业的过程中遭遇最为显著的障碍。”", communicationInsight: "该发现支持以人为本的传播叙事，将青年就业呈现为跨部门公共议题，而不是个人技能不足问题。", suggestedUse: { targetAudience: "政策制定者、媒体和公众", recommendedFraming: "促进体面就业需要教育、劳工政策和社会保障领域的协调行动。", channel: "媒体吹风会、政策解读和 LinkedIn" } },
      { label: "技能匹配", page: "31", directEvidence: "“当课程与当前及未来劳动力市场需求保持一致时，技能项目能够取得更好的就业成效。”", communicationInsight: "该证据将技能投资与就业成效联系起来，同时提醒传播内容不要把培训描述为能够独立解决所有问题的方案。", suggestedUse: { targetAudience: "劳工部门、雇主和教育机构", recommendedFraming: "技能投资应通向真实且新兴的就业路径。", channel: "政策简报、利益相关方演示和 LinkedIn" } },
      { label: "伙伴关系", page: "47", directEvidence: "“项目实施依赖公共机构、雇主、教育机构和青年组织之间持续的合作。”", communicationInsight: "该发现为共同责任叙事提供依据，并有助于明确各类合作伙伴应承担的具体角色。", suggestedUse: { targetAudience: "实施伙伴、捐助方和机构利益相关方", recommendedFraming: "取得进展需要明确的角色分工和持续的伙伴关系。", channel: "伙伴简报、网站故事和利益相关方活动" } },
      { label: "青年参与", page: "52", directEvidence: "“从政策设计阶段开始的青年参与，能够提高项目相关性、问责性和公众信任。”", communicationInsight: "该证据支持将青年呈现为决策伙伴，并在公共传播中提供清晰可见的参与路径。", suggestedUse: { targetAudience: "青年组织、项目团队和公众", recommendedFraming: "面向青年的政策，在青年共同参与塑造时更具成效。", channel: "Instagram 轮播图、青年对话活动和 X" } },
    ],
    caveats: ["本示例内容仅用于演示，不属于任何机构的正式出版物。"],
  },
};

const uploadCopy: Record<Locale, { title: string; documentType: string; caveats: (fileName: string) => string[] }> = {
  en: { title: "Simulated Communication Brief", documentType: "Uploaded PDF · Prototype simulation", caveats: (fileName) => [`This demonstration output does not represent an analysis of ${fileName}.`, "No PDF content was uploaded to or processed by an AI service.", "All messages, evidence references and recommendations are illustrative and require human review."] },
  fr: { title: "Note de communication simulée", documentType: "PDF importé · Simulation de prototype", caveats: (fileName) => [`Ce résultat de démonstration ne constitue pas une analyse de ${fileName}.`, "Le contenu du PDF n’a été ni transmis ni traité par un service d’IA.", "Tous les messages, références et recommandations sont illustratifs et nécessitent une révision humaine."] },
  zh: { title: "模拟传播简报", documentType: "已上传 PDF · 原型模拟", caveats: (fileName) => [`此演示结果并非对 ${fileName} 的真实分析。`, "PDF 内容未上传至任何 AI 服务，也未由 AI 处理。", "所有信息、证据引用和传播建议均为模拟内容，必须经过人工审核。"] },
};

export function getDemoBrief(locale: Locale, sourceFile = "global-youth-employment-outlook.pdf", scenario: Brief["scenario"] = "sample", options: DemoAnalysisOptions = {}): Brief {
  const base = content[locale];
  const preparedBase = { ...base, socialPosts: enrichSocialPosts(base.socialPosts, locale, "awareness", base.documentFacts.theme) };
  if (scenario === "upload") {
    const upload = uploadCopy[locale];
    return buildDemoAnalysis({ ...preparedBase, mode: "demo", analysisMethod: "illustrative", scenario, communicationMode: "awareness", sourceFile, title: upload.title, documentType: upload.documentType, caveats: upload.caveats(sourceFile) }, locale, options);
  }
  return buildDemoAnalysis({ ...preparedBase, mode: "demo", analysisMethod: "illustrative", scenario, communicationMode: "awareness", sourceFile }, locale, { estimatedPages: options.estimatedPages ?? 64, fileSize: options.fileSize });
}

export const sampleBrief = getDemoBrief("en");
