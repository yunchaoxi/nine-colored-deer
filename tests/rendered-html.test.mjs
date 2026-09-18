import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";
import { dirname, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;
let server;

before(async () => {
  server = spawn(
    process.execPath,
    [resolve(root, "node_modules/next/dist/bin/next"), "start", "-p", String(port)],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );

  const output = [];
  server.stdout.on("data", (chunk) => output.push(chunk.toString()));
  server.stderr.on("data", (chunk) => output.push(chunk.toString()));

  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js test server stopped unexpectedly.\n${output.join("")}`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await delay(500);
  }

  throw new Error(`Next.js test server did not become ready.\n${output.join("")}`);
});

after(() => {
  server?.kill();
});

async function render(path = "/", init) {
  return fetch(`${baseUrl}${path}`, init ?? { headers: { accept: "text/html" } });
}

test("server-renders the complete Nine-Colored Deer story", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /THE NINE-/i);
  assert.match(html, /A Promise in the Desert/);
  assert.match(html, /THE ENCOUNTER/);
  assert.match(html, /THE RESCUE/);
  assert.match(html, /THE PROMISE/);
  assert.match(html, /THE BETRAYAL/);
  assert.match(html, /THE REVELATION/);
  assert.match(html, /THE AWAKENING/);
  assert.match(html, /THE PRICE OF BETRAYAL/);
  assert.match(html, /THE ASCENT/);
  assert.match(html, /Kindness outlived/);
  assert.match(html, /Revisit the story/);
  assert.match(html, /Deer King Jātaka of Mogao Cave 257/);
  assert.match(html, /1981 animated film/);
  assert.match(html, /assets\/nine-colored-deer\/deer-1145\.webp/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders one aligned procession in the betrayal chapter", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /betrayal-procession-replacement/);
  assert.match(html, /04-royal-procession-user-v2\.png\?v=2/);
  assert.doesNotMatch(html, /procession-rig__piece/);
  assert.match(html, /When the king offered gold for the mysterious deer, the traveller abandoned his promise and betrayed the one who had saved him\./);
  assert.match(html, /At the glint of gold,/);
  assert.match(html, /a promise turned to dust\./);
  assert.doesNotMatch(html, /procession-rig__retinue-image/);
});

test("renders navigation 00–08 and the consistent herbalist character", async () => {
  const response = await render();
  const html = await response.text();

  for (const id of ["opening", "encounter", "rescue", "promise", "betrayal", "revelation", "awakening", "price", "ascent"]) {
    assert.match(html, new RegExp(`href="#${id}"`));
  }
  assert.match(html, /traveller-herbalist-drowning\.png/);
  assert.match(html, /traveller-herbalist-thanking\.png/);
  assert.match(html, /04-royal-procession-user-v2\.png\?v=2/);
  assert.match(html, /plunging-traveller\.png/);
  assert.match(html, /splash-impact-tall\.png/);
  assert.match(html, /splash-foreground-wide\.png/);
  assert.match(html, /arrow-volley\.png/);
  assert.match(html, /arrows-to-ash\.png/);
  assert.match(html, /king-and-soldiers-weapons-lowered\.png/);
  assert.match(html, /price-water-background\.png/);
  assert.match(html, /nine-colored-deer-ascending\.png/);
});

test("moves communication objectives from upload to results", async () => {
  const uploadResponse = await render("/upload");
  const uploadHtml = await uploadResponse.text();
  assert.match(uploadHtml, /Priority channels/);
  assert.doesNotMatch(uploadHtml, /Geographic scope|Communication objective/);

  const resultsResponse = await render("/results");
  const resultsHtml = await resultsResponse.text();
  assert.match(resultsHtml, /Communication mode/);
  assert.match(resultsHtml, /Policy Communication/);
  assert.match(resultsHtml, /Public Communication/);
  assert.match(resultsHtml, /Media Communication/);
  assert.match(resultsHtml, /GenderSnapshot2025\.pdf/);
  assert.match(resultsHtml, /This is a portfolio demonstration using a public report\. Outputs are illustrative and require human review\./);
  assert.match(resultsHtml, /Communication relevance/);
  assert.doesNotMatch(resultsHtml, /<iframe\b/i);
  assert.match(resultsHtml, /This brief identifies the report’s main themes, key findings and verifiable evidence, then translates them into audience-focused communication messages and materials\./);
  assert.match(resultsHtml, /Main Themes/);
  assert.match(resultsHtml, /Verified Evidence/);
  assert.match(resultsHtml, /aria-controls="analysis-scope-panel"/);
  assert.doesNotMatch(resultsHtml, /Public Engagement/);
});

test("returns simulated results from PDF metadata without uploading file contents", async () => {
  const response = await render("/api/analyze", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fileName: "public-report.pdf",
      fileSize: 2 * 1024 * 1024,
      fileType: "application/pdf",
      language: "en",
      channels: ["LinkedIn", "X"],
      estimatedPages: 64,
    }),
  });

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/i);
  const brief = await response.json();
  assert.equal(brief.mode, "demo");
  assert.equal(brief.communicationMode, "awareness");
  assert.equal(brief.sourceFile, "public-report.pdf");
  assert.ok(brief.executiveSummary);
  assert.equal(brief.analysisProfile.complexity, "medium");
  assert.equal(brief.analysisProfile.estimatedPages, 64);
  assert.ok(brief.analysisProfile.basis);
  assert.ok(brief.summarySections.reportOverview.topic && brief.summarySections.reportOverview.researchContext && brief.summarySections.reportOverview.coreQuestion);
  assert.equal(brief.summarySections.mainThemes.length, 4);
  assert.equal(brief.summarySections.keyFindings.length, 4);
  assert.equal(brief.summarySections.evidenceAreas.length, 3);
  assert.ok(brief.summarySections.communicationGuidance.public && brief.summarySections.communicationGuidance.policy && brief.summarySections.communicationGuidance.media);
  assert.ok(brief.summarySections.communicationGuidance.emphasize && brief.summarySections.communicationGuidance.avoid);
  assert.ok(brief.summarySections.keyFindings.every((item) => item.title && item.detail && item.page));
  assert.equal(brief.keyMessages.length, 5);
  assert.ok(brief.keyMessages.every((item) => item.title && item.whyItMatters && item.evidence && item.page && item.relevantData && item.audience && item.communicationAngle));
  assert.ok(brief.audiences.every((item) => item.name && item.priority && item.needs && item.approach && item.channels));
  assert.deepEqual(brief.socialPosts.map((item) => item.platform), ["LinkedIn", "X", "Instagram"]);
  assert.ok(brief.socialPosts.every((item) => item.post && item.hashtags.length >= 2 && item.communicationPurpose && item.targetAudience));
  assert.ok(brief.socialPosts.every((item) => item.hashtags.some((hashtag) => /SDG8/i.test(hashtag))));
  assert.ok(brief.socialPosts.find((item) => item.platform === "X").hashtags.length < brief.socialPosts.find((item) => item.platform === "Instagram").hashtags.length);
  assert.ok(brief.communicationMaterial.objective);
  assert.ok(brief.communicationMaterial.targetAudience);
  assert.ok(brief.communicationMaterial.keyMessage);
  assert.ok(brief.communicationMaterial.suggestedCopy);
  assert.ok(brief.communicationMaterial.recommendedChannels);
  assert.ok(brief.communicationMaterial.callToAction);
  assert.ok(brief.communicationMaterial.hashtags.length >= 2);
  assert.ok(brief.evidence.every((item) => item.directEvidence && item.communicationInsight));
  assert.ok(brief.evidence.every((item) => item.suggestedUse.targetAudience && item.suggestedUse.recommendedFraming && item.suggestedUse.channel));
});

test("adapts evidence coverage and message count to estimated report length", async () => {
  const cases = [
    [12, "short", 3],
    [140, "long", 7],
  ];

  for (const [estimatedPages, complexity, messageCount] of cases) {
    const response = await render("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fileName: "public-report.pdf", fileSize: 1024, fileType: "application/pdf", language: "en", estimatedPages }),
    });
    assert.equal(response.status, 200);
    const brief = await response.json();
    assert.equal(brief.analysisProfile.complexity, complexity);
    assert.equal(brief.keyMessages.length, messageCount);
    assert.ok(brief.keyMessages.every((item) => item.page && item.evidence));
  }
});

test("returns a friendly JSON error when PDF metadata exceeds the MVP limit", async () => {
  const response = await render("/api/analyze", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fileName: "large-report.pdf",
      fileSize: 13 * 1024 * 1024,
      fileType: "application/pdf",
    }),
  });

  assert.equal(response.status, 413);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/i);
  const payload = await response.json();
  assert.equal(payload.code, "FILE_TOO_LARGE");
  assert.match(payload.error, /12 MB/);
});

test("localizes simulated analysis content in French and Chinese", async () => {
  const cases = [
    ["fr", "Note de communication simulée", /Les jeunes ont besoin/],
    ["zh", "模拟传播简报", /青年需要/],
  ];

  for (const [language, title, messagePattern] of cases) {
    const response = await render("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fileName: "public-report.pdf", fileSize: 1024, fileType: "application/pdf", language }),
    });
    assert.equal(response.status, 200);
    const brief = await response.json();
    assert.equal(brief.title, title);
    assert.match(brief.keyMessages[0].title, messagePattern);
  }
});
