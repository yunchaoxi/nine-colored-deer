"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UploadForm } from "./upload-form";

const copy = {
  en: { kicker: "Communication planning workflow", title: "Prepare an evidence-based communication brief", intro: "Register a public source document and set the initial planning parameters. Intended use is defined during editorial review.", steps: ["Source", "Parameters", "Brief"] },
  fr: { kicker: "Processus de planification de la communication", title: "Préparer une note de communication fondée sur les faits", intro: "Enregistrez un document source public et définissez les paramètres initiaux. L’usage prévu est précisé lors de la révision éditoriale.", steps: ["Source", "Paramètres", "Note"] },
  zh: { kicker: "传播规划流程", title: "准备循证传播简报", intro: "登记公开来源文件并设置初始规划参数。预期用途将在编辑审核阶段明确。", steps: ["来源", "参数", "简报"] },
} as const;

export function UploadPageClient() {
  const { locale } = useLanguage();
  const text = copy[locale];
  return (
    <div className="min-h-screen bg-page">
      <SiteHeader active="upload" />
      <main className="mx-auto max-w-[1080px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mb-9 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{text.kicker}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{text.title}</h1><p className="mt-3 text-base text-muted">{text.intro}</p></div>
          <ol className="flex items-center gap-2 text-xs text-muted" aria-label={text.title}>
            {text.steps.map((step, index) => (
              <li key={step} className="contents">
                {index > 0 && <span className="h-px w-6 bg-line" aria-hidden="true" />}
                <span className={`flex items-center gap-2 ${index === 0 ? "font-semibold text-brand" : ""}`}><span className={`grid h-7 w-7 place-items-center rounded-full ${index === 0 ? "bg-brand text-white" : "border border-line bg-surface"}`}>{index + 1}</span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <UploadForm />
      </main>
      <SiteFooter />
    </div>
  );
}
