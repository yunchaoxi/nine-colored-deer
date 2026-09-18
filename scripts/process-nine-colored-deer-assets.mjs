import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("assets-source/nine-colored-deer-assets");
const endingRoot = path.resolve("assets-source/nine-colored-deer-ending-assets/nine-colored-deer-ending-assets");
const output = path.resolve("public/assets/nine-colored-deer");

await fs.mkdir(output, { recursive: true });

const verbatimAssetGroups = [
  {
    directory: "betrayal",
    files: [
      "01-deer-symbol-transparent.png",
      "02-traveller-hand-transparent.png",
      "03-promise-cord-intact-transparent.png",
      "04-promise-cord-left-broken-transparent.png",
      "05-promise-cord-right-broken-transparent.png",
      "06-gold-fragments-transparent.png",
      "04-royal-procession-user-v2.png",
    ],
  },
];

for (const group of verbatimAssetGroups) {
  const destination = path.join(output, group.directory);
  await fs.mkdir(destination, { recursive: true });
  for (const file of group.files) {
    await fs.copyFile(path.join(root, "04_BETRAYAL", file), path.join(destination, file));
  }
}

const endingAssetFiles = [
  ["00_CHARACTER", "traveller-herbalist-drowning.png"],
  ["00_CHARACTER", "traveller-herbalist-pointing.png"],
  ["00_CHARACTER", "traveller-herbalist-thanking.png"],
  ["00_CHARACTER", "traveller-herbalist-source-sheet.png"],
  ["01_REVELATION", "arrow-volley.png"],
  ["01_REVELATION", "arrows-to-ash.png"],
  ["01_REVELATION", "divine-light-halo.png"],
  ["02_AWAKENING", "king-and-soldiers-weapons-lowered.png"],
  ["03_BETRAYAL_POOL", "traveller-herbalist-falling.png"],
  ["03_BETRAYAL_POOL", "deep-pool-foreground-waves.png"],
  ["03_BETRAYAL_POOL", "price-water-background.png"],
  ["03_BETRAYAL_POOL", "plunging-traveller.png"],
  ["03_BETRAYAL_POOL", "splash-impact-tall.png"],
  ["03_BETRAYAL_POOL", "splash-foreground-wide.png"],
  ["04_ASCENT", "crimson-gold-clouds-foreground.png"],
  ["04_ASCENT", "crimson-gold-sky-background.png"],
  ["04_ASCENT", "nine-colored-deer-ascending.png"],
];

const endingOutput = path.join(output, "ending");
await fs.mkdir(endingOutput, { recursive: true });
for (const [directory, file] of endingAssetFiles) {
  await fs.copyFile(path.join(endingRoot, directory, file), path.join(endingOutput, file));
}

function keepLargestComponents(data, width, height, count = 1) {
  const pixels = width * height;
  const visited = new Uint8Array(pixels);
  const queue = new Int32Array(pixels);
  const components = [];

  for (let start = 0; start < pixels; start += 1) {
    if (visited[start] || data[start * 4 + 3] === 0) continue;
    let head = 0;
    let tail = 1;
    queue[0] = start;
    visited[start] = 1;
    const points = [];

    while (head < tail) {
      const index = queue[head++];
      points.push(index);
      const x = index % width;
      const y = Math.floor(index / width);
      const neighbors = [
        x > 0 ? index - 1 : -1,
        x < width - 1 ? index + 1 : -1,
        y > 0 ? index - width : -1,
        y < height - 1 ? index + width : -1,
      ];
      for (const next of neighbors) {
        if (next >= 0 && !visited[next] && data[next * 4 + 3] > 0) {
          visited[next] = 1;
          queue[tail++] = next;
        }
      }
    }
    if (points.length > 12) components.push(points);
  }

  components.sort((a, b) => b.length - a.length);
  const keep = new Uint8Array(pixels);
  for (const component of components.slice(0, count)) {
    for (const index of component) keep[index] = 1;
  }
  for (let index = 0; index < pixels; index += 1) {
    if (!keep[index]) {
      const offset = index * 4;
      data[offset] = 0;
      data[offset + 1] = 0;
      data[offset + 2] = 0;
      data[offset + 3] = 0;
    }
  }
  return data;
}

