"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import type { Brief } from "@/lib/brief";
import { getGenderSampleBrief } from "@/lib/gender-sample";
import { localeNames, type Locale } from "@/lib/locales";

const MAX_FILE_SIZE = 12 * 1024 * 1024;
const MAX_FILE_SIZE_LABEL = "12 MB";

const copy = {
  en: {
    stages: ["Registering the source document", "Structuring the evidence record", "Mapping stakeholders and audiences", "Preparing public information products", "Applying editorial review checks"],
    errors: { notPdf: "This file is not supported. Please choose a PDF document.", empty: "This PDF appears to be empty. Please choose another file.", noFile: "Add a PDF before starting the analysis.", tooLarge: `This PDF is too large for the MVP. Please choose a file up to ${MAX_FILE_SIZE_LABEL}.`, unexpected: "The analysis service returned an unexpected response. Please try again.", failed: "The demo brief could not be created. Please try again.", unavailable: "The local analysis service is unavailable. Please refresh the page and try again." },
    uploadHeading: "Source document", ready: "Source document registered", validated: "The file meets the prototype requirements. Review the planning parameters below.", remove: "Remove", drop: "Add a public source document", fileTypes: "Public reports, policy documents and research publications", limit: `PDF only · up to ${MAX_FILE_SIZE_LABEL}`, choose: "Select PDF", sample: "Use illustrative source",
    receiveTitle: "Planning brief outputs", receive: ["Evidence-based report overview", "Dynamic themes, findings and key messages", "Stakeholder and audience analysis", "Channel-adapted public information products", "Ready-to-use communication materials"], dataTitle: "Source handling", dataText: "The PDF is validated and its page count is estimated locally. File content is not uploaded or stored; evidence outputs remain illustrative in this portfolio prototype.",
    contextTitle: "Planning parameters", contextIntro: "Select the working language and priority channels. The communication mode is applied during review of the completed brief.", language: "Working language", channels: "Priority channels",
    prototype: "Demonstration workflow: no AI service is connected. Source evidence and all communication outputs require professional review.", preparing: "Preparing planning brief…", generate: "Prepare communication brief →", progress: "Structuring an illustrative public information planning brief.",
  },
  fr: {
    stages: ["Enregistrement du document source", "Structuration des éléments probants", "Cartographie des parties prenantes et des publics", "Préparation des produits d’information publique", "Application des contrôles éditoriaux"],
    errors: { notPdf: "Ce format n’est pas pris en charge. Veuillez choisir un document PDF.", empty: "Ce PDF semble vide. Veuillez choisir un autre fichier.", noFile: "Ajoutez un PDF avant de lancer l’analyse.", tooLarge: `Ce PDF dépasse la limite du prototype. Choisissez un fichier de ${MAX_FILE_SIZE_LABEL} maximum.`, unexpected: "Le service d’analyse a renvoyé une réponse inattendue. Veuillez réessayer.", failed: "La note de démonstration n’a pas pu être créée. Veuillez réessayer.", unavailable: "Le service d’analyse local est indisponible. Actualisez la page et réessayez." },
    uploadHeading: "Document source", ready: "Document source enregistré", validated: "Le fichier répond aux exigences du prototype. Vérifiez les paramètres de planification ci-dessous.", remove: "Retirer", drop: "Ajouter un document source public", fileTypes: "Rapports publics, documents de politique et publications de recherche", limit: `PDF uniquement · ${MAX_FILE_SIZE_LABEL} maximum`, choose: "Sélectionner un PDF", sample: "Utiliser une source illustrative",
    receiveTitle: "Produits de la note de planification", receive: ["Vue d’ensemble fondée sur les faits", "Thèmes, conclusions et messages dynamiques", "Analyse des parties prenantes et des publics", "Produits d’information publique adaptés aux canaux", "Matériels de communication directement utilisables"], dataTitle: "Traitement de la source", dataText: "Le PDF est validé et son nombre de pages est estimé localement. Son contenu n’est ni transmis ni stocké ; les preuves restent illustratives dans ce prototype.",
    contextTitle: "Paramètres de planification", contextIntro: "Sélectionnez la langue de travail et les canaux prioritaires. Le mode de communication est appliqué lors de la révision de la note.", language: "Langue de travail", channels: "Canaux prioritaires",
    prototype: "Processus de démonstration : aucun service d’IA n’est connecté. Les sources et tous les produits nécessitent une révision professionnelle.", preparing: "Préparation de la note…", generate: "Préparer la note de communication →", progress: "Structuration d’une note illustrative de planification de l’information publique.",
  },
  zh: {
    stages: ["登记来源文件", "整理证据记录", "梳理利益相关方与受众", "准备公共信息传播产品", "执行编辑审核检查"],
    errors: { notPdf: "不支持此文件格式，请选择 PDF 文件。", empty: "该 PDF 似乎为空，请选择其他文件。", noFile: "请先添加 PDF，再开始分析。", tooLarge: `该 PDF 超出 MVP 限制，请选择不超过 ${MAX_FILE_SIZE_LABEL} 的文件。`, unexpected: "分析服务返回了异常响应，请重试。", failed: "无法创建模拟简报，请重试。", unavailable: "本地分析服务当前不可用，请刷新页面后重试。" },
    uploadHeading: "来源文件", ready: "来源文件已登记", validated: "文件符合原型要求，请检查下方规划参数。", remove: "移除", drop: "添加公开来源文件", fileTypes: "公开报告、政策文件和研究出版物", limit: `仅支持 PDF · 最大 ${MAX_FILE_SIZE_LABEL}`, choose: "选择 PDF", sample: "使用示例来源",
    receiveTitle: "传播规划简报输出", receive: ["基于证据的报告概览", "动态主题、发现与核心信息", "利益相关方与受众分析", "适配渠道的公共信息传播产品", "可直接使用的传播材料"], dataTitle: "来源文件处理", dataText: "PDF 在本地验证并估算页数，文件内容不会上传或存储。本作品集原型中的证据输出仍为示例内容。",
    contextTitle: "规划参数", contextIntro: "请选择工作语言和重点渠道。传播模式将在简报审核阶段应用。", language: "工作语言", channels: "重点渠道",
    prototype: "演示工作流程：当前未连接 AI 服务。来源证据及所有传播输出均须经过专业审核。", preparing: "正在准备规划简报…", generate: "准备传播简报 →", progress: "正在整理示例公共信息传播规划简报。",
  },
} as const;

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

