import { getDemoBrief } from "@/lib/brief";
import { applyCommunicationMode } from "@/lib/communication-modes";
import { isLocale } from "@/lib/locales";

const MAX_FILE_SIZE = 12 * 1024 * 1024;

type SimulationRequest = {
  fileName?: unknown;
  fileSize?: unknown;
  fileType?: unknown;
  language?: unknown;
  channels?: unknown;
  estimatedPages?: unknown;
};

function jsonError(error: string, code: string, status: number) {
  return Response.json({ error, code }, { status });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonError(
      "This MVP validates PDFs in the browser and accepts file metadata only.",
      "UNSUPPORTED_CONTENT_TYPE",
      415,
    );
  }

  let payload: SimulationRequest;
  try {
    payload = (await request.json()) as SimulationRequest;
  } catch {
    return jsonError("The upload details could not be read. Please try again.", "INVALID_REQUEST", 400);
  }

  const fileName = typeof payload.fileName === "string" ? payload.fileName.trim() : "";
  const fileSize = typeof payload.fileSize === "number" ? payload.fileSize : Number.NaN;
  const fileType = typeof payload.fileType === "string" ? payload.fileType : "";

  if (!fileName || !Number.isFinite(fileSize)) {
    return jsonError("A valid PDF file is required.", "INVALID_FILE", 400);
  }
  if (fileSize <= 0) {
    return jsonError("This PDF appears to be empty. Please choose another file.", "EMPTY_FILE", 400);
  }
  if (fileSize > MAX_FILE_SIZE) {
    return jsonError("This PDF exceeds the 12 MB MVP limit. Please choose a smaller file.", "FILE_TOO_LARGE", 413);
  }
  if (fileType !== "application/pdf" && !fileName.toLowerCase().endsWith(".pdf")) {
    return jsonError("This file is not supported. Please choose a PDF document.", "UNSUPPORTED_FILE", 415);
  }

  const locale = typeof payload.language === "string" && isLocale(payload.language) ? payload.language : "en";
  const estimatedPages = typeof payload.estimatedPages === "number" && Number.isFinite(payload.estimatedPages) && payload.estimatedPages > 0
    ? Math.min(Math.round(payload.estimatedPages), 5000)
    : undefined;
  const brief = applyCommunicationMode(getDemoBrief(locale, fileName, "upload", { estimatedPages, fileSize }), "awareness", locale);

  return Response.json(brief, {
    headers: { "Cache-Control": "no-store" },
  });
}
