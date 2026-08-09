import { enrichSocialPosts, type Brief, type EvidenceItem, type SocialPostDraft } from "@/lib/brief";
import type { Locale } from "@/lib/locales";

type ExtractedPage = { page: number; text: string };
type Candidate = { page: number; sentence: string; score: number; theme: string };

const labels = {
  en: {
    documentType: (pages: number) => `${pages}-page PDF · Locally extracted evidence`,
    why: (theme: string) => `The document presents this as a substantive finding within its discussion of ${theme}.`,
    evidence: (theme: string) => `Document evidence area: ${theme}`,
    angleData: "Lead with the verified figure or quoted finding and retain the page reference.",
    angleFinding: "Present this as a report finding, with the source page visible in public materials.",
    implications: (themes: string) => `Communication should prioritize the document’s evidenced themes—${themes}—and retain page references for factual claims. Distinguish direct findings from communication interpretation and subject all outputs to editorial review.`,
    audiences: ["Decision-makers and programme leads", "Media and public-information partners", "Affected communities and civil society"],
    needs: ["Verified findings, implications and decision-relevant evidence", "Concise attributable findings and direct source references", "Accessible explanations of findings and their practical relevance"],
    approaches: ["Lead with the strongest documented finding and its page reference.", "Provide concise source-linked lines and preserve relevant caveats.", "Use plain language, explain relevance and provide access to the source."],
    channels: ["Briefing note, stakeholder meeting, LinkedIn", "Media note, web story, X", "Accessible web content, Instagram, community channels"],
    caveat: "This working brief was produced through deterministic local text extraction, not generative AI. Verify quotations, tables and context against the source PDF before use.",
    socialNotes: ["Professional · Source linked", "Concise · Evidence led", "Accessible · Visual led"],
  },
  fr: {
    documentType: (pages: number) => `PDF de ${pages} pages · Éléments extraits localement`,
    why: (theme: string) => `Le document présente cet élément comme une conclusion substantielle dans son analyse de ${theme}.`,
    evidence: (theme: string) => `Domaine documenté : ${theme}`,
    angleData: "Commencer par le chiffre ou l’extrait vérifié et conserver la référence de page.",
    angleFinding: "Présenter cet élément comme une conclusion du rapport, avec la page source visible.",
    implications: (themes: string) => `La communication doit privilégier les thèmes étayés par le document — ${themes} — et conserver les références de page. Distinguer les conclusions directes de leur interprétation et soumettre chaque contenu à une révision éditoriale.`,
    audiences: ["Décideurs et responsables de programme", "Médias et partenaires d’information publique", "Communautés concernées et société civile"],
    needs: ["Conclusions vérifiées, implications et éléments utiles à la décision", "Messages attribuables et références directes aux sources", "Explications accessibles des conclusions et de leur portée pratique"],
    approaches: ["Commencer par la conclusion la mieux étayée et sa référence de page.", "Fournir des messages concis et sourcés en conservant les réserves pertinentes.", "Employer un langage clair, expliquer la pertinence et donner accès à la source."],
    channels: ["Note d’information, réunion de parties prenantes, LinkedIn", "Note média, article web, X", "Contenu web accessible, Instagram, canaux communautaires"],
    caveat: "Cette note de travail repose sur une extraction locale déterministe, et non sur une IA générative. Vérifiez les citations, tableaux et le contexte dans le PDF source avant utilisation.",
    socialNotes: ["Professionnel · Source visible", "Concis · Fondé sur les faits", "Accessible · Visuel"],
  },
  zh: {
    documentType: (pages: number) => `${pages} 页 PDF · 本地提取证据`,
    why: (theme: string) => `文件在关于“${theme}”的论述中，将此内容作为一项实质性发现。`,
    evidence: (theme: string) => `文件证据领域：${theme}`,
    angleData: "以经核验的数据或引文切入，并保留来源页码。",
    angleFinding: "将其明确呈现为报告发现，并在公共传播材料中保留来源页码。",
    implications: (themes: string) => `传播工作应优先使用文件中有证据支持的主题——${themes}——并为事实主张保留页码。应区分报告直接发现与传播解读，所有输出均须经过编辑审核。`,
    audiences: ["决策者与项目负责人", "媒体与公共信息伙伴", "受影响群体与民间社会"],
    needs: ["经核验的发现、影响及与决策相关的证据", "可归属的简明发现和直接来源引用", "易于理解的发现说明及其实践相关性"],
    approaches: ["以证据最充分的文件发现及其页码切入。", "提供简明、附来源的信息，并保留必要限制说明。", "使用平实语言解释相关性，并提供来源文件入口。"],
    channels: ["政策简报、利益相关方会议、LinkedIn", "媒体资料、网站文章、X", "无障碍网页内容、Instagram、社区渠道"],
    caveat: "本工作简报通过确定性的本地文本提取生成，未使用生成式 AI。使用前请对照来源 PDF 核验引文、表格和上下文。",
    socialNotes: ["专业 · 附来源", "简洁 · 循证", "易于理解 · 视觉优先"],
  },
} as const;

