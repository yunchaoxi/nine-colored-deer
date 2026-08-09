"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { getDemoBrief, type Brief, type CommunicationMode, type EvidenceItem } from "@/lib/brief";
import { applyCommunicationMode } from "@/lib/communication-modes";
import { getGenderSampleBrief } from "@/lib/gender-sample";

type ResultsClientProps = { initialBrief: Brief };
type Tab = "summary" | "messages" | "audiences" | "social" | "recommendations";
type EvidenceSelection = { type: "evidence" | "message"; index: number };
type ScopePanel = "themes" | "findings" | "evidence";

const copy = {
  en: {
    kicker: "Public information planning brief", demo: "Demonstration brief", live: "Working brief", newAnalysis: "New brief", export: "Export planning brief", output: "English output", evidenceComplete: "Evidence references prepared", simulationTitle: "Portfolio simulation.", simulationText: "Analytical depth adapts to the estimated document length and every illustrative conclusion retains a source reference. PDF content is not yet processed by an AI service, so professional verification remains required.", modeLabel: "Communication mode", modeHelp: "Select a use case to adapt the audiences, framing and ready-to-use communication material while retaining the same source evidence.", modeNames: { advocacy: "Policy Communication", awareness: "Public Communication", media: "Media Communication", engagement: "Public Communication" },
    tabs: { summary: "Executive summary", messages: "Key messages", audiences: "Audience analysis", social: "Public information products", recommendations: "Communication materials" },
    source: "Source document", page: "Page", sample: "Illustrative source report", excerpt: "Evidence excerpt", grounded: "Working draft · Evidence and editorial review required", copy: "Copy section", copied: "Copied", facts: { theme: "Issue area", priorityAudience: "Priority stakeholder", tone: "Editorial tone" },
    summaryLabels: { background: "Report overview", keyFindings: "Key findings", communicationImplications: "Communication implications" },
    analysisLabels: { topic: "Report topic", researchContext: "Research context", coreQuestion: "Core question", mainThemes: "Main themes", evidenceAreas: "Evidence areas", evidenceType: "Evidence type", analysisScope: "Analysis scope", short: "Short report", medium: "Medium report", long: "Long report", whyItMatters: "Why it matters", supportingEvidence: "Supporting evidence", relevantData: "Relevant data or quote", communicationAngle: "Communication angle", whyConclusion: "Why this conclusion", public: "For public communication", policy: "For policy makers", media: "For media", emphasize: "Emphasize", avoid: "Avoid misinterpretation" },
    scopeDescription: "This brief identifies the report’s main themes, key findings and verifiable evidence, then translates them into audience-focused communication messages and materials.",
    scopeTags: ["Main Themes", "Key Findings", "Verified Evidence"],
    scopePanel: { traceability: "Evidence traceability", close: "Close panel", mainThemesIdentified: "Main themes identified", whyItMatters: "Why it matters", supportingPageEvidence: "Supporting page / evidence", evidenceQuoteData: "Evidence quote or extracted data", sourcePage: "Source page", supports: "Supports finding / message", sourceEvidence: "Source evidence used in this analysis" },
    message: "Main message", evidenceSource: "Evidence source / page", postCopy: "Post copy", suggestedHashtags: "Suggested hashtags", communicationObjective: "Communication objective", keyMessage: "Key message", suggestedCopyHeadline: "Suggested copy / headline", recommendedChannels: "Recommended channels", callToAction: "Call to action", communicationPurpose: "Communication purpose", viewSource: "View source", priorityAudience: "Target audience", audience: "Audience", audienceRole: "Audience role", need: "Communication needs", approach: "Recommended approach", channels: "Recommended channels", humanReview: "Human editorial review required.", evidenceUsed: "Evidence supporting this brief", evidenceExtracted: "Extracted evidence", sourceDocument: "Source document", pageNumber: "Source page", directEvidence: "Direct quotation or extracted data", communicationInsight: "Communication relevance", suggestedUse: "Suggested communication use", recommendedFraming: "Recommended framing", suitableChannel: "Suitable communication channel",
    exportHeadings: { summary: "Executive Summary", messages: "Key Messages", audiences: "Target Audiences", social: "Social Media Posts", recommendations: "Communication Materials", evidence: "Evidence and Communication Use", source: "Source" },
    exportNote: "Simulated draft. Human review required before publication.",
  },
  fr: {
    kicker: "Note de planification de l’information publique", demo: "Note de démonstration", live: "Note de travail", newAnalysis: "Nouvelle note", export: "Exporter la note de planification", output: "Sortie en français", evidenceComplete: "Références préparées", simulationTitle: "Simulation de portfolio.", simulationText: "La profondeur de l’analyse s’adapte à la longueur estimée du document et chaque conclusion illustrative conserve une référence. Le contenu du PDF n’est pas encore traité par un service d’IA ; une vérification professionnelle reste requise.", modeLabel: "Mode de communication", modeHelp: "Sélectionnez un usage pour adapter les publics, le cadrage et les contenus directement utilisables tout en conservant les mêmes sources.", modeNames: { advocacy: "Communication politique", awareness: "Communication publique", media: "Communication médias", engagement: "Communication publique" },
    tabs: { summary: "Résumé exécutif", messages: "Messages clés", audiences: "Analyse des publics", social: "Produits d’information publique", recommendations: "Matériels de communication" },
    source: "Document source", page: "Page", sample: "Rapport source illustratif", excerpt: "Extrait justificatif", grounded: "Document de travail · Révision factuelle et éditoriale requise", copy: "Copier la section", copied: "Copié", facts: { theme: "Domaine thématique", priorityAudience: "Partie prenante prioritaire", tone: "Ton éditorial" },
    summaryLabels: { background: "Vue d’ensemble du rapport", keyFindings: "Principales conclusions", communicationImplications: "Implications pour la communication" },
    analysisLabels: { topic: "Thème du rapport", researchContext: "Contexte de la recherche", coreQuestion: "Question centrale", mainThemes: "Thèmes principaux", evidenceAreas: "Domaines de preuve", evidenceType: "Type de preuve", analysisScope: "Portée de l’analyse", short: "Rapport court", medium: "Rapport moyen", long: "Rapport long", whyItMatters: "Pourquoi c’est important", supportingEvidence: "Élément justificatif", relevantData: "Donnée ou citation pertinente", communicationAngle: "Angle de communication", whyConclusion: "Pourquoi cette conclusion", public: "Pour le grand public", policy: "Pour les décideurs", media: "Pour les médias", emphasize: "À mettre en avant", avoid: "Contresens à éviter" },
    scopeDescription: "Cette note identifie les principaux thèmes du rapport, ses conclusions clés et les éléments probants vérifiables, puis les traduit en messages et supports de communication adaptés aux différents publics.",
    scopeTags: ["Thèmes principaux", "Conclusions clés", "Éléments vérifiables"],
    scopePanel: { traceability: "Traçabilité des éléments probants", close: "Fermer le panneau", mainThemesIdentified: "Thèmes principaux identifiés", whyItMatters: "Pourquoi c’est important", supportingPageEvidence: "Page / élément justificatif", evidenceQuoteData: "Citation ou donnée extraite", sourcePage: "Page source", supports: "Conclusion ou message étayé", sourceEvidence: "Élément source utilisé dans cette analyse" },
    message: "Message principal", evidenceSource: "Source / page", postCopy: "Texte de la publication", suggestedHashtags: "Mots-dièse suggérés", communicationObjective: "Objectif de communication", keyMessage: "Message clé", suggestedCopyHeadline: "Texte ou titre suggéré", recommendedChannels: "Canaux recommandés", callToAction: "Appel à l’action", communicationPurpose: "Objectif de communication", viewSource: "Voir la source", priorityAudience: "Public cible", audience: "Public", audienceRole: "Rôle du public", need: "Besoins de communication", approach: "Approche recommandée", channels: "Canaux recommandés", humanReview: "Révision éditoriale humaine requise.", evidenceUsed: "Éléments à l’appui de cette note", evidenceExtracted: "Élément extrait", sourceDocument: "Document source", pageNumber: "Page source", directEvidence: "Citation directe ou donnée extraite", communicationInsight: "Pertinence pour la communication", suggestedUse: "Utilisation suggérée", recommendedFraming: "Angle recommandé", suitableChannel: "Canal de communication adapté",
    exportHeadings: { summary: "Résumé exécutif", messages: "Messages clés", audiences: "Publics cibles", social: "Publications sur les réseaux sociaux", recommendations: "Matériels de communication", evidence: "Éléments probants et utilisation", source: "Source" },
    exportNote: "Projet simulé. Une révision humaine est requise avant publication.",
  },
  zh: {
    kicker: "公共信息传播规划简报", demo: "演示简报", live: "工作简报", newAnalysis: "新建简报", export: "导出传播规划简报", output: "中文输出", evidenceComplete: "证据引用已准备", simulationTitle: "作品集原型模拟。", simulationText: "分析深度会根据估算的文档长度调整，每项示例结论均保留来源引用。PDF 内容目前尚未由 AI 服务处理，因此所有输出仍需专业核验。", modeLabel: "传播模式", modeHelp: "选择实际使用场景，在保留同一来源证据的同时调整受众、叙事角度和可直接使用的传播材料。", modeNames: { advocacy: "政策传播", awareness: "公众传播", media: "媒体传播", engagement: "公众传播" },
    tabs: { summary: "执行摘要", messages: "核心信息", audiences: "受众分析", social: "公共信息传播产品", recommendations: "传播材料" },
    source: "来源文件", page: "页码", sample: "示例来源报告", excerpt: "证据摘录", grounded: "工作草稿 · 需要事实与编辑审核", copy: "复制本节", copied: "已复制", facts: { theme: "议题领域", priorityAudience: "重点利益相关方", tone: "编辑语调" },
    summaryLabels: { background: "报告概览", keyFindings: "主要发现", communicationImplications: "传播启示" },
    analysisLabels: { topic: "报告主题", researchContext: "研究背景", coreQuestion: "核心问题", mainThemes: "主要主题", evidenceAreas: "证据领域", evidenceType: "证据类型", analysisScope: "分析范围", short: "短报告", medium: "中等长度报告", long: "长报告", whyItMatters: "为什么重要", supportingEvidence: "支持证据", relevantData: "相关数据或引文", communicationAngle: "传播方向", whyConclusion: "为什么得出这一结论", public: "面向公众", policy: "面向政策制定者", media: "面向媒体", emphasize: "应突出", avoid: "应避免的误读" },
    scopeDescription: "基于整份40页报告提炼主要议题、关键发现和可验证证据，并进一步转化为面向不同受众的传播信息。",
    scopeTags: ["主要议题", "关键发现", "可验证证据"],
    scopePanel: { traceability: "证据可追溯", close: "关闭侧边栏", mainThemesIdentified: "识别出的主要议题", whyItMatters: "为什么重要", supportingPageEvidence: "支持页码 / 证据", evidenceQuoteData: "证据引文或提取数据", sourcePage: "来源页码", supports: "支持的发现 / 信息", sourceEvidence: "用于本分析的来源证据" },
    message: "核心传播信息", evidenceSource: "证据来源 / 页码", postCopy: "发布文案", suggestedHashtags: "建议标签", communicationObjective: "传播目标", keyMessage: "核心信息", suggestedCopyHeadline: "建议文案 / 标题", recommendedChannels: "推荐渠道", callToAction: "行动号召", communicationPurpose: "传播目的", viewSource: "查看来源", priorityAudience: "目标受众", audience: "受众", audienceRole: "受众作用", need: "传播需求", approach: "推荐沟通方式", channels: "推荐渠道", humanReview: "需要人工编辑审核。", evidenceUsed: "支持本简报的证据", evidenceExtracted: "提取的证据", sourceDocument: "来源文件", pageNumber: "来源页码", directEvidence: "直接引文或提取数据", communicationInsight: "传播相关性", suggestedUse: "建议传播用途", recommendedFraming: "推荐叙事角度", suitableChannel: "适合的传播渠道",
    exportHeadings: { summary: "执行摘要", messages: "核心信息", audiences: "目标受众", social: "社交媒体文案", recommendations: "传播材料", evidence: "证据与传播用途", source: "来源文件" },
    exportNote: "模拟草稿。发布前必须经过人工审核。",
  },
} as const;

