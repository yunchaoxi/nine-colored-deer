import type { Metadata } from "next";
import { UploadPageClient } from "./upload-page-client";

export const metadata: Metadata = {
  title: "Prepare a communication planning brief",
  description: "Register a public source document and prepare an evidence-based public information planning brief.",
};

export default function UploadPage() {
  return <UploadPageClient />;
}
