import { enrichSocialPosts, type Brief, type CommunicationMode, type SocialPostDraft } from "@/lib/brief";
import type { Locale } from "@/lib/locales";

type ModeProfile = {
  implications: string;
  messagePurposes: [string, string, string];
  audiences: Brief["audiences"];
  socialPosts: SocialPostDraft[];
  recommendations: Brief["recommendations"];
  evidenceUse: { targetAudience: string; framingLead: string; channel: string };
};

const profiles: Record<Locale, Record<CommunicationMode, ModeProfile>> = {
  en: {
    advocacy: {
      implications: "Lead with specific policy decisions, implementation responsibilities and evidence-backed asks. Use concise institutional language, identify the cost of inaction without overstating it, and provide decision-makers with a clear route from finding to policy response.",
      messagePurposes: ["Secure policy commitment to coordinated education-to-work pathways.", "Build support for labour-market alignment in skills policy and funding decisions.", "Position meaningful youth participation as a standard for accountable policy design."],
      audiences: [
        { name: "National policymakers", priority: "Primary", needs: "Decision points, policy options and concise evidence", channels: "Policy brief, bilateral briefing, LinkedIn" },
        { name: "Labour ministries and public agencies", priority: "Decision-maker", needs: "Implementation implications, roles and feasible next steps", channels: "Technical briefing, stakeholder meeting, email brief" },
        { name: "Employers and education providers", priority: "Implementation partner", needs: "Partnership asks and labour-market relevance", channels: "Roundtable, sector newsletter, LinkedIn" },
        { name: "Youth-led organizations", priority: "Accountability partner", needs: "Participation routes and commitments they can monitor", channels: "Consultation, advocacy toolkit, social media" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "Closing youth employment gaps requires coordinated policy choices: stronger education-to-work pathways, skills aligned with labour demand and meaningful youth participation in decision-making. Evidence can—and should—guide the next step.", notes: "Policy focused · Decision-maker audience · CTA: Review the priority actions" },
        { platform: "X", post: "Youth employment gaps are not solved by training alone. Policy alignment, inclusive protection and youth participation must move together. #YouthEmployment #DecentWork", notes: "Advocacy line · Evidence led · Link to policy brief" },
        { platform: "Instagram", post: "Three policy priorities for better youth employment pathways: connect skills to real jobs, protect those facing exclusion, and involve young people in decisions from the start.", notes: "Advocacy carousel · Three actions · Link in bio" },
      ],
      recommendations: [
        { title: "Define one policy ask", description: "Translate the evidence into a specific, feasible decision for the priority policy audience." },
        { title: "Prepare a decision-maker brief", description: "Pair each recommendation with its evidence page, responsible actor and proposed next step." },
        { title: "Build a coalition of voices", description: "Combine institutional evidence with perspectives from youth, employers and delivery partners." },
        { title: "Protect factual precision", description: "Use only verified claims and distinguish report findings from advocacy recommendations." },
      ],
      evidenceUse: { targetAudience: "Policymakers and institutional decision-makers", framingLead: "Policy action:", channel: "Policy brief, decision-maker meeting and LinkedIn" },
    },
    awareness: {
      implications: "Translate the findings into accessible, people-centred language while retaining source references. Explain why the issue matters in everyday life, avoid technical shorthand and use a small number of memorable messages across public channels.",
      messagePurposes: ["Help public audiences understand why inclusive education-to-work pathways matter.", "Explain the connection between skills programmes and real employment opportunities.", "Show that youth participation improves relevance, accountability and trust."],
      audiences: [
        { name: "General public", priority: "Primary", needs: "Accessible context, human relevance and clear takeaways", channels: "Web story, Instagram, X" },
        { name: "Young people and families", priority: "Priority stakeholder", needs: "Practical relevance, inclusive language and participation routes", channels: "Instagram, short video, community networks" },
        { name: "Media and public-information partners", priority: "Multiplier", needs: "Verified toplines, context and source references", channels: "Media note, X, digital press kit" },
        { name: "Civil society and educators", priority: "Partner", needs: "Shareable messages and local discussion prompts", channels: "Newsletter, webinar, LinkedIn" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "Young people need inclusive pathways from education to decent work. Coordinated action on skills, social protection and youth participation can help close persistent access gaps.", notes: "Accessible · Evidence based · CTA: Explore the findings" },
        { platform: "X", post: "Decent work for young people requires more than skills alone. Coordinated policy, inclusive protection and meaningful youth participation all matter. #YouthEmployment", notes: "Public facing · Concise · Link to explainer" },
        { platform: "Instagram", post: "From education to employment, too many young people still face barriers. Better pathways begin with inclusive policy—and with young people at the table.", notes: "People centred · Visual led · Three-panel carousel" },
      ],
      recommendations: [
        { title: "Lead with human relevance", description: "Explain how the evidence affects young people before introducing institutional recommendations." },
        { title: "Use three memorable findings", description: "Build a simple narrative around access, skills alignment and participation." },
        { title: "Create accessible visual content", description: "Pair plain-language findings with source pages in captions and alt text." },
        { title: "Maintain regional nuance", description: "Avoid presenting different country and regional conditions as uniform." },
      ],
      evidenceUse: { targetAudience: "General public, young people and civil society", framingLead: "Public relevance:", channel: "Web story, Instagram and X" },
    },
    media: {
      implications: "Prioritize verified toplines, news value and context that prevents misinterpretation. Prepare clear attribution, a concise spokesperson line, likely questions and answers, and direct links to the relevant evidence pages.",
      messagePurposes: ["Provide a clear, attributable topline for media coverage.", "Offer a concrete evidence angle on why skills policy must reflect labour demand.", "Supply a credible participation and accountability angle for interviews and features."],
      audiences: [
        { name: "Journalists and editors", priority: "Primary", needs: "Newsworthy toplines, context, attribution and source access", channels: "Media brief, press call, digital press kit" },
        { name: "Spokespersons and senior leaders", priority: "Internal", needs: "Approved lines, Q&A and risk-sensitive language", channels: "Talking points, briefing call, Q&A note" },
        { name: "Specialist correspondents", priority: "Technical", needs: "Methodological context and disaggregated evidence", channels: "Background briefing, data note, email" },
        { name: "Public-information partners", priority: "Amplifier", needs: "Consistent messages and shareable verified assets", channels: "Partner media pack, X, newsroom" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "New evidence highlights persistent barriers in the transition from education to decent work. The report points to three priorities: labour-market aligned skills, inclusive protection and youth participation from the start.", notes: "News topline · Institutional attribution · Link to media materials" },
        { platform: "X", post: "NEW: Evidence on youth employment identifies persistent transition barriers—and calls for aligned skills policy, inclusive protection and meaningful youth participation. #DecentWork", notes: "News format · Link to report and media contact" },
        { platform: "Instagram", post: "What does the latest evidence say about youth employment? Three findings explain where barriers persist—and what coordinated action can do.", notes: "News explainer · Data cards · Direct report link" },
      ],
      recommendations: [
        { title: "Prepare three verified toplines", description: "Each media line should include attribution and a direct source page." },
        { title: "Develop spokesperson Q&A", description: "Anticipate questions about regional variation, causality, methodology and limitations." },
        { title: "Separate findings from recommendations", description: "Make clear what the report states and what the communication team recommends emphasizing." },
        { title: "Create a rapid-response pack", description: "Provide approved quotes, evidence links, definitions and media contact information." },
      ],
      evidenceUse: { targetAudience: "Journalists, editors and spokespersons", framingLead: "Verified media angle:", channel: "Media brief, spokesperson Q&A and X" },
    },
    engagement: {
      implications: "Turn the evidence into an invitation for two-way participation. Use questions, accessible formats and clear participation routes; explain how input will be used and build a feedback loop into follow-up communication.",
      messagePurposes: ["Invite young people to identify barriers and priorities in their own contexts.", "Generate dialogue among employers, educators and young people about relevant skills pathways.", "Make participation a visible part of programme design, delivery and accountability."],
      audiences: [
        { name: "Young people", priority: "Primary participant", needs: "Accessible context, safe participation routes and visible follow-up", channels: "Instagram, dialogue event, youth networks" },
        { name: "Youth-led organizations", priority: "Convening partner", needs: "Discussion tools, facilitation roles and feedback mechanisms", channels: "Workshop kit, partner call, community platforms" },
        { name: "Employers and educators", priority: "Dialogue partner", needs: "Questions linked to implementation and collaboration", channels: "Roundtable, webinar, LinkedIn" },
        { name: "Policymakers", priority: "Listening audience", needs: "Structured stakeholder input and actionable themes", channels: "Consultation summary, briefing, stakeholder event" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "What would make the path from education to decent work more inclusive? The evidence points to skills, protection and participation—but effective solutions need dialogue among young people, policymakers, employers and educators.", notes: "Discussion prompt · Professional audience · CTA: Join the dialogue" },
        { platform: "X", post: "What is the biggest barrier young people face between education and decent work? Share your perspective—and help inform a more inclusive conversation. #YouthEmployment", notes: "Question led · Participation CTA · Moderation required" },
        { platform: "Instagram", post: "Your experience matters. What would make the journey from education to employment fairer and more inclusive? Add your voice to the conversation.", notes: "Interactive story or carousel · Question sticker · Feedback follow-up" },
      ],
      recommendations: [
        { title: "Define a meaningful participation ask", description: "Ask a focused question and explain how responses will inform the next step." },
        { title: "Create a facilitated dialogue kit", description: "Provide evidence cards, accessible prompts and guidance for safe participation." },
        { title: "Plan the feedback loop", description: "Publish what was heard, what will change and what cannot be acted upon." },
        { title: "Use inclusive formats", description: "Offer low-bandwidth, multilingual and accessible ways to participate." },
      ],
      evidenceUse: { targetAudience: "Young people, youth-led organizations and dialogue partners", framingLead: "Engagement prompt:", channel: "Instagram, facilitated dialogue and partner networks" },
    },
  },
  fr: {
    advocacy: {
      implications: "Mettre en avant les décisions politiques, les responsabilités de mise en œuvre et des demandes fondées sur les faits. Utiliser un langage institutionnel concis et offrir aux décideurs un parcours clair entre conclusion et réponse politique.",
      messagePurposes: ["Obtenir un engagement politique en faveur de parcours coordonnés entre éducation et emploi.", "Soutenir l’alignement sur le marché du travail dans les politiques de compétences et les décisions de financement.", "Faire de la participation réelle des jeunes une norme de conception responsable des politiques."],
      audiences: [
        { name: "Décideurs nationaux", priority: "Principal", needs: "Décisions à prendre, options politiques et faits concis", channels: "Note de politique, réunion bilatérale, LinkedIn" },
        { name: "Ministères du travail et organismes publics", priority: "Décideur", needs: "Implications de mise en œuvre, rôles et prochaines étapes", channels: "Réunion technique, rencontre de parties prenantes, note par courriel" },
        { name: "Employeurs et établissements d’enseignement", priority: "Partenaire de mise en œuvre", needs: "Demandes de partenariat et pertinence pour le marché du travail", channels: "Table ronde, bulletin sectoriel, LinkedIn" },
        { name: "Organisations dirigées par des jeunes", priority: "Partenaire de redevabilité", needs: "Voies de participation et engagements à suivre", channels: "Consultation, outil de plaidoyer, réseaux sociaux" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "Réduire les écarts d’emploi des jeunes exige des choix politiques coordonnés : de meilleurs parcours entre éducation et emploi, des compétences adaptées à la demande et une participation réelle des jeunes aux décisions.", notes: "Axé sur les politiques · Décideurs · Appel : examiner les actions prioritaires" },
        { platform: "X", post: "Les écarts d’emploi des jeunes ne se résolvent pas par la formation seule. Cohérence des politiques, protection inclusive et participation doivent progresser ensemble. #EmploiDesJeunes", notes: "Plaidoyer · Fondé sur les faits · Lien vers la note" },
        { platform: "Instagram", post: "Trois priorités politiques : relier les compétences aux emplois réels, protéger les jeunes confrontés à l’exclusion et les associer aux décisions dès le départ.", notes: "Carrousel de plaidoyer · Trois actions · Lien en bio" },
      ],
      recommendations: [
        { title: "Définir une demande politique", description: "Transformer les faits en une décision précise et réalisable pour le public prioritaire." },
        { title: "Préparer une note pour décideurs", description: "Associer chaque recommandation à sa page source, à l’acteur responsable et à l’étape suivante." },
        { title: "Rassembler une coalition de voix", description: "Combiner les faits institutionnels aux perspectives des jeunes et partenaires." },
        { title: "Préserver la précision factuelle", description: "Distinguer clairement les conclusions du rapport des recommandations de plaidoyer." },
      ],
      evidenceUse: { targetAudience: "Décideurs et responsables institutionnels", framingLead: "Action politique :", channel: "Note de politique, réunion de décideurs et LinkedIn" },
    },
    awareness: {
      implications: "Traduire les conclusions dans un langage accessible et centré sur les personnes tout en conservant les références. Expliquer leur importance dans la vie quotidienne et utiliser quelques messages mémorables sur les canaux publics.",
      messagePurposes: ["Aider le public à comprendre l’importance de parcours inclusifs entre éducation et emploi.", "Expliquer le lien entre programmes de compétences et possibilités d’emploi réelles.", "Montrer que la participation des jeunes renforce la pertinence, la redevabilité et la confiance."],
      audiences: [
        { name: "Grand public", priority: "Principal", needs: "Contexte accessible, pertinence humaine et messages clairs", channels: "Article web, Instagram, X" },
        { name: "Jeunes et familles", priority: "Partie prenante prioritaire", needs: "Pertinence pratique, langage inclusif et voies de participation", channels: "Instagram, vidéo courte, réseaux communautaires" },
        { name: "Médias et partenaires d’information publique", priority: "Relais", needs: "Messages principaux vérifiés, contexte et sources", channels: "Note média, X, dossier de presse numérique" },
        { name: "Société civile et éducateurs", priority: "Partenaire", needs: "Messages partageables et questions de discussion", channels: "Bulletin, webinaire, LinkedIn" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "Les jeunes ont besoin de parcours inclusifs entre l’éducation et le travail décent. Une action coordonnée sur les compétences, la protection sociale et la participation peut réduire les écarts persistants.", notes: "Accessible · Fondé sur les faits · Appel : découvrir les conclusions" },
        { platform: "X", post: "Le travail décent pour les jeunes exige plus que des compétences. Politiques coordonnées, protection inclusive et participation réelle sont essentielles. #EmploiDesJeunes", notes: "Grand public · Concis · Lien vers l’explicatif" },
        { platform: "Instagram", post: "De l’éducation à l’emploi, trop de jeunes rencontrent encore des obstacles. De meilleurs parcours commencent par des politiques inclusives—et par la participation des jeunes.", notes: "Centré sur les personnes · Visuel · Carrousel en trois volets" },
      ],
      recommendations: [
        { title: "Commencer par la pertinence humaine", description: "Expliquer l’effet des conclusions sur les jeunes avant les recommandations institutionnelles." },
        { title: "Utiliser trois conclusions mémorables", description: "Construire le récit autour de l’accès, des compétences et de la participation." },
        { title: "Créer des contenus visuels accessibles", description: "Associer un langage clair aux pages sources dans les légendes et textes alternatifs." },
        { title: "Préserver les nuances régionales", description: "Ne pas présenter les situations nationales et régionales comme uniformes." },
      ],
      evidenceUse: { targetAudience: "Grand public, jeunes et société civile", framingLead: "Pertinence publique :", channel: "Article web, Instagram et X" },
    },
    media: {
      implications: "Privilégier des messages principaux vérifiés, leur intérêt journalistique et le contexte nécessaire pour éviter les erreurs d’interprétation. Préparer une attribution claire, une formule de porte-parole, des questions-réponses et des liens directs vers les pages sources.",
      messagePurposes: ["Fournir un message principal clair et attribuable pour la couverture médiatique.", "Proposer un angle factuel sur l’adaptation des compétences à la demande de travail.", "Offrir un angle crédible sur la participation et la redevabilité pour les entretiens."],
      audiences: [
        { name: "Journalistes et rédacteurs", priority: "Principal", needs: "Messages d’actualité, contexte, attribution et accès aux sources", channels: "Note média, appel presse, dossier numérique" },
        { name: "Porte-paroles et direction", priority: "Interne", needs: "Éléments approuvés, Q&R et langage sensible aux risques", channels: "Éléments de langage, réunion préparatoire, Q&R" },
        { name: "Correspondants spécialisés", priority: "Technique", needs: "Contexte méthodologique et données désagrégées", channels: "Réunion de fond, note de données, courriel" },
        { name: "Partenaires d’information publique", priority: "Amplificateur", needs: "Messages cohérents et ressources vérifiées", channels: "Dossier média partenaire, X, salle de presse" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "De nouveaux éléments révèlent des obstacles persistants entre l’éducation et le travail décent. Trois priorités se dégagent : compétences adaptées, protection inclusive et participation des jeunes dès le départ.", notes: "Message d’actualité · Attribution institutionnelle · Lien médias" },
        { platform: "X", post: "NOUVEAU : les données sur l’emploi des jeunes appellent à des compétences adaptées, une protection inclusive et une participation réelle. #TravailDécent", notes: "Format actualité · Rapport et contact média" },
        { platform: "Instagram", post: "Que disent les dernières données sur l’emploi des jeunes ? Trois conclusions expliquent les obstacles persistants et les réponses possibles.", notes: "Explicatif d’actualité · Cartes de données · Lien direct" },
      ],
      recommendations: [
        { title: "Préparer trois messages vérifiés", description: "Chaque message média doit inclure une attribution et une page source." },
        { title: "Élaborer des Q&R pour porte-parole", description: "Anticiper les questions sur les variations régionales, la méthode et les limites." },
        { title: "Distinguer faits et recommandations", description: "Indiquer clairement ce que dit le rapport et ce que l’équipe propose de souligner." },
        { title: "Créer un dossier de réponse rapide", description: "Fournir citations approuvées, liens, définitions et contact média." },
      ],
      evidenceUse: { targetAudience: "Journalistes, rédacteurs et porte-paroles", framingLead: "Angle média vérifié :", channel: "Note média, Q&R de porte-parole et X" },
    },
    engagement: {
      implications: "Transformer les faits en invitation à une participation à double sens. Utiliser des questions, des formats accessibles et des voies de participation claires ; expliquer l’utilisation des contributions et prévoir un retour vers les participants.",
      messagePurposes: ["Inviter les jeunes à identifier les obstacles et priorités dans leur contexte.", "Créer un dialogue sur les parcours de compétences pertinents entre employeurs, éducateurs et jeunes.", "Rendre la participation visible dans la conception, la mise en œuvre et la redevabilité."],
      audiences: [
        { name: "Jeunes", priority: "Participant principal", needs: "Contexte accessible, participation sûre et suivi visible", channels: "Instagram, dialogue, réseaux de jeunesse" },
        { name: "Organisations dirigées par des jeunes", priority: "Partenaire de mobilisation", needs: "Outils de discussion, rôles de facilitation et retour", channels: "Kit d’atelier, appel partenaire, plateformes communautaires" },
        { name: "Employeurs et éducateurs", priority: "Partenaire de dialogue", needs: "Questions liées à la mise en œuvre et à la collaboration", channels: "Table ronde, webinaire, LinkedIn" },
        { name: "Décideurs", priority: "Public à l’écoute", needs: "Contributions structurées et thèmes exploitables", channels: "Synthèse de consultation, note, événement" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "Comment rendre le passage de l’éducation au travail décent plus inclusif ? Les faits soulignent les compétences, la protection et la participation—mais les solutions exigent un dialogue entre tous les acteurs.", notes: "Question de discussion · Public professionnel · Appel : participer" },
        { platform: "X", post: "Quel est le principal obstacle entre l’éducation et le travail décent ? Partagez votre expérience pour enrichir la conversation. #EmploiDesJeunes", notes: "Question · Appel à participer · Modération requise" },
        { platform: "Instagram", post: "Votre expérience compte. Qu’est-ce qui rendrait le passage de l’éducation à l’emploi plus juste et plus inclusif ? Partagez votre voix.", notes: "Story interactive · Question · Retour aux participants" },
      ],
      recommendations: [
        { title: "Définir une demande de participation utile", description: "Poser une question précise et expliquer l’utilisation des réponses." },
        { title: "Créer un kit de dialogue", description: "Fournir cartes de faits, questions accessibles et règles de participation sûre." },
        { title: "Planifier le retour", description: "Publier ce qui a été entendu, ce qui changera et ce qui ne pourra pas être retenu." },
        { title: "Utiliser des formats inclusifs", description: "Proposer des moyens multilingues, accessibles et à faible bande passante." },
      ],
      evidenceUse: { targetAudience: "Jeunes, organisations de jeunesse et partenaires du dialogue", framingLead: "Question de participation :", channel: "Instagram, dialogue facilité et réseaux partenaires" },
    },
  },
  zh: {
    advocacy: {
      implications: "突出具体政策决定、实施责任和有证据支持的政策诉求。使用简洁的机构语言，在不过度渲染的前提下说明不采取行动的影响，并为决策者提供从研究发现到政策回应的清晰路径。",
      messagePurposes: ["争取政策层面对教育至就业协调路径的承诺。", "推动技能政策和资金决策更好地对应劳动力市场需求。", "将有意义的青年参与确立为负责任政策设计的基本标准。"],
      audiences: [
        { name: "国家政策制定者", priority: "主要受众", needs: "决策要点、政策选项和简明证据", channels: "政策简报、双边简报会、LinkedIn" },
        { name: "劳工部门与公共机构", priority: "决策方", needs: "实施影响、责任分工和可行下一步", channels: "技术简报会、利益相关方会议、邮件简报" },
        { name: "雇主与教育机构", priority: "实施伙伴", needs: "合作诉求和劳动力市场相关性", channels: "圆桌会议、行业通讯、LinkedIn" },
        { name: "青年主导的组织", priority: "问责伙伴", needs: "参与渠道和可跟踪的政策承诺", channels: "政策咨询、倡导工具包、社交媒体" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "缩小青年就业差距需要协调一致的政策选择：完善从教育到就业的路径，使技能培训对应劳动力需求，并让青年真正参与决策。证据应当为下一步行动提供依据。", notes: "政策导向 · 决策者受众 · 行动号召：查看优先行动" },
        { platform: "X", post: "仅靠培训无法解决青年就业差距。政策协调、包容性保障和青年参与必须同步推进。#青年就业 #体面劳动", notes: "政策倡导 · 循证表达 · 链接至政策简报" },
        { platform: "Instagram", post: "促进青年就业的三项政策重点：让技能连接真实岗位，保护面临排斥的青年，并从一开始就让青年参与决策。", notes: "政策倡导轮播图 · 三项行动 · 简介链接" },
      ],
      recommendations: [
        { title: "明确一项政策诉求", description: "将证据转化为重点政策受众能够采取的具体、可行决定。" },
        { title: "准备决策者简报", description: "为每项建议标注证据页码、责任主体和建议下一步。" },
        { title: "建立多方声音联盟", description: "将机构证据与青年、雇主和实施伙伴的观点结合。" },
        { title: "确保事实准确", description: "只使用经核验的主张，并区分报告发现与倡导建议。" },
      ],
      evidenceUse: { targetAudience: "政策制定者和机构决策者", framingLead: "政策行动：", channel: "政策简报、决策者会议和 LinkedIn" },
    },
    awareness: {
      implications: "在保留来源信息的前提下，将研究发现转化为易懂、以人为本的语言。说明议题与日常生活的关系，避免技术术语，并在公共渠道中持续使用少量清晰、易记的信息。",
      messagePurposes: ["帮助公众理解包容性教育至就业路径的重要性。", "解释技能项目与真实就业机会之间的联系。", "说明青年参与如何提升相关性、问责性和公众信任。"],
      audiences: [
        { name: "公众", priority: "主要受众", needs: "易懂的背景、与人的关联和清晰要点", channels: "网站故事、Instagram、X" },
        { name: "青年及家庭", priority: "重点利益相关方", needs: "实践相关性、包容性语言和参与渠道", channels: "Instagram、短视频、社区网络" },
        { name: "媒体与公共信息伙伴", priority: "传播放大者", needs: "经核验的主要信息、背景和来源", channels: "媒体说明、X、数字媒体资料包" },
        { name: "民间社会与教育工作者", priority: "合作伙伴", needs: "便于分享的信息和本地讨论问题", channels: "通讯、网络研讨会、LinkedIn" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "青年需要从教育通向体面就业的包容性路径。围绕技能、社会保障和青年参与采取协调行动，有助于缩小持续存在的机会差距。", notes: "易于理解 · 循证 · 行动号召：了解主要发现" },
        { platform: "X", post: "促进青年体面就业不能只依靠技能培训。协调的政策、包容性保障和有意义的青年参与同样重要。#青年就业", notes: "面向公众 · 简洁 · 链接至解读文章" },
        { platform: "Instagram", post: "从教育到就业，仍有太多青年面临障碍。更好的发展路径始于包容性政策，也始于让青年真正参与决策。", notes: "以人为本 · 视觉优先 · 三页轮播图" },
      ],
      recommendations: [
        { title: "先说明与人的关联", description: "先解释证据对青年的实际影响，再介绍机构建议。" },
        { title: "使用三项易记发现", description: "围绕机会、技能匹配和青年参与构建简明叙事。" },
        { title: "制作无障碍视觉内容", description: "使用平实语言，并在说明和替代文本中保留来源页码。" },
        { title: "保留地区差异", description: "避免将不同国家和地区的情况描述为完全一致。" },
      ],
      evidenceUse: { targetAudience: "公众、青年和民间社会", framingLead: "公众相关性：", channel: "网站故事、Instagram 和 X" },
    },
    media: {
      implications: "优先提供经核验的核心信息、新闻价值和防止误读所需的背景。准备清晰的来源归属、简洁的发言人口径、常见问答以及指向相关证据页码的直接链接。",
      messagePurposes: ["为媒体报道提供清晰且可归属的核心信息。", "围绕技能政策为何必须对应劳动力需求提供具体证据角度。", "为采访和深度报道提供可信的参与和问责角度。"],
      audiences: [
        { name: "记者与编辑", priority: "主要受众", needs: "具有新闻价值的要点、背景、来源归属和证据入口", channels: "媒体简报、新闻电话会、数字媒体资料包" },
        { name: "发言人与高级管理人员", priority: "内部受众", needs: "核准口径、问答和风险敏感语言", channels: "谈话要点、准备会议、问答文件" },
        { name: "专业领域记者", priority: "技术受众", needs: "方法背景和细分证据", channels: "背景吹风会、数据说明、邮件" },
        { name: "公共信息伙伴", priority: "传播放大者", needs: "一致的信息和可分享的核验材料", channels: "伙伴媒体包、X、新闻中心" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "最新证据显示，从教育到体面就业的过渡仍存在持续性障碍。报告提出三项重点：技能匹配、包容性保障，以及从一开始就开展青年参与。", notes: "新闻要点 · 机构来源 · 链接至媒体材料" },
        { platform: "X", post: "最新发布：青年就业证据指出持续存在的过渡障碍，并呼吁技能政策匹配、包容性保障和有意义的青年参与。#体面劳动", notes: "新闻格式 · 报告与媒体联系人链接" },
        { platform: "Instagram", post: "最新青年就业证据说明了什么？三项主要发现解释了障碍仍存在的领域，以及协调行动能够发挥的作用。", notes: "新闻解读 · 数据卡片 · 报告直达链接" },
      ],
      recommendations: [
        { title: "准备三条核验要点", description: "每条媒体信息都应包含来源归属和直接证据页码。" },
        { title: "制作发言人问答", description: "预判有关地区差异、因果关系、研究方法和局限性的问题。" },
        { title: "区分发现与建议", description: "明确说明报告原文与传播团队建议强调的内容。" },
        { title: "建立快速回应资料包", description: "提供核准引文、证据链接、术语定义和媒体联系人。" },
      ],
      evidenceUse: { targetAudience: "记者、编辑和发言人", framingLead: "核验后的媒体角度：", channel: "媒体简报、发言人问答和 X" },
    },
    engagement: {
      implications: "将证据转化为双向参与邀请。使用问题式表达、无障碍格式和清晰的参与渠道；说明意见将如何被使用，并在后续传播中建立反馈闭环。",
      messagePurposes: ["邀请青年识别自身情境中的障碍和优先事项。", "推动雇主、教育工作者与青年围绕相关技能路径开展对话。", "使参与成为项目设计、实施和问责过程中的可见组成部分。"],
      audiences: [
        { name: "青年", priority: "主要参与者", needs: "易懂背景、安全参与渠道和清晰后续反馈", channels: "Instagram、对话活动、青年网络" },
        { name: "青年主导的组织", priority: "召集伙伴", needs: "讨论工具、主持角色和反馈机制", channels: "工作坊工具包、伙伴会议、社区平台" },
        { name: "雇主与教育工作者", priority: "对话伙伴", needs: "与实施和合作相关的问题", channels: "圆桌会议、网络研讨会、LinkedIn" },
        { name: "政策制定者", priority: "倾听受众", needs: "结构化利益相关方意见和可行动主题", channels: "咨询摘要、政策简报、利益相关方活动" },
      ],
      socialPosts: [
        { platform: "LinkedIn", post: "如何让从教育到体面就业的路径更加包容？证据指出技能、保障和参与的重要性，但有效解决方案需要青年、政策制定者、雇主和教育工作者共同对话。", notes: "讨论问题 · 专业受众 · 行动号召：加入对话" },
        { platform: "X", post: "青年从教育走向体面就业时面临的最大障碍是什么？分享你的观点，帮助推动更包容的讨论。#青年就业", notes: "问题导向 · 参与号召 · 需要内容管理" },
        { platform: "Instagram", post: "你的经历很重要。怎样才能让从教育到就业的过程更加公平、更具包容性？欢迎分享你的声音。", notes: "互动故事或轮播图 · 提问贴纸 · 后续反馈" },
      ],
      recommendations: [
        { title: "提出有意义的参与问题", description: "提出聚焦问题，并说明参与者的回答将如何影响下一步。" },
        { title: "制作引导式对话工具包", description: "提供证据卡片、易懂问题和安全参与指南。" },
        { title: "设计反馈闭环", description: "发布听取到的意见、将采取的改变以及无法采纳的内容。" },
        { title: "使用包容性参与形式", description: "提供低带宽、多语言和无障碍参与方式。" },
      ],
      evidenceUse: { targetAudience: "青年、青年组织和对话伙伴", framingLead: "参与问题：", channel: "Instagram、引导式对话和伙伴网络" },
    },
  },
};

