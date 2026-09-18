# Nine-Colored Deer — Core Visual Asset Kit

Original AI-assisted assets for a scroll-based portfolio website inspired by the Nine-Colored Deer story and Dunhuang mural aesthetics.

## Files and intended layers

### Newly added animation sources

- `01_DEER_RIG/deer-rig-source-sheet-transparent.png`
  - Transparent production sheet containing the torso, head/neck, antlers, ears, four legs, tail and two ribbon layers.
  - Joint ends include concealed overlap areas for rotation.
  - Codex should crop/export the separated pieces into individual files before animating them.

- `05_ENDING/deer-color.png`
  - Original full-color deer used as the start state of the ending transition.

- `05_ENDING/deer-faded-mural-transparent.png`
  - Faded mural treatment derived from the same deer identity and pose.
  - Use an opacity crossfade plus a pigment-erosion mask; allow minor registration adjustment during implementation.

- `03_RESCUE/traveller-water-rig-source-sheet.png`
  - Traveller head, torso, arm/sleeve pieces, backpack, three water bands and splash pieces.
  - Export the disconnected items as individual transparent PNGs before assembly.

- `03_RESCUE/deer-entering-water-transparent.png`
  - Forward-leaning rescue pose designed to sit behind the middle and front water bands.

- `04_PROCESSION/procession-rig-source-sheet.png`
  - Pointing traveller, seated king, horse, guards, archer, flags, garment ribbons, weapons and dust layer.
  - Keep the complete original procession as a mobile/reduced-motion fallback.

- `02_LANDSCAPE/foreground-occlusion-transparent.png`
  - Fastest parallax layer for the bottom and outer edges of the viewport.

- `00_GLOBAL/gold-clouds-source-sheet.png`
  - Six disconnected decorative cloud/wind motifs for slow drifting movement.

- `05_ENDING/cave-wall-background.png`
  - Final full-screen wall behind the faded deer.

- `05_ENDING/cracks-erosion-overlay-transparent.png`
  - Transparent damage layer that can also drive an opacity mask for the transition.

1. `01-nine-colored-deer-transparent.png`
   - Primary hero character.
   - Use in the opening, rescue, promise and judgment sections.
   - Animate with slow horizontal movement, subtle scale and small pointer-based parallax.

2. `02-silk-road-panorama-background.png`
   - Full-width far background.
   - Use with `object-fit: cover`; keep movement slowest of all layers.
   - The open sky is reserved for headings and chapter text.

3. `03-riverbank-midground-transparent.png`
   - Transparent middle/foreground landscape strip.
   - Place across the lower part of the viewport, in front of the panorama.
   - Move slightly faster than the far background.

4. `04-royal-procession-transparent.png`
   - Character layer for the Betrayal and Judgment chapters.
   - Enter from the right while the deer occupies the opposite side.

5. `05-traveller-rescue-transparent.png`
   - Narrative layer for the Rescue chapter.
   - Combine with the riverbank strip; reveal using a clip-path or vertical translation.

## Recommended layer order

1. Solid indigo page background
2. Silk Road panorama
3. Oversized chapter number and text
4. Royal procession or traveller
5. Nine-Colored Deer
6. Riverbank midground/foreground
7. Texture overlay and navigation

## Suggested palette

- Indigo: `#173B66`
- Cinnabar: `#C84A32`
- Turquoise: `#4F8B78`
- Mineral gold: `#D2A348`
- Sand: `#E9D4AD`
- Ink: `#171512`
- Warm ivory: `#F6F0E5`

## Implementation note for Codex

Preserve the original files and create optimized WebP/AVIF derivatives for the website. Keep the PNG versions for transparent layers. Use natural browser scrolling with GSAP ScrollTrigger or an equivalent lightweight technique. Do not flatten the assets into one image: keep them as independent layers so the parallax depth remains visible.

For the rig source sheet, export each disconnected component to its own transparent canvas. Assemble the deer in the browser with absolutely positioned layers and set explicit transform origins at the neck, shoulder, hip, ear, tail and ribbon attachment points. Keep the complete deer image as a non-animated fallback for small screens and reduced-motion mode.

For the rescue scene, layer in this order: rear water, traveller torso, articulated arms/sleeves, deer rescue pose, middle water, front water, splashes. For the procession scene, animate flag cloth and garment ribbons independently while keeping body motion subtle. For the ending, crossfade the colored and faded deer while revealing the crack/erosion overlay with an animated mask.
