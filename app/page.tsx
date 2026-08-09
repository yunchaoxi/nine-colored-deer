"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const copy = {
  en: {
    kicker: "Independent portfolio project · Public information planning",
    title: "Plan evidence-based communication from complex public reports.",
    intro: "GlobalBrief AI is an independent prototype for structuring source evidence, stakeholder analysis, key messages and channel approaches for international public information work. AI-supported drafting remains subject to professional judgement and human review.",
    primaryCta: "Prepare a planning brief",
    secondaryCta: "Try sample report",
    principlesLabel: "Project principles",
    principles: ["Source evidence retained", "Stakeholder and audience analysis", "Human editorial oversight"],
    preview: {
      title: "The Gender Snapshot 2025",
      meta: "Public UN report · 40 pages",
      status: "Sample analysis prepared",
      tabs: ["Context", "Messages", "Audiences", "Products"],
      heading: "Executive summary",
      summary: "The report assesses progress on gender equality across the Sustainable Development Goals and identifies evidence-backed priorities for accelerated action before 2030.",
      facts: [["No assessed SDG 5 indicator has reached or almost reached its target.", "p. 28"], ["65% of women used the Internet, compared with 70% of men.", "p. 21"]],
      open: "Try sample report",
    },
    highlights: [
      ["01", "Evidence-based planning", "Trace key messages and communication insights to source pages and extracted evidence."],
      ["02", "Stakeholder engagement", "Define audience roles, communication needs, approaches and appropriate channels."],
      ["03", "Responsible drafting support", "Keep outputs transparent, editable and subject to human editorial judgement."],
    ],
    contextKicker: "Project context",
    contextTitle: "A practical planning case study for international public information.",
    contextIntro: "Created independently to demonstrate how institutional evidence can inform stakeholder engagement, accessible communication and channel planning while professional judgement remains central to the process.",
    disclaimer: "This is a personal portfolio project. It is not a United Nations product and has no institutional affiliation or endorsement.",
    contextRows: [
      ["Communication task", "Translate long policy and research reports into structured public-information planning inputs."],
      ["Professional competencies", "Apply message development, stakeholder analysis, accessible framing and channel planning."],
      ["Editorial accountability", "Preserve source traceability, human review and final editorial responsibility throughout."],
    ],
    methodKicker: "An accountable planning workflow",
    methodTitle: "From source document to communication plan",
    methodIntro: "Structure evidence, stakeholder engagement and accessible public information within a reviewable editorial process.",
    workflow: [
      ["Register", "Add a public source document and select the working language and priority channels."],
      ["Structure", "Map findings, stakeholders and communication considerations to verifiable evidence."],
      ["Review", "Set the communication mode, inspect references and edit every proposed output before use."],
    ],
    responsibleKicker: "Responsible AI-supported practice",
    responsibleTitle: "Drafting support remains subordinate to professional judgement.",
    responsibleText: "GlobalBrief AI separates extracted evidence from communication interpretation, preserves traceability and requires human editorial review. It does not autonomously publish or approve public information.",
    responsibleCta: "Prepare a brief",
  },
  fr: {
    kicker: "Projet de portfolio indépendant · Planification de l’information publique",
    title: "Planifier une communication fondée sur les faits à partir de rapports publics complexes.",
    intro: "GlobalBrief AI est un prototype indépendant qui structure les sources, l’analyse des parties prenantes, les messages clés et les approches par canal pour l’information publique internationale. Toute rédaction assistée par l’IA reste soumise au jugement professionnel et à la révision humaine.",
    primaryCta: "Préparer une note de planification",
    secondaryCta: "Essayer le rapport exemple",
    principlesLabel: "Principes du projet",
    principles: ["Sources conservées", "Analyse des parties prenantes et des publics", "Supervision éditoriale humaine"],
    preview: {
      title: "Gros plan sur l’égalité des sexes 2025",
      meta: "Rapport public de l’ONU · 40 pages",
      status: "Analyse exemple préparée",
      tabs: ["Contexte", "Messages", "Publics", "Produits"],
      heading: "Résumé exécutif",
      summary: "Le rapport évalue les progrès vers l’égalité des sexes dans l’ensemble des ODD et définit des priorités fondées sur les faits pour accélérer l’action avant 2030.",
      facts: [["Aucun indicateur ODD 5 évalué n’a atteint ou presque atteint sa cible.", "p. 28"], ["65 % des femmes utilisaient Internet, contre 70 % des hommes.", "p. 21"]],
      open: "Essayer le rapport exemple",
    },
    highlights: [
      ["01", "Planification fondée sur les faits", "Relier messages clés et enseignements de communication aux pages et extraits sources."],
      ["02", "Mobilisation des parties prenantes", "Définir le rôle des publics, leurs besoins, l’approche et les canaux adaptés."],
      ["03", "Appui responsable à la rédaction", "Maintenir des contenus transparents, modifiables et soumis au jugement éditorial humain."],
    ],
    contextKicker: "Contexte du projet",
    contextTitle: "Une étude de cas en planification de l’information publique internationale.",
    contextIntro: "Ce projet indépendant montre comment les données institutionnelles peuvent guider la mobilisation des parties prenantes, la communication accessible et la planification des canaux, sous supervision professionnelle.",
    disclaimer: "Il s’agit d’un projet de portfolio personnel. Ce n’est pas un produit des Nations Unies et il ne bénéficie d’aucune affiliation ni approbation institutionnelle.",
    contextRows: [
      ["Tâche de communication", "Transformer de longs rapports en éléments structurés pour la planification de l’information publique."],
      ["Compétences professionnelles", "Appliquer la formulation de messages, l’analyse des parties prenantes, l’accessibilité et la planification des canaux."],
      ["Responsabilité éditoriale", "Préserver la traçabilité des sources, la révision humaine et la responsabilité éditoriale finale."],
    ],
    methodKicker: "Un processus de planification responsable",
    methodTitle: "Du document source au plan de communication",
    methodIntro: "Structurer les faits, la mobilisation des parties prenantes et l’information accessible dans un processus éditorial vérifiable.",
    workflow: [
      ["Enregistrer", "Ajouter un document source public et sélectionner la langue de travail et les canaux prioritaires."],
      ["Structurer", "Relier conclusions, parties prenantes et considérations de communication à des sources vérifiables."],
      ["Réviser", "Définir le mode de communication, vérifier les références et modifier chaque proposition avant utilisation."],
    ],
    responsibleKicker: "Pratique responsable assistée par l’IA",
    responsibleTitle: "L’appui à la rédaction reste subordonné au jugement professionnel.",
    responsibleText: "GlobalBrief AI distingue les faits extraits de leur interprétation, préserve la traçabilité et exige une révision éditoriale humaine. Il ne publie ni n’approuve aucun contenu de manière autonome.",
    responsibleCta: "Préparer une note",
  },
  zh: {
    kicker: "独立作品集项目 · 公共信息传播规划",
    title: "基于复杂公共报告，规划循证传播。",
    intro: "GlobalBrief AI 是一个独立原型，用于组织来源证据、利益相关方分析、核心信息和渠道策略，服务国际公共信息传播工作。AI 辅助起草始终接受专业判断与人工审核。",
    primaryCta: "准备传播规划简报",
    secondaryCta: "试用示例报告",
    principlesLabel: "项目原则",
    principles: ["保留来源证据", "利益相关方与受众分析", "人工编辑监督"],
    preview: {
      title: "《2025年性别平等快照》",
      meta: "联合国公开报告 · 40 页",
      status: "示例分析已准备",
      tabs: ["背景", "核心信息", "受众", "传播产品"],
      heading: "执行摘要",
      summary: "报告评估可持续发展目标中的性别平等进展，并提出在2030年前加快行动的循证重点。",
      facts: [["受评估的可持续发展目标5指标均未达到或接近目标。", "第 28 页"], ["女性互联网使用率为65%，男性为70%。", "第 21 页"]],
      open: "试用示例报告",
    },
    highlights: [
      ["01", "循证传播规划", "将核心信息和传播洞察对应至来源页码及直接证据。"],
      ["02", "利益相关方参与", "明确受众作用、传播需求、沟通方式和适合渠道。"],
      ["03", "负责任的起草支持", "确保内容透明、可编辑，并接受人工编辑判断。"],
    ],
    contextKicker: "项目背景",
    contextTitle: "面向国际公共信息传播规划的实践案例。",
    contextIntro: "本独立项目展示如何利用机构证据支持利益相关方参与、无障碍传播和渠道规划，并确保专业判断始终处于流程核心。",
    disclaimer: "这是个人作品集项目，并非联合国产品，与任何机构均无官方隶属或认可关系。",
    contextRows: [
      ["传播任务", "将篇幅较长的政策与研究报告转化为结构化的公共信息传播规划输入。"],
      ["专业能力", "运用信息提炼、利益相关方分析、无障碍表达和渠道规划能力。"],
      ["编辑责任", "在整个流程中确保来源可追溯、人工审核和最终编辑责任。"],
    ],
    methodKicker: "可问责的传播规划流程",
    methodTitle: "从来源文件到传播规划",
    methodIntro: "在可审核的编辑流程中，组织证据、利益相关方参与和无障碍公共信息。",
    workflow: [
      ["登记", "添加公开来源文件，并选择工作语言和重点渠道。"],
      ["组织", "将主要发现、利益相关方和传播考量对应至可核验的证据。"],
      ["审核", "设定传播模式、检查来源，并在使用前编辑每项建议内容。"],
    ],
    responsibleKicker: "负责任的 AI 辅助实践",
    responsibleTitle: "起草支持必须服从专业判断。",
    responsibleText: "GlobalBrief AI 区分提取证据与传播解读，保留可追溯性，并要求人工编辑审核。工具不会自主发布或批准公共信息内容。",
    responsibleCta: "准备简报",
  },
} as const;