const audienceApproaches: Record<Locale, Record<CommunicationMode, [string, string, string, string]>> = {
  en: {
    advocacy: ["Lead with a specific policy decision and its supporting evidence.", "Provide implementation options, responsibilities and feasible next steps.", "Frame collaboration around concrete delivery roles and mutual benefit.", "Establish a formal participation and accountability route."],
    awareness: ["Use plain language, human relevance and a small number of verified takeaways.", "Use accessible, participatory formats and show how young people can respond.", "Provide media-ready toplines with context, attribution and source links.", "Equip partners with adaptable materials for local discussion and outreach."],
    media: ["Provide concise, attributable toplines and direct access to source evidence.", "Use approved talking points, anticipated Q&A and risk-aware language.", "Offer technical context, definitions and methodological caveats.", "Coordinate consistent messages and verified assets across partner channels."],
    engagement: ["Use question-led communication and explain how input will be used.", "Co-design participation activities and support safe, inclusive facilitation.", "Frame evidence as a prompt for practical dialogue and joint problem-solving.", "Synthesize stakeholder input into actionable themes and report back."],
  },
  fr: {
    advocacy: ["Commencer par une décision politique précise et les éléments qui la justifient.", "Présenter les options de mise en œuvre, les responsabilités et les étapes réalisables.", "Structurer la collaboration autour de rôles concrets et d’un bénéfice mutuel.", "Établir une voie formelle de participation et de redevabilité."],
    awareness: ["Utiliser un langage clair, une pertinence humaine et quelques messages vérifiés.", "Employer des formats accessibles et participatifs et montrer comment les jeunes peuvent répondre.", "Fournir des messages médiatiques contextualisés, attribués et reliés aux sources.", "Donner aux partenaires des supports adaptables pour le dialogue et la mobilisation locale."],
    media: ["Fournir des messages concis et attribuables avec un accès direct aux sources.", "Utiliser des éléments approuvés, des Q&R anticipées et un langage attentif aux risques.", "Apporter le contexte technique, les définitions et les limites méthodologiques.", "Coordonner des messages cohérents et des ressources vérifiées entre partenaires."],
    engagement: ["Utiliser des questions et expliquer comment les contributions seront prises en compte.", "Co-concevoir la participation et soutenir une facilitation sûre et inclusive.", "Présenter les faits comme point de départ d’un dialogue pratique et de solutions communes.", "Synthétiser les contributions en thèmes exploitables et rendre compte aux participants."],
  },
  zh: {
    advocacy: ["从一项具体政策决定及其支持证据切入。", "提供实施选项、责任分工和可行下一步。", "围绕具体实施角色和共同利益开展合作沟通。", "建立正式的参与和问责渠道。"],
    awareness: ["使用平实语言、人的关联和少量经核验的核心要点。", "采用无障碍、参与式形式，并说明青年如何回应。", "提供适合媒体使用的要点、背景、来源归属和证据链接。", "为伙伴提供可根据本地情境调整的讨论与外联材料。"],
    media: ["提供简洁、可归属的核心信息，并直接链接来源证据。", "使用核准谈话要点、预判问答和风险敏感语言。", "提供技术背景、术语定义和方法局限。", "协调伙伴渠道中的一致信息和经核验材料。"],
    engagement: ["使用问题导向的沟通，并说明意见将如何被使用。", "共同设计参与活动，并支持安全、包容的引导过程。", "将证据作为实践对话和共同解决问题的起点。", "将利益相关方意见整理为可行动主题，并向参与者反馈。"],
  },
};

