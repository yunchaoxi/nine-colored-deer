"use client";

import { useLanguage } from "@/components/language-provider";

const copy = {
  en: {
    descriptor: "GlobalBrief AI · Evidence-based public information planning",
    disclaimer: "Independent portfolio project | Exploring how AI can support international public information workflows. This project has no official affiliation with any international organization.",
  },
  fr: {
    descriptor: "GlobalBrief AI · Planification de l’information publique fondée sur les faits",
    disclaimer: "Projet de portfolio indépendant | Explorer comment l’IA peut soutenir les processus d’information publique internationale. Ce projet n’a aucun lien officiel avec une organisation internationale.",
  },
  zh: {
    descriptor: "GlobalBrief AI · 循证公共信息传播规划",
    disclaimer: "独立作品集项目｜探索 AI 如何支持国际公共信息传播流程。本项目与任何国际组织无官方关联。",
  },
} as const;

export function SiteFooter() {
  const { locale } = useLanguage();
  const text = copy[locale];
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-7 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>{text.descriptor}</p>
        <p>{text.disclaimer}</p>
      </div>
    </footer>
  );
}