const responsiveAssets = [
  ["03_RESCUE/deer-entering-water-transparent.png", "rescue-deer", [640, 960, 1194]],
  ["03_PROMISE/traveller-bowing-transparent.png", "promise-traveller", [480, 768, 1024]],
  ["02_LANDSCAPE/foreground-occlusion-transparent.png", "foreground", [1080, 1600, 2172]],
  ["05_ENDING/cave-wall-background.png", "cave-wall", [1000, 1672]],
  ["05_ENDING/cracks-erosion-overlay-transparent.png", "erosion", [1000, 1672]],
  ["05_ENDING/deer-faded-mural-transparent.png", "deer-faded", [640, 960, 1145]],
];

for (const [source, name, widths] of responsiveAssets) {
  for (const width of widths) {
    await sharp(path.join(root, source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 92, smartSubsample: true })
      .toFile(path.join(output, `${name}-${width}.webp`));
  }
}

const cropGroups = [
  {
    source: "01_DEER_RIG/deer-rig-source-sheet-transparent.png",
    prefix: "rig-deer",
    crops: [
      ["ribbon-gold", 0, 20, 535, 220],
      ["antlers", 510, 0, 635, 245],
      ["ribbon-color", 0, 230, 755, 230],
      ["ear-left", 630, 365, 130, 165],
      ["ear-right", 755, 365, 140, 175],
      ["head-neck", 860, 190, 285, 610],
      ["tail", 0, 370, 210, 325],
      ["body", 85, 485, 800, 400],
      ["leg-back", 0, 835, 365, 539],
      ["leg-mid-back", 370, 835, 305, 539],
      ["leg-mid-front", 655, 835, 300, 539],
      ["leg-front", 950, 820, 195, 554],
    ],
  },
  {
    source: "04_PROCESSION/procession-rig-source-sheet.png",
    prefix: "rig-procession",
    crops: [
      ["traveller", 0, 175, 340, 545],
      ["king", 330, 100, 325, 585],
      ["horse", 580, 205, 575, 520],
      ["ribbons", 570, 0, 705, 215, 3],
      ["flag-red", 1265, 0, 330, 215],
      ["flag-blue", 1590, 0, 352, 215],
      ["guard-red", 1080, 205, 235, 520],
      ["archer", 1275, 210, 240, 515],
      ["guard-blue", 1495, 205, 245, 520],
      ["guard-right", 1715, 205, 227, 520],
      ["dust", 0, 690, 1942, 119],
    ],
  },
  {
    source: "00_GLOBAL/gold-clouds-source-sheet.png",
    prefix: "cloud",
    crops: [
      ["one", 0, 0, 1010, 260],
      ["two", 1040, 0, 959, 270],
      ["three", 0, 245, 1010, 255],
      ["four", 990, 245, 1009, 260],
      ["five", 0, 490, 1040, 296],
      ["six", 990, 485, 1009, 301],
    ],
  },
];

const manifest = {};

for (const group of cropGroups) {
  const input = path.join(root, group.source);
  manifest[group.prefix] = [];
  for (const [name, left, top, width, height, keepCount = 1] of group.crops) {
    const filename = `${group.prefix}-${name}.webp`;
    const { data, info } = await sharp(input)
      .extract({ left, top, width, height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    keepLargestComponents(data, info.width, info.height, keepCount);
    await sharp(data, { raw: info })
      .webp({ quality: 88, alphaQuality: 94, smartSubsample: true })
      .toFile(path.join(output, filename));
    manifest[group.prefix].push({ name, filename, left, top, width, height });
  }
}

await fs.writeFile(path.join(output, "rig-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Processed ${responsiveAssets.length} responsive assets, ${cropGroups.reduce((sum, group) => sum + group.crops.length, 0)} rig pieces and ${verbatimAssetGroups.reduce((sum, group) => sum + group.files.length, 0) + endingAssetFiles.length} verbatim story layers.`);
