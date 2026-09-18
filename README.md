# The Nine-Colored Deer

**A Promise in the Desert** is a single-page interactive portfolio experience inspired by the Nine-Colored Deer story depicted in the murals of Dunhuang.

The project translates an ancient moral tale into a contemporary editorial website for an international audience. Its visual language pairs weathered mineral-pigment artwork with bold typography, cinematic pacing and restrained scroll-based motion. It is an independent interpretation, not a reproduction of a specific mural or museum object.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build with:

```bash
npm run build
npm start
```

The existing pnpm workflow remains supported (`pnpm install`, `pnpm dev`, `pnpm build`).

## Design and interaction

- Nine numbered scenes run from 00 Opening through 08 Ascent, moving from encounter, rescue and promise to betrayal, revelation, awakening, consequence and transcendence.
- Supplied artwork remains separated into deer, traveller, river landscape, desert and royal-procession layers. It is never flattened into one page background.
- GSAP and ScrollTrigger control native-scroll-linked camera pull-backs, cross-screen travel, mask reveals, the promise seal, the arrow-to-ash revelation, weapon lowering, layered submersion and the final ascent.
- One consistent South Asian herb gatherer design is used for the drowning, thanking, pointing and falling poses.
- The deer keeps its complete painted silhouette in the hero scenes; separated rig pieces are reserved for secondary details and the staged royal procession, avoiding visible collage seams.
- Pointer depth is deliberately subtle. There is no inertial-scroll takeover.
- Mobile layouts reduce layer travel and simplify the chapter navigation to a top progress rail.
- `prefers-reduced-motion` disables scroll-linked transforms and smooth scrolling while preserving the complete story.

## Visual assets

The supplied source packages are preserved under `assets-source/nine-colored-deer-assets/` and `assets-source/nine-colored-deer-ending-assets/`. Responsive WebP variants, rig pieces and the transparent ending PNG layers live in `public/assets/nine-colored-deer/`. Important narrative images include descriptive alt text; repeated decorative layers are hidden from assistive technology. Non-opening images use native lazy loading and async decoding.

Rebuild all responsive and articulated assets with:

```bash
npm run assets:build
```

The asset pipeline extracts the deer body, head, antlers, legs, tail and ribbons; the procession characters, flags and dust; the decorative cloud motifs; and copies the supplied transparent continuation layers without flattening them. The Rescue, Promise, Betrayal and Price scenes use matching herb-gatherer poses from the same character sheet.

The continuation package did not include every filename listed in the production brief. The implementation therefore derives these states from supplied matching layers: front/back arrow volleys reuse `arrow-volley.png`; sinking reuses the consistent falling pose behind the foreground water; back/middle clouds reuse the supplied cloud artwork at different depth, scale and opacity; tears, ripples, ash drift and the protective boundary are separate CSS/GSAP effect layers. No unrelated stock or placeholder artwork is inserted.

For a final production release, consider replacing or refining:

1. the rectangular desert panorama with hand-separated mountain and river layers for even deeper parallax;
2. dedicated `traveller-herbalist-sinking.png`, independent herb leaves, rear/middle pool layers and separate back/middle cloud exports if art production continues;
3. the generated source artwork with commissioned or fully documented rights-cleared artwork if the project is used commercially.

## Technology

- Next.js 16, React 19 and TypeScript
- GSAP 3 with ScrollTrigger
- Structured global CSS with responsive breakpoints
- Sharp-generated WebP source sets

## Portfolio capabilities demonstrated

- Visual storytelling and interactive web design
- Information structuring and scroll-based animation
- AI-assisted visual production with reusable asset components
- Responsive design and reduced-motion accessibility
- Cross-cultural communication for an international audience

## Primary files

```text
app/page.tsx                         Page entry
app/globals.css                      Art direction and responsive layout
components/story-experience.tsx      Story structure and animation system
scripts/process-nine-colored-deer-assets.mjs  Repeatable asset-processing pipeline
assets-source/nine-colored-deer-assets/       Preserved source artwork
assets-source/nine-colored-deer-ending-assets/ Continuation source artwork
public/assets/nine-colored-deer/     Responsive WebP artwork
```
