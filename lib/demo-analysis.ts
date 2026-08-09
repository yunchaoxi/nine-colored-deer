import type { Brief, DocumentComplexity, EvidenceArea, EvidenceItem, MainTheme, ReportOverview } from "@/lib/brief";
import type { Locale } from "@/lib/locales";

export type DemoAnalysisOptions = { estimatedPages?: number; fileSize?: number };

type MessageDetail = { whyItMatters: string; relevantData: string; communicationAngle: string };
type AnalysisExpansion = {
  overview: ReportOverview;
  themes: MainTheme[];
  findings: Array<{ title: string; detail: string; page: string }>;
  baseMessageDetails: [MessageDetail, MessageDetail, MessageDetail];
  messages: Brief["keyMessages"];
  evidenceAreas: EvidenceArea[];
  evidence: EvidenceItem[];
  guidance: NonNullable<Brief["summarySections"]["communicationGuidance"]>;
  basis: { short: string; medium: string; long: string };
};

const expansion: Record<Locale, AnalysisExpansion> = {
  en: {
    overview: {
      topic: "Equitable pathways from education to decent work for young people",
      researchContext: "A cross-regional review of structural exclusion, skills alignment, social protection, institutional coordination and youth participation.",
      coreQuestion: "Which policy and delivery conditions enable young people—especially excluded groups—to enter and remain in decent employment?",
    },
    themes: [
      { title: "Unequal school-to-work transitions", description: "Structural barriers affect groups and regions differently.", pages: "18–24" },
      { title: "Skills and labour-market alignment", description: "Training outcomes depend on links to current and emerging demand.", pages: "31–36" },
      { title: "Inclusive social protection", description: "Protection can reduce the risk of temporary disruption becoming long-term exclusion.", pages: "38–43" },
      { title: "Partnership and youth participation", description: "Coordinated institutions and meaningful participation improve delivery and trust.", pages: "47–52" },
      { title: "Job quality and accountability", description: "Monitoring should consider job quality, stability and inclusion—not placement alone.", pages: "57–59" },
    ],
    findings: [
      { title: "Social protection improves resilience", detail: "Young workers with access to inclusive protection are better able to remain connected to employment pathways during periods of disruption.", page: "38" },
      { title: "Implementation requires shared responsibility", detail: "Sustained cooperation among public institutions, employers, educators and youth-led organizations is a condition for delivery.", page: "47" },
      { title: "Job quality must be measured", detail: "Placement figures alone can conceal instability, low protection and unequal employment outcomes.", page: "59" },
    ],
    baseMessageDetails: [
      { whyItMatters: "Unequal transitions can reproduce exclusion and limit progress on decent work.", relevantData: "The report identifies young people facing multiple forms of exclusion as encountering the greatest transition barriers.", communicationAngle: "Public awareness · Policy action" },
      { whyItMatters: "Training investments have limited impact when they are disconnected from real employment pathways.", relevantData: "The report links stronger employment outcomes with curricula aligned to current and anticipated labour demand.", communicationAngle: "Policy action · Partnership" },
      { whyItMatters: "Participation improves programme relevance, accountability and public trust.", relevantData: "The report states that participation from the policy-design stage improves relevance and accountability.", communicationAngle: "Youth engagement · Public accountability" },
    ],
    messages: [
      { title: "Inclusive social protection helps young people remain connected to employment pathways.", whyItMatters: "Economic or personal disruption should not push young people permanently out of education or work.", communicationPurpose: "Connect social protection to employment resilience.", evidence: "“Access to inclusive social protection reduces the likelihood that temporary disruption becomes long-term labour-market exclusion.”", page: "38", relevantData: "Protection coverage is presented as a condition of resilient transitions, not a separate policy issue.", audience: "Policy makers, civil society and development partners", communicationAngle: "Policy action · Public awareness" },
      { title: "Progress depends on sustained cooperation across institutions and sectors.", whyItMatters: "No single institution controls education, labour demand, protection and participation pathways.", communicationPurpose: "Frame implementation as a shared responsibility.", evidence: "“Implementation depends on sustained cooperation among public institutions, employers, education providers and youth-led organizations.”", page: "47", relevantData: "Four partner groups are identified as central to implementation.", audience: "Policy makers, employers, educators and donors", communicationAngle: "Partnership · Policy action" },
      { title: "Digital access increasingly shapes whether young people can reach work and training opportunities.", whyItMatters: "Digital exclusion can reinforce existing geographic, income and disability-related barriers.", communicationPurpose: "Make digital inclusion visible within employment communication.", evidence: "“Digital access is increasingly a prerequisite for job search, training participation and access to employment services.”", page: "12", relevantData: "The report treats digital access as an enabling condition across employment services.", audience: "Public, media and service providers", communicationAngle: "Public awareness · Behaviour change" },
      { title: "Employment programmes should report job quality and stability, not placement numbers alone.", whyItMatters: "Headline placement figures can conceal insecure or poorly protected employment.", communicationPurpose: "Promote responsible use of outcome data.", evidence: "“Placement rates alone do not capture whether employment is stable, adequately protected or responsive to young people’s aspirations.”", page: "59", relevantData: "The proposed monitoring frame includes stability, protection and responsiveness alongside placement.", audience: "Policy makers, media and programme evaluators", communicationAngle: "Data literacy · Public accountability" },
    ],
    evidenceAreas: [
      { type: "Indicator", label: "Transition barriers", evidence: "Groups facing multiple forms of exclusion encounter the greatest barriers between education and employment.", page: "18" },
      { type: "Data relationship", label: "Skills alignment", evidence: "Employment outcomes are stronger when curricula reflect current and anticipated labour demand.", page: "31" },
      { type: "Implementation evidence", label: "Cross-sector partnership", evidence: "Delivery depends on sustained cooperation across four institutional partner groups.", page: "47" },
      { type: "Direct quotation", label: "Youth participation", evidence: "“Youth participation from the policy-design stage improves programme relevance, accountability and public trust.”", page: "52" },
    ],
    evidence: [
      { label: "Digital access", page: "12", directEvidence: "“Digital access is increasingly a prerequisite for job search, training participation and access to employment services.”", communicationInsight: "Digital inclusion should be framed as part of employment access rather than as a separate technology issue.", suggestedUse: { targetAudience: "Public, media and service providers", recommendedFraming: "Employment pathways increasingly depend on accessible digital services.", channel: "Explainer, web story and social media" } },
      { label: "Social protection", page: "38", directEvidence: "“Access to inclusive social protection reduces the likelihood that temporary disruption becomes long-term labour-market exclusion.”", communicationInsight: "The evidence supports connecting protection policy with employment resilience.", suggestedUse: { targetAudience: "Policy makers, civil society and development partners", recommendedFraming: "Protection helps young people stay connected to opportunity during disruption.", channel: "Policy brief, media briefing and LinkedIn" } },
      { label: "Job quality", page: "59", directEvidence: "“Placement rates alone do not capture whether employment is stable, adequately protected or responsive to young people’s aspirations.”", communicationInsight: "Communicators should avoid treating a single placement figure as a complete measure of success.", suggestedUse: { targetAudience: "Policy makers, media and evaluators", recommendedFraming: "Employment outcomes should be assessed by quality as well as quantity.", channel: "Data explainer, press Q&A and policy brief" } },
    ],
    guidance: {
      public: "Lead with the lived experience of unequal transitions and explain the combined role of skills, protection and participation in plain language.",
      policy: "Connect each finding to a specific implementation responsibility and retain page-level evidence for every policy claim.",
      media: "Provide attributable toplines, definitions and context; make clear where findings describe association rather than causation.",
      emphasize: "Unequal access, shared institutional responsibility, youth agency and the need to measure job quality.",
      avoid: "Do not imply that skills training alone solves unemployment or that conditions are uniform across regions and groups.",
    },
    basis: {
      short: "Short-document simulation: the prototype prioritizes three evidence-linked messages and a focused set of themes.",
      medium: "Medium-document simulation: the prototype clusters themes, findings and five evidence-linked messages across the report.",
      long: "Long-document simulation: the prototype expands coverage to seven messages while preserving page-level traceability.",
    },
  },
  fr: {
    overview: {
      topic: "Parcours équitables entre l’éducation et le travail décent pour les jeunes",
      researchContext: "Analyse interrégionale de l’exclusion structurelle, de l’adéquation des compétences, de la protection sociale, de la coordination institutionnelle et de la participation des jeunes.",
      coreQuestion: "Quelles conditions politiques et opérationnelles permettent aux jeunes, notamment aux groupes exclus, d’accéder durablement à un emploi décent ?",
    },
    themes: [
      { title: "Transitions inégales vers l’emploi", description: "Les obstacles structurels varient selon les groupes et les régions.", pages: "18–24" },
      { title: "Compétences et marché du travail", description: "Les résultats dépendent du lien entre formation et demande actuelle ou émergente.", pages: "31–36" },
      { title: "Protection sociale inclusive", description: "La protection limite le risque qu’une interruption temporaire devienne une exclusion durable.", pages: "38–43" },
      { title: "Partenariats et participation", description: "La coordination et une participation réelle renforcent la mise en œuvre et la confiance.", pages: "47–52" },
      { title: "Qualité de l’emploi et redevabilité", description: "Le suivi doit mesurer la qualité, la stabilité et l’inclusion, pas seulement le placement.", pages: "57–59" },
    ],
    findings: [
      { title: "La protection sociale renforce la résilience", detail: "Une protection inclusive aide les jeunes à rester connectés aux parcours d’emploi pendant les périodes de perturbation.", page: "38" },
      { title: "La mise en œuvre exige une responsabilité partagée", detail: "La coopération durable entre institutions, employeurs, éducateurs et organisations de jeunesse conditionne les résultats.", page: "47" },
      { title: "La qualité de l’emploi doit être mesurée", detail: "Les chiffres de placement peuvent masquer l’instabilité, la faible protection et les inégalités de résultats.", page: "59" },
    ],
    baseMessageDetails: [
      { whyItMatters: "Des transitions inégales peuvent reproduire l’exclusion et freiner les progrès vers le travail décent.", relevantData: "Le rapport identifie les jeunes confrontés à plusieurs formes d’exclusion comme les plus exposés aux obstacles.", communicationAngle: "Sensibilisation · Action politique" },
      { whyItMatters: "Les investissements dans la formation ont peu d’effet sans débouchés professionnels réels.", relevantData: "Le rapport associe de meilleurs résultats à des cursus alignés sur la demande actuelle et future.", communicationAngle: "Action politique · Partenariat" },
      { whyItMatters: "La participation améliore la pertinence, la redevabilité et la confiance du public.", relevantData: "Le rapport relie la participation dès la conception à une meilleure pertinence des programmes.", communicationAngle: "Participation des jeunes · Redevabilité" },
    ],
    messages: [
      { title: "Une protection sociale inclusive aide les jeunes à rester connectés aux parcours d’emploi.", whyItMatters: "Une perturbation économique ou personnelle ne devrait pas entraîner une exclusion durable.", communicationPurpose: "Relier protection sociale et résilience professionnelle.", evidence: "« L’accès à une protection sociale inclusive réduit le risque qu’une perturbation temporaire devienne une exclusion durable du marché du travail. »", page: "38", relevantData: "La couverture de protection est présentée comme une condition de transitions résilientes.", audience: "Décideurs, société civile et partenaires du développement", communicationAngle: "Action politique · Sensibilisation" },
      { title: "Les progrès exigent une coopération durable entre institutions et secteurs.", whyItMatters: "Aucune institution ne contrôle seule l’éducation, la demande de travail, la protection et la participation.", communicationPurpose: "Présenter la mise en œuvre comme une responsabilité partagée.", evidence: "« La mise en œuvre dépend d’une coopération durable entre institutions publiques, employeurs, établissements d’enseignement et organisations dirigées par des jeunes. »", page: "47", relevantData: "Quatre groupes partenaires sont identifiés comme essentiels à la mise en œuvre.", audience: "Décideurs, employeurs, éducateurs et donateurs", communicationAngle: "Partenariat · Action politique" },
      { title: "L’accès numérique conditionne de plus en plus l’accès des jeunes au travail et à la formation.", whyItMatters: "L’exclusion numérique peut renforcer les obstacles géographiques, économiques et liés au handicap.", communicationPurpose: "Intégrer l’inclusion numérique au récit sur l’emploi.", evidence: "« L’accès numérique devient une condition préalable à la recherche d’emploi, à la formation et aux services d’emploi. »", page: "12", relevantData: "Le rapport présente l’accès numérique comme une condition transversale des services d’emploi.", audience: "Grand public, médias et prestataires de services", communicationAngle: "Sensibilisation · Changement de comportement" },
      { title: "Les programmes doivent rendre compte de la qualité et de la stabilité des emplois, pas seulement des placements.", whyItMatters: "Les chiffres de placement peuvent masquer des emplois instables ou insuffisamment protégés.", communicationPurpose: "Promouvoir une utilisation responsable des données de résultats.", evidence: "« Les taux de placement ne montrent pas à eux seuls si l’emploi est stable, protégé ou conforme aux aspirations des jeunes. »", page: "59", relevantData: "Le cadre proposé ajoute stabilité, protection et pertinence au taux de placement.", audience: "Décideurs, médias et évaluateurs", communicationAngle: "Culture des données · Redevabilité" },
    ],
    evidenceAreas: [
      { type: "Indicateur", label: "Obstacles à la transition", evidence: "Les groupes confrontés à plusieurs formes d’exclusion rencontrent les obstacles les plus importants.", page: "18" },
      { type: "Relation de données", label: "Adéquation des compétences", evidence: "Les résultats sont meilleurs lorsque les cursus reflètent la demande actuelle et future.", page: "31" },
      { type: "Élément de mise en œuvre", label: "Partenariat intersectoriel", evidence: "La mise en œuvre dépend d’une coopération durable entre quatre groupes partenaires.", page: "47" },
      { type: "Citation directe", label: "Participation des jeunes", evidence: "« La participation des jeunes dès la conception améliore la pertinence, la redevabilité et la confiance. »", page: "52" },
    ],
    evidence: [
      { label: "Accès numérique", page: "12", directEvidence: "« L’accès numérique devient une condition préalable à la recherche d’emploi, à la formation et aux services d’emploi. »", communicationInsight: "L’inclusion numérique doit être présentée comme une composante de l’accès à l’emploi.", suggestedUse: { targetAudience: "Grand public, médias et prestataires", recommendedFraming: "Les parcours professionnels dépendent de services numériques accessibles.", channel: "Explicatif, article web et réseaux sociaux" } },
      { label: "Protection sociale", page: "38", directEvidence: "« L’accès à une protection sociale inclusive réduit le risque qu’une perturbation temporaire devienne une exclusion durable du marché du travail. »", communicationInsight: "L’élément relie la protection sociale à la résilience professionnelle.", suggestedUse: { targetAudience: "Décideurs, société civile et partenaires", recommendedFraming: "La protection aide les jeunes à rester connectés aux possibilités.", channel: "Note politique, point presse et LinkedIn" } },
      { label: "Qualité de l’emploi", page: "59", directEvidence: "« Les taux de placement ne montrent pas à eux seuls si l’emploi est stable, protégé ou conforme aux aspirations des jeunes. »", communicationInsight: "Un seul chiffre de placement ne doit pas être présenté comme une mesure complète du succès.", suggestedUse: { targetAudience: "Décideurs, médias et évaluateurs", recommendedFraming: "Les résultats doivent être évalués en qualité comme en quantité.", channel: "Explicatif de données, Q&R presse et note politique" } },
    ],
    guidance: {
      public: "Commencer par l’expérience vécue des transitions inégales et expliquer simplement le rôle combiné des compétences, de la protection et de la participation.",
      policy: "Relier chaque conclusion à une responsabilité de mise en œuvre et conserver une source paginée pour chaque affirmation.",
      media: "Fournir des messages attribuables, des définitions et du contexte ; distinguer clairement association et causalité.",
      emphasize: "L’inégalité d’accès, la responsabilité partagée, le rôle actif des jeunes et la qualité de l’emploi.",
      avoid: "Ne pas laisser entendre que la formation seule résout le chômage ni que les situations sont uniformes.",
    },
    basis: {
      short: "Simulation d’un document court : trois messages sourcés et un ensemble ciblé de thèmes.",
      medium: "Simulation d’un document moyen : regroupement des thèmes, conclusions et cinq messages sourcés.",
      long: "Simulation d’un document long : couverture étendue à sept messages avec traçabilité par page.",
    },
  },
  zh: {
    overview: {
      topic: "促进青年从教育公平过渡到体面就业",
      researchContext: "跨区域审视结构性排斥、技能匹配、社会保障、机构协调和青年参与。",
      coreQuestion: "哪些政策与实施条件能够帮助青年，特别是受排斥群体，进入并持续获得体面就业？",
    },
    themes: [
      { title: "教育到就业过渡不均", description: "不同群体和地区面临的结构性障碍存在差异。", pages: "18–24" },
      { title: "技能与劳动力市场匹配", description: "培训成效取决于其与当前及新兴需求的联系。", pages: "31–36" },
      { title: "包容性社会保障", description: "社会保障可以降低短期中断演变为长期排斥的风险。", pages: "38–43" },
      { title: "伙伴关系与青年参与", description: "机构协调与有意义的参与有助于提高实施成效和信任。", pages: "47–52" },
      { title: "就业质量与问责", description: "监测不应只看就业人数，还应关注质量、稳定性和包容性。", pages: "57–59" },
    ],
    findings: [
      { title: "社会保障有助于增强韧性", detail: "获得包容性保障的青年更能在冲击期间保持与就业路径的联系。", page: "38" },
      { title: "实施需要共同责任", detail: "公共机构、雇主、教育机构和青年组织之间的持续合作是有效实施的条件。", page: "47" },
      { title: "必须衡量就业质量", detail: "单一就业人数可能掩盖就业不稳定、保障不足和结果不平等。", page: "59" },
    ],
    baseMessageDetails: [
      { whyItMatters: "不平等的过渡路径会延续排斥，并阻碍体面就业目标的实现。", relevantData: "报告指出，面临多重排斥的青年承受着最显著的就业过渡障碍。", communicationAngle: "公众认知 · 政策行动" },
      { whyItMatters: "如果培训与真实就业路径脱节，技能投资的效果会十分有限。", relevantData: "报告将更好的就业成效与对应当前及未来劳动力需求的课程联系起来。", communicationAngle: "政策行动 · 伙伴合作" },
      { whyItMatters: "青年参与能够提高项目相关性、问责性和公众信任。", relevantData: "报告指出，从政策设计阶段开始参与有助于提高项目相关性和问责性。", communicationAngle: "青年参与 · 公共问责" },
    ],
    messages: [
      { title: "包容性社会保障能够帮助青年持续连接就业路径。", whyItMatters: "经济或个人冲击不应导致青年永久退出教育或就业。", communicationPurpose: "将社会保障与就业韧性联系起来。", evidence: "“获得包容性社会保障可以降低短期中断演变为长期劳动力市场排斥的可能性。”", page: "38", relevantData: "报告将保障覆盖视为韧性就业过渡的必要条件。", audience: "政策制定者、民间社会和发展伙伴", communicationAngle: "政策行动 · 公众认知" },
      { title: "取得进展需要不同机构和部门之间持续合作。", whyItMatters: "任何单一机构都无法独自处理教育、劳动力需求、保障和参与问题。", communicationPurpose: "将实施呈现为共同责任。", evidence: "“项目实施依赖公共机构、雇主、教育机构和青年组织之间持续的合作。”", page: "47", relevantData: "报告明确了四类实施过程中的核心伙伴。", audience: "政策制定者、雇主、教育工作者和捐助方", communicationAngle: "伙伴合作 · 政策行动" },
      { title: "数字接入日益影响青年能否获得就业和培训机会。", whyItMatters: "数字排斥会加剧地域、收入和残障相关障碍。", communicationPurpose: "在就业传播中突出数字包容。", evidence: "“数字接入日益成为求职、参加培训和获得就业服务的前提条件。”", page: "12", relevantData: "报告将数字接入视为贯穿各类就业服务的基础条件。", audience: "公众、媒体和服务提供者", communicationAngle: "公众认知 · 行为改变" },
      { title: "就业项目应报告就业质量和稳定性，而不只是就业人数。", whyItMatters: "就业人数可能掩盖不稳定或缺乏保障的工作。", communicationPurpose: "促进负责任地使用成效数据。", evidence: "“仅靠就业率无法说明工作是否稳定、保障是否充分，或是否回应青年的发展愿望。”", page: "59", relevantData: "建议的监测框架同时纳入稳定性、保障和青年需求。", audience: "政策制定者、媒体和项目评估人员", communicationAngle: "数据素养 · 公共问责" },
    ],
    evidenceAreas: [
      { type: "指标", label: "就业过渡障碍", evidence: "面临多重排斥的群体在教育到就业过渡中承受着最显著的障碍。", page: "18" },
      { type: "数据关系", label: "技能匹配", evidence: "当课程对应当前及未来劳动力需求时，就业成效更好。", page: "31" },
      { type: "实施证据", label: "跨部门伙伴关系", evidence: "项目实施依赖四类核心伙伴之间的持续合作。", page: "47" },
      { type: "直接引文", label: "青年参与", evidence: "“从政策设计阶段开始的青年参与，能够提高项目相关性、问责性和公众信任。”", page: "52" },
    ],
    evidence: [
      { label: "数字接入", page: "12", directEvidence: "“数字接入日益成为求职、参加培训和获得就业服务的前提条件。”", communicationInsight: "数字包容应作为就业机会的一部分进行传播，而不是独立的技术议题。", suggestedUse: { targetAudience: "公众、媒体和服务提供者", recommendedFraming: "就业路径日益依赖无障碍数字服务。", channel: "解读文章、网站故事和社交媒体" } },
      { label: "社会保障", page: "38", directEvidence: "“获得包容性社会保障可以降低短期中断演变为长期劳动力市场排斥的可能性。”", communicationInsight: "该证据支持将社会保障政策与就业韧性联系起来。", suggestedUse: { targetAudience: "政策制定者、民间社会和发展伙伴", recommendedFraming: "社会保障帮助青年在冲击期间保持与机会的联系。", channel: "政策简报、媒体吹风会和 LinkedIn" } },
      { label: "就业质量", page: "59", directEvidence: "“仅靠就业率无法说明工作是否稳定、保障是否充分，或是否回应青年的发展愿望。”", communicationInsight: "传播人员应避免将单一就业人数描述为完整的成功指标。", suggestedUse: { targetAudience: "政策制定者、媒体和评估人员", recommendedFraming: "就业成效应同时衡量数量与质量。", channel: "数据解读、媒体问答和政策简报" } },
    ],
    guidance: {
      public: "从不平等就业过渡的真实处境切入，以平实语言解释技能、保障和参与的共同作用。",
      policy: "将每项发现对应到具体实施责任，并为所有政策主张保留页码级证据。",
      media: "提供可引用的核心信息、定义和背景，明确区分相关关系与因果关系。",
      emphasize: "重点突出机会不均、机构共同责任、青年主体作用和就业质量。",
      avoid: "避免暗示技能培训可以单独解决失业问题，也不要将不同地区和群体描述为情况完全一致。",
    },
    basis: {
      short: "短报告模拟：优先生成三条附证据的信息和一组聚焦主题。",
      medium: "中等长度报告模拟：聚类主要主题、发现，并生成五条附证据的信息。",
      long: "长报告模拟：扩展为七条核心信息，同时保留页码级证据可追溯性。",
    },
  },
};

