import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getGenderSampleBrief } from "@/lib/gender-sample";
import { ResultsClient } from "./results-client";

export const metadata: Metadata = {
  title: "Public information planning brief",
  description: "Review an evidence-based planning brief with stakeholder analysis, key messages, communication approaches and public information products.",
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-page">
      <SiteHeader active="results" />
      <ResultsClient initialBrief={getGenderSampleBrief("en")} />
      <SiteFooter />
    </div>
  );
}