async function estimatePdfPages(file: File) {
  try {
    const source = new TextDecoder("latin1").decode(await file.arrayBuffer());
    const pageObjects = source.match(/\/Type\s*\/Page(?!s)\b/g)?.length ?? 0;
    return pageObjects > 0 ? pageObjects : undefined;
  } catch {
    return undefined;
  }
}

type AnalyzeResponse = Brief | { error?: string; code?: string };

export function UploadForm() {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = copy[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");
  const [outputLocaleOverride, setOutputLocaleOverride] = useState<Locale | null>(null);
  const [channels, setChannels] = useState(["LinkedIn", "X"]);

  useEffect(() => {
    if (!isAnalyzing) return;
    const timer = window.setInterval(() => setStage((current) => Math.min(current + 1, text.stages.length - 1)), 400);
    return () => window.clearInterval(timer);
  }, [isAnalyzing, text.stages.length]);

  const outputLocale = outputLocaleOverride ?? locale;

  function acceptFile(nextFile: File | undefined) {
    setError("");
    if (!nextFile) return;
    if (!isPdf(nextFile)) { setFile(null); setError(text.errors.notPdf); return; }
    if (nextFile.size === 0) { setFile(null); setError(text.errors.empty); return; }
    if (nextFile.size > MAX_FILE_SIZE) { setFile(null); setError(`${text.errors.tooLarge} (${(nextFile.size / 1024 / 1024).toFixed(1)} MB)`); return; }
    setFile(nextFile);
  }

  function toggleChannel(channel: string) {
    setChannels((current) => current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel]);
  }

  function openDemo() {
    sessionStorage.setItem("globalbrief-result", JSON.stringify(getGenderSampleBrief(locale)));
    sessionStorage.removeItem("globalbrief-pdf-url");
    router.push("/results?sample=gender-snapshot-2025");
  }

  function removeFile() {
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function analyze() {
    if (!file) { setError(text.errors.noFile); return; }
    setError("");
    setStage(0);
    setIsAnalyzing(true);
    try {
      const estimatedPages = await estimatePdfPages(file);
      const [response] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, fileSize: file.size, fileType: file.type || "application/pdf", language: outputLocale, channels, estimatedPages }),
        }),
        new Promise((resolve) => window.setTimeout(resolve, 1400)),
      ]);

      let payload: AnalyzeResponse;
      if (response.headers.get("content-type")?.includes("application/json")) {
        payload = await response.json() as AnalyzeResponse;
      } else {
        const responseText = await response.text();
        payload = response.status === 413 || /payload too large/i.test(responseText) ? { error: text.errors.tooLarge } : { error: text.errors.unexpected };
      }
      if (!response.ok) throw new Error("error" in payload && payload.error ? payload.error : text.errors.failed);

      const pdfUrl = URL.createObjectURL(file);
      sessionStorage.setItem("globalbrief-result", JSON.stringify(payload));
      sessionStorage.setItem("globalbrief-pdf-url", pdfUrl);
      router.push("/results");
    } catch (analysisError) {
      const message = analysisError instanceof Error ? analysisError.message : text.errors.failed;
      setError(message === "Failed to fetch" ? text.errors.unavailable : message);
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.45fr_.55fr]">
        <section className="rounded-lg border border-line bg-surface p-5 sm:p-7" aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="sr-only">{text.uploadHeading}</h2>
          <div className={`flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-7 text-center transition ${dragActive ? "border-brand bg-brand-soft" : "border-[#8ebbd2] bg-[#f1f7fa]"}`} onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragActive(false)} onDrop={(event) => { event.preventDefault(); setDragActive(false); acceptFile(event.dataTransfer.files[0]); }}>
            {file ? (
              <div className="w-full max-w-xl"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-soft text-xs font-semibold text-success">PDF</div><h3 className="mt-5 text-lg font-semibold text-ink">{text.ready}</h3><p className="mt-2 text-sm text-muted">{text.validated}</p><div className="mt-6 flex items-center justify-between gap-4 rounded-md border border-line bg-surface p-4 text-left"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{file.name}</p><p className="mt-1 text-xs text-muted">{(file.size / 1024 / 1024).toFixed(1)} MB · PDF</p></div><button type="button" onClick={removeFile} className="shrink-0 text-xs font-semibold text-brand hover:text-brand-dark">{text.remove}</button></div></div>
            ) : (
              <div><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface text-2xl text-brand shadow-sm" aria-hidden="true">↑</div><h3 className="mt-5 text-lg font-semibold text-ink">{text.drop}</h3><p className="mt-2 text-sm leading-6 text-muted">{text.fileTypes}<br />{text.limit}</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => inputRef.current?.click()} className="min-h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark">{text.choose}</button><button type="button" onClick={openDemo} className="min-h-11 px-3 text-sm font-semibold text-brand hover:text-brand-dark">{text.sample}</button></div><input ref={inputRef} className="sr-only" type="file" accept="application/pdf,.pdf" onChange={(event) => acceptFile(event.target.files?.[0])} /></div>
            )}
          </div>
        </section>

        <aside className="rounded-lg border border-line bg-surface p-6"><h2 className="text-base font-semibold text-ink">{text.receiveTitle}</h2><ul className="mt-5 space-y-4 text-sm text-ink">{text.receive.map((item) => <li key={item} className="flex gap-3"><span className="text-success">✓</span><span>{item}</span></li>)}</ul><div className="mt-7 border-t border-line pt-6"><h3 className="text-sm font-semibold text-ink">{text.dataTitle}</h3><p className="mt-2 text-xs leading-6 text-muted">{text.dataText}</p></div></aside>
      </div>

      <section className="rounded-lg border border-line bg-surface p-6 sm:p-7" aria-labelledby="context-heading">
        <h2 id="context-heading" className="text-xl font-semibold text-ink">{text.contextTitle}</h2><p className="mt-1 text-xs leading-5 text-muted">{text.contextIntro}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-xs font-semibold text-muted">{text.language}<select value={outputLocale} onChange={(event) => setOutputLocaleOverride(event.target.value as Locale)} className="mt-2 block min-h-11 w-full rounded-md border border-line bg-page px-3 text-sm font-normal text-ink">{(Object.keys(localeNames) as Locale[]).map((item) => <option key={item} value={item}>{localeNames[item]}</option>)}</select></label>
          <fieldset><legend className="text-xs font-semibold text-muted">{text.channels}</legend><div className="mt-2 flex flex-wrap gap-2">{["LinkedIn", "X", "Facebook", "Instagram"].map((channel) => <label key={channel} className={`flex min-h-11 items-center gap-2 rounded-md border px-3 text-xs ${channels.includes(channel) ? "border-brand bg-brand-soft text-brand" : "border-line bg-page text-ink"}`}><input type="checkbox" checked={channels.includes(channel)} onChange={() => toggleChannel(channel)} className="accent-[#176b98]" />{channel}</label>)}</div></fieldset>
        </div>
        {error && <div role="alert" className="mt-5 rounded-md border border-[#e4b7aa] bg-[#fff1ed] px-4 py-3 text-sm text-[#8b3d2c]">{error}</div>}
        <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-xs leading-5 text-muted">{text.prototype}</p><button type="button" disabled={isAnalyzing} onClick={analyze} className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60">{isAnalyzing ? text.preparing : text.generate}</button></div>
      </section>

      {isAnalyzing && <section className="rounded-lg border border-brand/30 bg-brand-soft p-6" aria-live="polite"><div className="flex items-center gap-4"><div className="grid h-11 w-11 place-items-center rounded-full bg-brand text-xs font-semibold text-white">MVP</div><div><p className="text-sm font-semibold text-ink">{text.stages[stage]}</p><p className="mt-1 text-xs text-muted">{text.progress}</p></div></div><div className="mt-5 grid grid-cols-5 gap-2" aria-hidden="true">{text.stages.map((_, index) => <span key={index} className={`h-1 rounded-full ${index <= stage ? "bg-brand analysis-pulse" : "bg-line"}`} />)}</div></section>}
    </div>
  );
}