function classify(options: DemoAnalysisOptions): { complexity: DocumentComplexity; estimatedPages?: number } {
  const estimatedPages = options.estimatedPages && options.estimatedPages > 0 ? Math.round(options.estimatedPages) : undefined;
  if (estimatedPages) return { estimatedPages, complexity: estimatedPages <= 25 ? "short" : estimatedPages <= 80 ? "medium" : "long" };
  const size = options.fileSize ?? 0;
  return { complexity: size > 5 * 1024 * 1024 ? "long" : size > 1.5 * 1024 * 1024 ? "medium" : "short" };
}

export function buildDemoAnalysis(brief: Brief, locale: Locale, options: DemoAnalysisOptions): Brief {
  const config = expansion[locale];
  const profile = classify(options);
  const counts = profile.complexity === "short"
    ? { themes: 3, findings: 2, messages: 3, evidenceAreas: 2 }
    : profile.complexity === "medium"
      ? { themes: 4, findings: 4, messages: 5, evidenceAreas: 3 }
      : { themes: 5, findings: 6, messages: 7, evidenceAreas: 4 };

  const baseMessages = brief.keyMessages.map((message, index) => ({ ...message, ...config.baseMessageDetails[index] }));
  const keyMessages = [...baseMessages, ...config.messages].slice(0, counts.messages);
  const keyFindings = [...brief.summarySections.keyFindings, ...config.findings].slice(0, counts.findings);

  return {
    ...brief,
    analysisProfile: {
      ...profile,
      keyMessageCount: keyMessages.length,
      basis: config.basis[profile.complexity],
    },
    summarySections: {
      ...brief.summarySections,
      reportOverview: config.overview,
      mainThemes: config.themes.slice(0, counts.themes),
      keyFindings,
      evidenceAreas: config.evidenceAreas.slice(0, counts.evidenceAreas),
      communicationGuidance: config.guidance,
    },
    keyMessages,
    evidence: [...brief.evidence, ...config.evidence],
  };
}