type ResultText = (typeof copy)[keyof typeof copy];

const tabIds: Tab[] = ["summary", "messages", "audiences", "social", "recommendations"];
const communicationModes: CommunicationMode[] = ["advocacy", "awareness", "media"];

export function ResultsClient({ initialBrief }: ResultsClientProps) {
  const { locale } = useLanguage();
  const text = copy[locale];
  const [storedBrief, setStoredBrief] = useState(initialBrief);
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [evidenceSelection, setEvidenceSelection] = useState<EvidenceSelection>({ type: "evidence", index: 0 });
  const [copied, setCopied] = useState(false);
  const [communicationMode, setCommunicationMode] = useState<CommunicationMode>(initialBrief.communicationMode ?? "awareness");

  const baseBrief = useMemo(() => {
    if (storedBrief.mode !== "demo") return storedBrief;
    if (storedBrief.sampleId === "gender-snapshot-2025" || storedBrief.sourceFile === "GenderSnapshot2025.pdf") return getGenderSampleBrief(locale);
    const scenario = storedBrief.scenario ?? (storedBrief.sourceFile === "global-youth-employment-outlook.pdf" ? "sample" : "upload");
    return getDemoBrief(locale, storedBrief.sourceFile, scenario);
  }, [locale, storedBrief]);

  const brief = useMemo(() => applyCommunicationMode(baseBrief, communicationMode, locale), [baseBrief, communicationMode, locale]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requestedSample = new URLSearchParams(window.location.search).get("sample");
      if (requestedSample === "gender-snapshot-2025") {
        setStoredBrief(initialBrief);
        return;
      }
      const stored = sessionStorage.getItem("globalbrief-result");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Brief;
          if (parsed.executiveSummary && Array.isArray(parsed.keyMessages)) {
            setStoredBrief(parsed);
          }
        } catch {
          // Keep the bundled sample when session data is unavailable or malformed.
        }
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialBrief]);

  const activeEvidence = useMemo<EvidenceItem>(() => {
    if (evidenceSelection.type === "message") {
      const message = brief.keyMessages[evidenceSelection.index] ?? brief.keyMessages[0];
      return brief.evidence.find((item) => item.page === message?.page) ?? brief.evidence[0];
    }
    return brief.evidence[evidenceSelection.index] ?? brief.evidence[0];
  }, [brief, evidenceSelection]);

  const tabs = tabIds.map((id) => ({ id, label: text.tabs[id] }));

  function sectionText() {
    if (activeTab === "summary") {
      const overview = brief.summarySections.reportOverview;
      const guidance = brief.summarySections.communicationGuidance;
      return [
        `${text.summaryLabels.background}\n${overview ? `${text.analysisLabels.topic}: ${overview.topic}\n${text.analysisLabels.researchContext}: ${overview.researchContext}\n${text.analysisLabels.coreQuestion}: ${overview.coreQuestion}` : brief.summarySections.background}`,
        `${text.analysisLabels.mainThemes}\n${brief.summarySections.mainThemes?.map((item) => `${item.title}: ${item.description} (${text.page} ${item.pages})`).join("\n") ?? ""}`,
        `${text.summaryLabels.keyFindings}\n${brief.summarySections.keyFindings.map((item) => `${item.title}: ${item.detail} (${text.page} ${item.page})`).join("\n")}`,
        `${text.analysisLabels.evidenceAreas}\n${brief.summarySections.evidenceAreas?.map((item) => `${item.type} · ${item.label}: ${item.evidence} (${text.page} ${item.page})`).join("\n") ?? ""}`,
        `${text.summaryLabels.communicationImplications}\n${guidance ? `${text.analysisLabels.public}: ${guidance.public}\n${text.analysisLabels.policy}: ${guidance.policy}\n${text.analysisLabels.media}: ${guidance.media}\n${text.analysisLabels.emphasize}: ${guidance.emphasize}\n${text.analysisLabels.avoid}: ${guidance.avoid}` : brief.summarySections.communicationImplications}`,
      ].join("\n\n");
    }
    if (activeTab === "messages") return brief.keyMessages.map((item) => `${text.message}: ${item.title}\n${text.analysisLabels.whyItMatters}: ${item.whyItMatters ?? item.communicationPurpose}\n${text.analysisLabels.supportingEvidence}: ${item.evidence}\n${text.pageNumber}: ${item.page}\n${text.analysisLabels.relevantData}: ${item.relevantData ?? item.evidence}\n${text.priorityAudience}: ${item.audience}\n${text.analysisLabels.communicationAngle}: ${item.communicationAngle ?? item.communicationPurpose}`).join("\n\n");
    if (activeTab === "audiences") return brief.audiences.map((item) => `${item.name}\n${text.audienceRole}: ${item.priority}\n${text.need}: ${item.needs}\n${text.approach}: ${item.approach}\n${text.channels}: ${item.channels}`).join("\n\n");
    if (activeTab === "social") return brief.socialPosts.map((item) => `${item.platform}\n${text.postCopy}: ${item.post}\n${text.suggestedHashtags}: ${item.hashtags.join(" ")}\n${text.communicationPurpose}: ${item.communicationPurpose}\n${text.priorityAudience}: ${item.targetAudience}`).join("\n\n");
    const material = brief.communicationMaterial;
    if (!material) return "";
    return [
      `${text.communicationObjective}: ${material.objective}`,
      `${text.priorityAudience}: ${material.targetAudience}`,
      `${text.keyMessage}: ${material.keyMessage}`,
      `${text.suggestedCopyHeadline}: ${material.suggestedCopy}`,
      `${text.recommendedChannels}: ${material.recommendedChannels}`,
      `${text.callToAction}: ${material.callToAction}`,
      `${text.suggestedHashtags}: ${material.hashtags.join(" ")}`,
    ].join("\n\n");
  }

  async function copySection() {
    await navigator.clipboard.writeText(sectionText());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function exportBrief() {
    const headings = text.exportHeadings;
    const output = [
      `# ${brief.title}`, `${headings.source}: ${brief.sourceFile}`, `${text.modeLabel}: ${text.modeNames[communicationMode]}`, "", `## ${headings.summary}`,
      `### ${text.summaryLabels.background}`,
      ...(brief.summarySections.reportOverview ? [
        `${text.analysisLabels.topic}: ${brief.summarySections.reportOverview.topic}`,
        `${text.analysisLabels.researchContext}: ${brief.summarySections.reportOverview.researchContext}`,
        `${text.analysisLabels.coreQuestion}: ${brief.summarySections.reportOverview.coreQuestion}`,
      ] : [brief.summarySections.background]),
      `### ${text.analysisLabels.mainThemes}`, ...(brief.summarySections.mainThemes?.map((item) => `- ${item.title}: ${item.description} (${text.page} ${item.pages})`) ?? []),
      `### ${text.summaryLabels.keyFindings}`, ...brief.summarySections.keyFindings.map((item) => `- ${item.title}: ${item.detail} (${text.page} ${item.page})`),
      `### ${text.analysisLabels.evidenceAreas}`, ...(brief.summarySections.evidenceAreas?.map((item) => `- ${item.type} · ${item.label}: ${item.evidence} (${text.page} ${item.page})`) ?? []),
      `### ${text.summaryLabels.communicationImplications}`,
      ...(brief.summarySections.communicationGuidance ? [
        `${text.analysisLabels.public}: ${brief.summarySections.communicationGuidance.public}`,
        `${text.analysisLabels.policy}: ${brief.summarySections.communicationGuidance.policy}`,
        `${text.analysisLabels.media}: ${brief.summarySections.communicationGuidance.media}`,
        `${text.analysisLabels.emphasize}: ${brief.summarySections.communicationGuidance.emphasize}`,
        `${text.analysisLabels.avoid}: ${brief.summarySections.communicationGuidance.avoid}`,
      ] : [brief.summarySections.communicationImplications]),
      "", `## ${headings.messages}`,
      ...brief.keyMessages.map((item, index) => `${index + 1}. ${text.message}: ${item.title}\n   ${text.analysisLabels.whyItMatters}: ${item.whyItMatters ?? item.communicationPurpose}\n   ${text.analysisLabels.supportingEvidence}: ${item.evidence}\n   ${text.pageNumber}: ${item.page}\n   ${text.analysisLabels.relevantData}: ${item.relevantData ?? item.evidence}\n   ${text.priorityAudience}: ${item.audience}\n   ${text.analysisLabels.communicationAngle}: ${item.communicationAngle ?? item.communicationPurpose}`),
      "", `## ${headings.audiences}`, ...brief.audiences.map((item) => `- ${item.name}\n  ${text.audienceRole}: ${item.priority}\n  ${text.need}: ${item.needs}\n  ${text.approach}: ${item.approach}\n  ${text.channels}: ${item.channels}`),
      "", `## ${headings.social}`, ...brief.socialPosts.map((item) => `### ${item.platform}\n${text.postCopy}: ${item.post}\n${text.suggestedHashtags}: ${item.hashtags.join(" ")}\n${text.communicationPurpose}: ${item.communicationPurpose}\n${text.priorityAudience}: ${item.targetAudience}`),
      "", `## ${headings.recommendations}`,
      ...(brief.communicationMaterial ? [
        `${text.communicationObjective}: ${brief.communicationMaterial.objective}`,
        `${text.priorityAudience}: ${brief.communicationMaterial.targetAudience}`,
        `${text.keyMessage}: ${brief.communicationMaterial.keyMessage}`,
        `${text.suggestedCopyHeadline}: ${brief.communicationMaterial.suggestedCopy}`,
        `${text.recommendedChannels}: ${brief.communicationMaterial.recommendedChannels}`,
        `${text.callToAction}: ${brief.communicationMaterial.callToAction}`,
        `${text.suggestedHashtags}: ${brief.communicationMaterial.hashtags.join(" ")}`,
      ] : []),
      "", `## ${headings.evidence}`, ...brief.evidence.flatMap((item) => [
        `### ${item.label} (${text.pageNumber}: ${item.page})`,
        `${text.sourceDocument}: ${brief.sourceFile}`,
        `${text.directEvidence}: ${item.directEvidence}`,
        `${text.communicationInsight}: ${item.communicationInsight}`,
        `${text.priorityAudience}: ${item.suggestedUse.targetAudience}`,
        `${text.recommendedFraming}: ${item.suggestedUse.recommendedFraming}`,
        `${text.suitableChannel}: ${item.suggestedUse.channel}`,
      ]), "", text.exportNote,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([output], { type: "text/markdown" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${brief.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "communication-brief"}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-[1240px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{text.kicker}</p><span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${brief.mode === "live" ? "bg-success-soft text-success" : "bg-brand-soft text-brand"}`}>{brief.mode === "live" ? text.live : text.demo}</span></div>
          <h1 className="mt-3 truncate text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{brief.title}</h1>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted"><span>{brief.documentType}</span><span>{brief.sourceFile}</span><span>{text.output}</span><span>{text.evidenceComplete}</span></div>
        </div>
        <div className="flex flex-wrap gap-2"><Link href="/upload" className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand">{text.newAnalysis}</Link><button type="button" onClick={exportBrief} className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark">{text.export}</button></div>
      </div>

      {brief.mode === "demo" && <div role="note" className="mt-5 rounded-md border border-brand/25 bg-brand-soft px-4 py-3 text-xs leading-6 text-brand-dark">{brief.sampleId === "gender-snapshot-2025" ? <strong>This is a portfolio demonstration using a public report. Outputs are illustrative and require human review.</strong> : <><strong>{text.simulationTitle}</strong> {text.simulationText}</>}</div>}

      <section className="mt-5 rounded-lg border border-line bg-surface p-4 sm:flex sm:items-center sm:justify-between sm:gap-6" aria-labelledby="communication-mode-heading">
        <div><h2 id="communication-mode-heading" className="text-sm font-semibold text-ink">{text.modeLabel}</h2><p className="mt-1 max-w-xl text-xs leading-5 text-muted">{text.modeHelp}</p></div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0" role="group" aria-label={text.modeLabel}>
          {communicationModes.map((mode) => <button key={mode} type="button" aria-pressed={communicationMode === mode} onClick={() => setCommunicationMode(mode)} className={`min-h-10 rounded-md border px-3 text-xs font-semibold transition ${communicationMode === mode ? "border-brand bg-brand text-white" : "border-line bg-page text-ink hover:border-brand hover:text-brand"}`}>{text.modeNames[mode]}</button>)}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-line bg-surface p-5 sm:p-6" aria-labelledby="source-traceability-heading">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">{text.evidenceExtracted}</p><h2 id="source-traceability-heading" className="mt-1 text-base font-semibold text-ink">{activeEvidence?.label}</h2></div>
          <div className="flex flex-wrap gap-2 text-[11px]"><span className="rounded-full bg-page px-3 py-1.5 text-muted"><strong className="font-semibold text-ink">{text.sourceDocument}:</strong> {brief.sourceFile}</span><span className="rounded-full bg-brand-soft px-3 py-1.5 font-semibold text-brand"><strong>{text.pageNumber}:</strong> {activeEvidence?.page}</span></div>
        </div>
        <dl className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <div><dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{text.directEvidence}</dt><dd className="mt-2 border-l-2 border-brand pl-4 text-sm leading-6 text-ink">{activeEvidence?.directEvidence}</dd></div>
          <div><dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{text.communicationInsight}</dt><dd className="mt-2 text-sm leading-6 text-muted">{activeEvidence?.communicationInsight}</dd></div>
        </dl>
      </section>

      <div className="mt-5">
        <section className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="overflow-x-auto border-b border-line px-3"><div className="flex min-w-max" role="tablist" aria-label={text.kicker}>{tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={`border-b-2 px-4 py-4 text-xs font-semibold transition ${activeTab === tab.id ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"}`}>{tab.label}</button>)}</div></div>
          <div className="p-5 sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-tight text-ink">{text.tabs[activeTab]}</h2><p className="mt-2 text-xs text-muted">{text.grounded}</p></div><button type="button" onClick={copySection} className="shrink-0 rounded-md border border-line px-3 py-2 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand">{copied ? text.copied : text.copy}</button></div>

            {activeTab === "summary" && <ExecutiveSummaryAnalysis brief={brief} text={text} onEvidence={(index) => setEvidenceSelection({ type: "evidence", index })} />}

            {activeTab === "messages" && <KeyMessageAnalysis brief={brief} text={text} onEvidence={(index) => setEvidenceSelection({ type: "message", index })} />}

            {activeTab === "audiences" && <div className="overflow-x-auto"><table className="w-full min-w-[920px] border-collapse text-left text-sm"><thead><tr className="border-b border-line text-xs text-muted"><th className="pb-3 pr-4 font-semibold">{text.audience}</th><th className="pb-3 pr-4 font-semibold">{text.audienceRole}</th><th className="pb-3 pr-4 font-semibold">{text.need}</th><th className="pb-3 pr-4 font-semibold">{text.approach}</th><th className="pb-3 font-semibold">{text.channels}</th></tr></thead><tbody>{brief.audiences.map((audience) => <tr key={audience.name} className="border-b border-line last:border-b-0"><td className="py-5 pr-4 align-top"><strong className="font-semibold text-ink">{audience.name}</strong></td><td className="py-5 pr-4 align-top text-xs leading-5 text-brand">{audience.priority}</td><td className="py-5 pr-4 align-top text-xs leading-5 text-muted">{audience.needs}</td><td className="py-5 pr-4 align-top text-xs leading-5 text-muted">{audience.approach}</td><td className="py-5 align-top text-xs leading-5 text-muted">{audience.channels}</td></tr>)}</tbody></table></div>}

            {activeTab === "social" && <div className="divide-y divide-line">{brief.socialPosts.map((post) => <article key={post.platform} className="py-6 first:pt-0 last:pb-0"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{post.platform}</h3><span className="text-[11px] text-muted">{post.notes}</span></div><div className="mt-4"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.postCopy}</p><p className="mt-2 text-sm leading-7 text-ink">{post.post}</p></div><dl className="mt-5 grid gap-4 rounded-md bg-page p-4 sm:grid-cols-2"><div className="sm:col-span-2"><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.suggestedHashtags}</dt><dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-semibold text-brand">{post.hashtags.map((hashtag) => <span key={hashtag}>{hashtag}</span>)}</dd></div><div><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.communicationPurpose}</dt><dd className="mt-2 text-xs leading-5 text-ink">{post.communicationPurpose}</dd></div><div><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.priorityAudience}</dt><dd className="mt-2 text-xs leading-5 text-ink">{post.targetAudience}</dd></div></dl></article>)}</div>}

            {activeTab === "recommendations" && brief.communicationMaterial && <div><dl className="divide-y divide-line border-y border-line"><MaterialRow label={text.communicationObjective} value={brief.communicationMaterial.objective} /><MaterialRow label={text.priorityAudience} value={brief.communicationMaterial.targetAudience} /><MaterialRow label={text.keyMessage} value={brief.communicationMaterial.keyMessage} emphasis /><MaterialRow label={text.suggestedCopyHeadline} value={brief.communicationMaterial.suggestedCopy} emphasis /><MaterialRow label={text.recommendedChannels} value={brief.communicationMaterial.recommendedChannels} /><MaterialRow label={text.callToAction} value={brief.communicationMaterial.callToAction} emphasis /><div className="grid gap-2 py-5 sm:grid-cols-[190px_1fr] sm:gap-6"><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.suggestedHashtags}</dt><dd className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-semibold text-brand">{brief.communicationMaterial.hashtags.map((hashtag) => <span key={hashtag}>{hashtag}</span>)}</dd></div></dl>{brief.caveats.length > 0 && <div className="mt-6 rounded-md bg-brand-soft p-4 text-xs leading-6 text-brand-dark"><strong>{text.humanReview}</strong> {brief.caveats.join(" ")}</div>}</div>}
          </div>
        </section>
      </div>
    </main>
  );
}

function ExecutiveSummaryAnalysis({ brief, text, onEvidence }: { brief: Brief; text: ResultText; onEvidence: (index: number) => void }) {
  const overview = brief.summarySections.reportOverview;
  const themes = brief.summarySections.mainThemes ?? [];
  const evidenceAreas = brief.summarySections.evidenceAreas ?? [];
  const guidance = brief.summarySections.communicationGuidance;
  const profile = brief.analysisProfile;
  const [scopePanel, setScopePanel] = useState<ScopePanel | null>(null);

  useEffect(() => {
    if (!scopePanel) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setScopePanel(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [scopePanel]);

  const scopePanelIds: ScopePanel[] = ["themes", "findings", "evidence"];

  return <div>
    {profile && <section className="mb-7 overflow-hidden rounded-lg border border-line bg-surface" aria-labelledby="analysis-scope-heading">
      <div className="h-0.5 bg-brand" aria-hidden="true" />
      <div className="grid gap-5 p-5 sm:grid-cols-[44px_1fr] sm:p-6">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-brand/30 bg-brand-soft text-xs font-semibold text-brand" aria-hidden="true">01</div>
        <div>
          <div className="flex items-center gap-3"><h3 id="analysis-scope-heading" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{text.analysisLabels.analysisScope}</h3><span className="h-px flex-1 bg-line" aria-hidden="true" /></div>
          <p className="mt-3 max-w-4xl text-base font-medium leading-7 text-ink">{text.scopeDescription}</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {text.scopeTags.map((tag, index) => {
              const panel = scopePanelIds[index];
              return <button key={tag} type="button" aria-expanded={scopePanel === panel} aria-controls="analysis-scope-panel" onClick={() => setScopePanel(panel)} className="group flex min-h-11 items-center gap-3 rounded-md border border-line bg-page px-3 py-2.5 text-left transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span className="text-[10px] font-semibold tabular-nums text-brand">0{index + 1}</span><span className="flex-1 text-xs font-semibold text-ink">{tag}</span><span className="text-sm text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span></button>;
            })}
          </div>
        </div>
      </div>
    </section>}

    {scopePanel && <AnalysisScopeDrawer panel={scopePanel} brief={brief} text={text} onClose={() => setScopePanel(null)} />}

    <section className="border-y border-line py-5"><h3 className="text-sm font-semibold text-ink">{text.summaryLabels.background}</h3>{overview ? <dl className="mt-4 grid gap-4 sm:grid-cols-3"><AnalysisField label={text.analysisLabels.topic} value={overview.topic} /><AnalysisField label={text.analysisLabels.researchContext} value={overview.researchContext} /><AnalysisField label={text.analysisLabels.coreQuestion} value={overview.coreQuestion} /></dl> : <p className="mt-3 text-sm leading-7 text-muted">{brief.summarySections.background}</p>}</section>

    {themes.length > 0 && <section className="mt-7"><h3 className="text-sm font-semibold text-ink">{text.analysisLabels.mainThemes}</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{themes.map((theme) => <article key={theme.title} className="border-l-2 border-brand bg-page p-4"><div className="flex items-start justify-between gap-3"><h4 className="text-sm font-semibold leading-5 text-ink">{theme.title}</h4><span className="shrink-0 text-[10px] font-semibold text-brand">{text.page} {theme.pages}</span></div><p className="mt-2 text-xs leading-5 text-muted">{theme.description}</p></article>)}</div></section>}

    <section className="mt-7"><h3 className="text-sm font-semibold text-ink">{text.summaryLabels.keyFindings}</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{brief.summarySections.keyFindings.map((finding) => { const evidenceIndex = brief.evidence.findIndex((item) => item.page === finding.page); return <article key={`${finding.title}-${finding.page}`} className="border-t-2 border-brand bg-page p-4"><button type="button" onClick={() => onEvidence(Math.max(evidenceIndex, 0))} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand hover:text-brand-dark">{text.viewSource} · {text.page} {finding.page}</button><h4 className="mt-3 text-sm font-semibold leading-6 text-ink">{finding.title}</h4><p className="mt-2 text-xs leading-5 text-muted">{finding.detail}</p></article>; })}</div></section>

    {evidenceAreas.length > 0 && <section className="mt-7"><h3 className="text-sm font-semibold text-ink">{text.analysisLabels.evidenceAreas}</h3><div className="mt-3 divide-y divide-line border-y border-line">{evidenceAreas.map((area) => { const evidenceIndex = brief.evidence.findIndex((item) => item.page === area.page); return <article key={`${area.label}-${area.page}`} className="grid gap-3 py-4 sm:grid-cols-[130px_1fr_auto] sm:items-start"><div><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.analysisLabels.evidenceType}</p><p className="mt-1 text-xs font-semibold text-brand">{area.type}</p></div><div><h4 className="text-xs font-semibold text-ink">{area.label}</h4><p className="mt-1 text-xs leading-5 text-muted">{area.evidence}</p></div><button type="button" onClick={() => onEvidence(Math.max(evidenceIndex, 0))} className="text-left text-[10px] font-semibold text-brand hover:text-brand-dark sm:text-right">{text.page} {area.page} →</button></article>; })}</div></section>}

    <section className="mt-7"><h3 className="text-sm font-semibold text-ink">{text.summaryLabels.communicationImplications}</h3>{guidance ? <dl className="mt-3 divide-y divide-line border-y border-line"><GuidanceRow label={text.analysisLabels.public} value={guidance.public} /><GuidanceRow label={text.analysisLabels.policy} value={guidance.policy} /><GuidanceRow label={text.analysisLabels.media} value={guidance.media} /><GuidanceRow label={text.analysisLabels.emphasize} value={guidance.emphasize} accent /><GuidanceRow label={text.analysisLabels.avoid} value={guidance.avoid} accent /></dl> : <p className="mt-3 text-sm leading-7 text-muted">{brief.summarySections.communicationImplications}</p>}</section>

    <div className="mt-7 grid border border-line sm:grid-cols-3 sm:divide-x sm:divide-line">{Object.entries(brief.documentFacts).map(([key, value]) => <div key={key} className="border-b border-line bg-page p-4 last:border-b-0 sm:border-b-0"><span className="block text-[10px] uppercase tracking-[0.12em] text-muted">{text.facts[key as keyof typeof text.facts]}</span><strong className="mt-2 block text-sm font-semibold text-ink">{value}</strong></div>)}</div>
    <EvidenceList evidence={brief.evidence} onSelect={onEvidence} heading={text.evidenceUsed} pageLabel={text.page} />
  </div>;
}

function AnalysisScopeDrawer({ panel, brief, text, onClose }: { panel: ScopePanel; brief: Brief; text: ResultText; onClose: () => void }) {
  const panelIndex = panel === "themes" ? 0 : panel === "findings" ? 1 : 2;
  const themes = brief.summarySections.mainThemes ?? [];

  return <div className="fixed inset-0 z-50">
    <button type="button" className="absolute inset-0 cursor-default bg-ink/25" aria-label={text.scopePanel.close} onClick={onClose} />
    <aside id="analysis-scope-panel" role="dialog" aria-modal="true" aria-labelledby="analysis-scope-panel-title" className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-line bg-surface shadow-[-18px_0_45px_rgba(21,54,74,0.16)]">
      <header className="border-b border-line px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-5">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">{text.scopePanel.traceability}</p><h2 id="analysis-scope-panel-title" className="mt-2 text-xl font-semibold tracking-tight text-ink">{text.scopeTags[panelIndex]}</h2></div>
          <button type="button" onClick={onClose} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-3 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span aria-hidden="true">×</span>{text.scopePanel.close}</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
        {panel === "themes" && <section><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{text.scopePanel.mainThemesIdentified}</h3><div className="mt-4 divide-y divide-line border-y border-line">{themes.map((theme, index) => <article key={theme.title} className="grid gap-3 py-5 sm:grid-cols-[36px_1fr]"><span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-page text-[10px] font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span><div><div className="flex items-start justify-between gap-4"><h4 className="text-sm font-semibold leading-6 text-ink">{theme.title}</h4><span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-brand">{text.page} {theme.pages}</span></div><p className="mt-2 text-xs leading-5 text-muted">{theme.description}</p></div></article>)}</div></section>}

        {panel === "findings" && <section><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{text.summaryLabels.keyFindings}</h3><div className="mt-4 space-y-4">{brief.summarySections.keyFindings.map((finding, index) => { const message = brief.keyMessages.find((item) => item.page === finding.page); const evidence = brief.evidence.find((item) => item.page === finding.page); return <article key={`${finding.title}-${finding.page}`} className="rounded-md border border-line bg-page p-4"><div className="flex items-start gap-3"><span className="text-[10px] font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span><h4 className="text-sm font-semibold leading-6 text-ink">{finding.title}</h4></div><dl className="mt-4 space-y-4 border-t border-line pt-4"><div><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.scopePanel.whyItMatters}</dt><dd className="mt-1.5 text-xs leading-5 text-ink">{message?.whyItMatters ?? finding.detail}</dd></div><div><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.scopePanel.supportingPageEvidence}</dt><dd className="mt-1.5 text-xs font-semibold text-brand">{text.page} {finding.page}</dd>{evidence && <blockquote className="mt-2 border-l-2 border-brand pl-3 text-xs leading-5 text-muted">{evidence.directEvidence}</blockquote>}</div></dl></article>; })}</div></section>}

        {panel === "evidence" && <section><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{text.scopePanel.evidenceQuoteData}</h3><div className="mt-4 space-y-4">{brief.evidence.map((item, index) => { const finding = brief.summarySections.keyFindings.find((candidate) => candidate.page === item.page); const message = brief.keyMessages.find((candidate) => candidate.page === item.page); const supportedConclusion = finding?.title ?? message?.title ?? text.scopePanel.sourceEvidence; return <article key={`${item.label}-${item.page}`} className="rounded-md border border-line bg-page p-4"><div className="flex items-start justify-between gap-4"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">{String(index + 1).padStart(2, "0")} · {item.label}</p><span className="shrink-0 text-[10px] font-semibold text-brand">{text.scopePanel.sourcePage} {item.page}</span></div><blockquote className="mt-3 border-l-2 border-brand pl-3 text-xs leading-5 text-ink">{item.directEvidence}</blockquote><div className="mt-4 border-t border-line pt-3"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.scopePanel.supports}</p><p className="mt-1.5 text-xs leading-5 text-ink">{supportedConclusion}</p></div></article>; })}</div></section>}
      </div>
    </aside>
  </div>;
}

function KeyMessageAnalysis({ brief, text, onEvidence }: { brief: Brief; text: ResultText; onEvidence: (index: number) => void }) {
  return <div className="divide-y divide-line">{brief.keyMessages.map((message, index) => <article key={`${message.title}-${index}`} className="py-7 first:pt-0 last:pb-0"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">{text.message} {String(index + 1).padStart(2, "0")}</p><button type="button" onClick={() => onEvidence(index)} className="text-[10px] font-semibold text-brand hover:text-brand-dark">{text.viewSource} · {text.page} {message.page}</button></div><h3 className="mt-3 text-base font-semibold leading-7 text-ink">{message.title}</h3><dl className="mt-5 grid gap-4 rounded-md bg-page p-4 sm:grid-cols-2"><AnalysisField label={text.analysisLabels.whyItMatters} value={message.whyItMatters ?? message.communicationPurpose} /><AnalysisField label={text.priorityAudience} value={message.audience} /><div className="sm:col-span-2"><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{text.analysisLabels.supportingEvidence}</dt><dd className="mt-2 border-l-2 border-brand pl-3 text-xs leading-5 text-ink">{message.evidence}</dd></div><AnalysisField label={text.pageNumber} value={message.page} /><AnalysisField label={text.analysisLabels.communicationAngle} value={message.communicationAngle ?? message.communicationPurpose} /><div className="sm:col-span-2 border-t border-line pt-4"><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">{text.analysisLabels.whyConclusion}</dt><dd className="mt-2 text-xs leading-5 text-ink">{message.relevantData ?? message.evidence}</dd></div></dl></article>)}</div>;
}

function AnalysisField({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{label}</dt><dd className="mt-2 text-xs leading-5 text-ink">{value}</dd></div>;
}

function GuidanceRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="grid gap-2 py-4 sm:grid-cols-[170px_1fr] sm:gap-6"><dt className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${accent ? "text-brand" : "text-muted"}`}>{label}</dt><dd className="text-xs leading-5 text-ink">{value}</dd></div>;
}

function EvidenceList({ evidence, onSelect, heading, pageLabel }: { evidence: EvidenceItem[]; onSelect: (index: number) => void; heading: string; pageLabel: string }) {
  return <div className="mt-7 border-t border-line pt-5"><h3 className="text-sm font-semibold text-ink">{heading}</h3><div className="mt-3 flex flex-wrap gap-2">{evidence.map((item, index) => <button key={`${item.label}-${item.page}`} type="button" onClick={() => onSelect(index)} className="rounded-md border border-line bg-surface px-3 py-2 text-xs font-semibold text-brand transition hover:border-brand">{item.label} · {pageLabel} {item.page}</button>)}</div></div>;
}

function MaterialRow({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return <div className="grid gap-2 py-5 sm:grid-cols-[190px_1fr] sm:gap-6"><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{label}</dt><dd className={`${emphasis ? "font-medium text-ink" : "text-muted"} text-sm leading-6`}>{value}</dd></div>;
}