export default function Home() {
  const { locale } = useLanguage();
  const text = copy[locale];

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader active="home" />
      <main>
        <section className="relative overflow-hidden border-b border-line bg-surface">
          <div className="hero-grid absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">{text.kicker}</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[58px]">{text.title}</h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">{text.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/upload" className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2">
                  {text.primaryCta} <span className="ml-2" aria-hidden="true">→</span>
                </Link>
                <Link href="/results?sample=gender-snapshot-2025" className="inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-surface px-6 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand">{text.secondaryCta}</Link>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted" aria-label={text.principlesLabel}>
                {text.principles.map((principle) => <li key={principle}><span className="mr-2 text-success">✓</span>{principle}</li>)}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5 shadow-[0_24px_60px_rgba(21,54,74,0.13)]">
              <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                <div className="flex min-w-0 gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-brand-soft text-xs font-semibold text-brand">PDF</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{text.preview.title}</p><p className="mt-1 text-xs text-muted">{text.preview.meta}</p></div></div>
                <span className="shrink-0 rounded-full bg-success-soft px-3 py-1 text-[11px] font-semibold text-success">{text.preview.status}</span>
              </div>
              <div className="flex gap-5 overflow-hidden border-b border-line pt-3 text-[11px] text-muted">
                {text.preview.tabs.map((tab, index) => <span key={tab} className={`${index === 0 ? "border-b-2 border-brand font-semibold text-brand" : ""} py-3`}>{tab}</span>)}
              </div>
              <div className="pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{text.preview.heading}</p>
                <p className="mt-3 text-sm leading-7 text-ink">{text.preview.summary}</p>
                <div className="mt-5 divide-y divide-line border-y border-line text-xs">
                  {text.preview.facts.map(([fact, page]) => <div key={fact} className="flex justify-between gap-4 py-3"><span>{fact}</span><span className="shrink-0 text-brand">{page}</span></div>)}
                </div>
                <Link href="/results?sample=gender-snapshot-2025" className="mt-5 flex min-h-11 items-center justify-center rounded-md bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark">{text.preview.open}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-[1180px] divide-y divide-line px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            {text.highlights.map(([number, title, description]) => <article key={title} className="py-8 md:px-8 first:md:pl-0 last:md:pr-0"><p className="text-xs font-semibold text-brand">{number}</p><h2 className="mt-5 text-lg font-semibold text-ink">{title}</h2><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}
          </div>
        </section>

        <section id="project-context" className="border-b border-line bg-page">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{text.contextKicker}</p><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{text.contextTitle}</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted">{text.contextIntro}</p><p className="mt-6 border-l-2 border-brand pl-4 text-sm leading-6 text-muted">{text.disclaimer}</p></div>
            <div className="divide-y divide-line border-y border-line">
              {text.contextRows.map(([title, description]) => <article key={title} className="grid gap-3 py-6 sm:grid-cols-[170px_1fr] sm:gap-8"><h3 className="text-sm font-semibold text-ink">{title}</h3><p className="text-sm leading-6 text-muted">{description}</p></article>)}
            </div>
          </div>
        </section>

        <section id="methodology" className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{text.methodKicker}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{text.methodTitle}</h2><p className="mt-5 max-w-lg text-base leading-7 text-muted">{text.methodIntro}</p></div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {text.workflow.map(([title, description], index) => <li key={title} className="border-t-2 border-brand pt-5"><p className="text-xs font-semibold text-brand">0{index + 1}</p><h3 className="mt-8 text-base font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></li>)}
            </ol>
          </div>
        </section>

        <section id="responsible-ai" className="border-y border-line bg-ink text-white">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8fd0ef]">{text.responsibleKicker}</p><h2 className="mt-3 text-2xl font-semibold">{text.responsibleTitle}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#c6d6df]">{text.responsibleText}</p></div>
            <Link href="/upload" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-ink transition hover:bg-brand-soft">{text.responsibleCta}</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
