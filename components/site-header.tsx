"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { localeCodes, localeNames, supportedLocales } from "@/lib/locales";

type SiteHeaderProps = {
  active?: "home" | "upload" | "results";
};

const copy = {
  en: { home: "Project", methodology: "Planning workflow", responsible: "Responsible use", sample: "Sample brief", analyze: "Prepare brief", language: "Change language" },
  fr: { home: "Projet", methodology: "Processus", responsible: "Utilisation responsable", sample: "Note exemple", analyze: "Préparer une note", language: "Changer de langue" },
  zh: { home: "项目", methodology: "规划流程", responsible: "负责任的使用", sample: "示例简报", analyze: "准备简报", language: "切换语言" },
} as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  const { locale, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const text = copy[locale];
  const linkClass = (key: SiteHeaderProps["active"]) =>
    `text-sm transition hover:text-brand ${active === key ? "font-semibold text-brand" : "text-muted"}`;

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center justify-between gap-3 px-5 lg:gap-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-ink" aria-label="GlobalBrief AI home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm text-white">G</span>
          <span className="hidden sm:inline">GlobalBrief AI</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          <Link href="/" className={linkClass("home")}>{text.home}</Link>
          <Link href="/#methodology" className="text-sm text-muted transition hover:text-brand">{text.methodology}</Link>
          <Link href="/#responsible-ai" className="text-sm text-muted transition hover:text-brand">{text.responsible}</Link>
          <Link href="/results" className={linkClass("results")}>{text.sample}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label={text.language}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex min-h-10 min-w-12 items-center justify-center gap-1 rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              {localeCodes[locale]} <span aria-hidden="true">⌄</span>
            </button>
            {menuOpen && (
              <div role="menu" className="absolute right-0 top-[calc(100%+8px)] min-w-36 overflow-hidden rounded-md border border-line bg-surface py-1 shadow-[0_12px_30px_rgba(21,54,74,0.16)]">
                {supportedLocales.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="menuitemradio"
                    aria-checked={locale === item}
                    onClick={() => { setLocale(item); setMenuOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-brand-soft ${locale === item ? "font-semibold text-brand" : "text-ink"}`}
                  >
                    {localeNames[item]} {locale === item && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href="/upload" className="inline-flex min-h-10 items-center justify-center rounded-md bg-brand px-3 text-xs font-semibold text-white transition hover:bg-brand-dark sm:px-4 sm:text-sm">
            {text.analyze}
          </Link>
        </div>
      </div>
    </header>
  );
}