const stopWords = new Set([
  "about", "after", "also", "among", "been", "being", "between", "could", "from", "have", "into", "more", "most", "other", "over", "report", "section", "such", "than", "that", "their", "there", "these", "they", "this", "through", "under", "were", "which", "while", "with", "would",
  "ainsi", "avec", "cette", "dans", "depuis", "entre", "être", "leurs", "mais", "pour", "rapport", "sans", "sont", "sous", "plus", "toute", "tous", "une", "des", "les",
]);

function clean(value: string) {
  return value.replace(/\s+/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim();
}

function sentences(value: string) {
  return clean(value).split(/(?<=[.!?。！？])\s+/u).map(clean).filter((item) => item.length >= 55 && item.length <= 420);
}

function themeWords(pages: ExtractedPage[]) {
  const counts = new Map<string, number>();
  const text = pages.map((page) => page.text).join(" ").toLowerCase();
  for (const match of text.matchAll(/[\p{L}][\p{L}\p{M}-]{3,}/gu)) {
    const word = match[0].replace(/^-|-$/g, "");
    if (stopWords.has(word) || word.length > 28) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
}

function selectTheme(sentence: string, themes: string[]) {
  return themes.find((theme) => sentence.toLowerCase().includes(theme.toLowerCase())) ?? themes[0] ?? "Document findings";
}

function scoreSentence(sentence: string) {
  let score = 0;
  if (/\d|%|million|billion|percent|pour cent|百万|亿/u.test(sentence)) score += 5;
  if (/find|found|increase|decrease|recommend|evidence|result|impact|indique|constate|recommande|résultat|影响|发现|建议|增长|下降/iu.test(sentence)) score += 3;
  if (/must|should|requires|need|devrait|doit|nécessite|应当|需要|必须/iu.test(sentence)) score += 2;
  if (sentence.length >= 90 && sentence.length <= 280) score += 2;
  return score;
}

function messageCount(pageCount: number) {
  if (pageCount <= 10) return 3;
  if (pageCount <= 40) return 5;
  if (pageCount <= 100) return 5;
  if (pageCount <= 180) return 6;
  if (pageCount <= 260) return 7;
  return 8;
}

function selectCandidates(pages: ExtractedPage[], count: number, themes: string[]) {
  const candidates = pages.flatMap((page) => sentences(page.text).map((sentence) => ({ page: page.page, sentence, score: scoreSentence(sentence), theme: selectTheme(sentence, themes) })));
  const selected: Candidate[] = [];
  const seen = new Set<string>();
  for (const candidate of candidates.sort((a, b) => b.score - a.score || a.page - b.page)) {
    const signature = candidate.sentence.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "").slice(0, 90);
    if (!signature || seen.has(signature) || selected.filter((item) => item.page === candidate.page).length >= 2) continue;
    seen.add(signature);
    selected.push(candidate);
    if (selected.length === count) break;
  }
  return selected.sort((a, b) => a.page - b.page);
}

function inferAudience(sentence: string, locale: Locale, index: number) {
  const l = labels[locale];
  if (/government|policy|minister|public authorit|gouvernement|politique|minist|政府|政策|部门/iu.test(sentence)) return l.audiences[0];
  if (/media|journal|press|média|presse|媒体|新闻/iu.test(sentence)) return l.audiences[1];
  return l.audiences[index % l.audiences.length];
}

function titleFromFile(fileName: string) {
  return fileName.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function extractPdfPages(file: File): Promise<ExtractedPage[]> {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfjs.GlobalWorkerOptions.workerPort) {
    pdfjs.GlobalWorkerOptions.workerPort = new Worker(new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url), { type: "module" });
  }
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages: ExtractedPage[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = clean(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
    pages.push({ page: pageNumber, text });
  }
  await pdf.destroy();
  return pages;
}

export function buildLocalEvidenceBrief(fileName: string, pages: ExtractedPage[], locale: Locale): Brief {
  const readablePages = pages.filter((page) => page.text.length >= 40);
  if (!readablePages.length) throw new Error("NO_EXTRACTABLE_TEXT");
  const l = labels[locale];
  const themes = themeWords(readablePages);
  const resolvedThemes = themes.length ? themes : [titleFromFile(fileName)];
  const candidates = selectCandidates(readablePages, messageCount(pages.length), resolvedThemes);
  if (candidates.length < 3) throw new Error("INSUFFICIENT_EXTRACTABLE_TEXT");

  const keyMessages: Brief["keyMessages"] = candidates.map((item, index) => ({
    title: item.sentence,
    whyItMatters: l.why(item.theme),
    communicationPurpose: l.why(item.theme),
    evidence: l.evidence(item.theme),
    page: String(item.page),
    relevantData: `“${item.sentence}”`,
    audience: inferAudience(item.sentence, locale, index),
    communicationAngle: /\d|%/u.test(item.sentence) ? l.angleData : l.angleFinding,
  }));

  const evidence: EvidenceItem[] = candidates.map((item, index) => ({
    label: item.theme,
    page: String(item.page),
    directEvidence: `“${item.sentence}”`,
    communicationInsight: keyMessages[index].whyItMatters ?? "",
    suggestedUse: { targetAudience: keyMessages[index].audience, recommendedFraming: keyMessages[index].communicationAngle ?? "", channel: l.channels[index % l.channels.length] },
  }));

  const audiences: Brief["audiences"] = l.audiences.map((name, index) => ({
    name,
    priority: index === 0 ? "Primary" : index === 1 ? "Multiplier" : "Stakeholder",
    needs: l.needs[index],
    approach: l.approaches[index],
    channels: l.channels[index],
  }));

  const socialDrafts: SocialPostDraft[] = ["LinkedIn", "X", "Instagram"].map((platform, index) => ({
    platform,
    post: candidates[index % candidates.length].sentence,
    notes: l.socialNotes[index],
  }));
  const themeSummary = resolvedThemes.slice(0, 3).join(", ");

  return {
    mode: "live",
    analysisMethod: "local-extraction",
    scenario: "upload",
    communicationMode: "awareness",
    sourceFile: fileName,
    title: titleFromFile(fileName),
    documentType: l.documentType(pages.length),
    executiveSummary: candidates.slice(0, Math.min(4, candidates.length)).map((item) => item.sentence).join(" "),
    summarySections: {
      background: sentences(readablePages[0].text).slice(0, 2).join(" ") || readablePages[0].text.slice(0, 500),
      mainThemes: resolvedThemes,
      keyFindings: candidates.map((item) => ({ title: item.theme, detail: item.sentence, page: String(item.page) })),
      evidenceAreas: resolvedThemes.map((theme) => ({ label: theme, pages: [...new Set(candidates.filter((item) => item.theme === theme).map((item) => item.page))].join(", ") || "—" })),
      communicationImplications: l.implications(themeSummary),
    },
    keyMessages,
    audiences,
    socialPosts: enrichSocialPosts(socialDrafts, locale, "awareness", themeSummary),
    recommendations: [],
    documentFacts: { theme: themeSummary, priorityAudience: audiences[0].name, tone: "Evidence-led, accessible" },
    evidence,
    caveats: [l.caveat],
  };
}