const callsToAction: Record<Locale, Record<CommunicationMode, string>> = {
  en: {
    advocacy: "Review the evidence and identify one policy action your institution can advance.",
    awareness: "Read the key findings, share the report and invite young people to join the conversation.",
    media: "Consult the source report and contact the communications team for verified background.",
    engagement: "Read the key findings and contribute your experience to the public conversation.",
  },
  fr: {
    advocacy: "Examinez les faits et identifiez une mesure politique que votre institution peut faire avancer.",
    awareness: "Consultez les principales conclusions, partagez le rapport et invitez les jeunes à participer au dialogue.",
    media: "Consultez le rapport source et contactez l’équipe de communication pour obtenir des informations vérifiées.",
    engagement: "Consultez les conclusions et partagez votre expérience dans le dialogue public.",
  },
  zh: {
    advocacy: "审阅相关证据，并确定贵机构可以推动的一项政策行动。",
    awareness: "阅读主要发现、分享报告，并邀请青年参与公共讨论。",
    media: "查阅来源报告，并联系传播团队获取经核验的背景信息。",
    engagement: "阅读主要发现，并在公共讨论中分享您的经验。",
  },
};

export function applyCommunicationMode(brief: Brief, mode: CommunicationMode, locale: Locale): Brief {
  if (brief.sampleId === "gender-snapshot-2025") {
    const genderModes: Record<CommunicationMode, {
      implications: string;
      objective: string;
      targetAudience: string;
      channels: string;
      callToAction: string;
      platform: "LinkedIn" | "X" | "Instagram";
    }> = {
      advocacy: {
        implications: "Translate the report's source-linked findings into specific policy, financing and accountability decisions before 2030. Retain regional context and distinguish report evidence from proposed action.",
        objective: "Support evidence-informed policy decisions and investment for accelerated progress on gender equality.",
        targetAudience: "Policy makers, donors and development partners",
        channels: "Policy brief, ministerial briefing and LinkedIn",
        callToAction: "Review the report evidence and identify one measurable policy or financing commitment your institution can advance.",
        platform: "LinkedIn",
      },
      awareness: {
        implications: "Explain the public relevance of gender gaps through accessible, source-linked figures. Connect urgency to the report's six action areas and avoid presenting global averages as uniform national experiences.",
        objective: "Build public understanding of why accelerated, collective action on gender equality matters before 2030.",
        targetAudience: "Public audiences, civil society and women-led organizations",
        channels: "Web story, Instagram and public-information events",
        callToAction: "Read and share the public report, then use its evidence to support informed discussion and action.",
        platform: "Instagram",
      },
      media: {
        implications: "Provide journalists with verified toplines, page-level attribution and the context needed to report global and regional findings accurately. Prepare clear lines on methodology and limitations.",
        objective: "Enable accurate, contextualized media coverage of the report's principal findings and action areas.",
        targetAudience: "Journalists, editors and public-information teams",
        channels: "Media note, press briefing and X",
        callToAction: "Consult the source pages and use the report's verified figures with their methodological and geographic context.",
        platform: "X",
      },
      engagement: {
        implications: "Use accessible evidence to support two-way public dialogue, with clear routes for civil society and women-led organizations to contribute and receive follow-up.",
        objective: "Support informed public dialogue and stakeholder participation around the report's priority action areas.",
        targetAudience: "Public audiences, civil society and women-led organizations",
        channels: "Public dialogue, Instagram and partner networks",
        callToAction: "Read the evidence and contribute priorities and lived experience to an inclusive public dialogue.",
        platform: "Instagram",
      },
    };
    const config = genderModes[mode];
    const socialPosts = enrichSocialPosts(brief.socialPosts, locale, mode, brief.documentFacts.theme);
    const materialPost = socialPosts.find((item) => item.platform === config.platform) ?? socialPosts[0];
    return {
      ...brief,
      communicationMode: mode,
      summarySections: { ...brief.summarySections, communicationImplications: config.implications },
      keyMessages: brief.keyMessages.map((message) => ({ ...message, communicationPurpose: config.objective })),
      socialPosts,
      communicationMaterial: {
        objective: config.objective,
        targetAudience: config.targetAudience,
        keyMessage: brief.keyMessages[0]?.title ?? "",
        suggestedCopy: materialPost?.post ?? "",
        recommendedChannels: config.channels,
        callToAction: config.callToAction,
        hashtags: materialPost?.hashtags ?? [],
      },
    };
  }

  const profile = profiles[locale][mode];
  const socialPosts = enrichSocialPosts(profile.socialPosts, locale, mode, brief.documentFacts.theme);
  const materialPlatform = mode === "media" ? "X" : mode === "awareness" ? "Instagram" : "LinkedIn";
  const materialPost = socialPosts.find((item) => item.platform === materialPlatform) ?? socialPosts[0];
  return {
    ...brief,
    communicationMode: mode,
    summarySections: { ...brief.summarySections, communicationImplications: profile.implications },
    keyMessages: brief.keyMessages.map((message, index) => ({ ...message, communicationPurpose: profile.messagePurposes[index] ?? message.communicationPurpose })),
    audiences: profile.audiences.map((audience, index) => ({ ...audience, approach: audienceApproaches[locale][mode][index] })),
    socialPosts,
    communicationMaterial: {
      objective: profile.messagePurposes[0],
      targetAudience: profile.audiences.slice(0, 2).map((audience) => audience.name).join(", "),
      keyMessage: brief.keyMessages[0]?.title ?? "",
      suggestedCopy: materialPost?.post ?? "",
      recommendedChannels: profile.evidenceUse.channel,
      callToAction: callsToAction[locale][mode],
      hashtags: materialPost?.hashtags ?? [],
    },
    recommendations: profile.recommendations,
    evidence: brief.evidence.map((item) => ({
      ...item,
      suggestedUse: {
        targetAudience: profile.evidenceUse.targetAudience,
        recommendedFraming: `${profile.evidenceUse.framingLead} ${item.suggestedUse.recommendedFraming}`,
        channel: profile.evidenceUse.channel,
      },
    })),
  };
}
