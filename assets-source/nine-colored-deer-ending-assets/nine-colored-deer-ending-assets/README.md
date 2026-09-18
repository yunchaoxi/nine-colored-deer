# Nine-Colored Deer — Ending Asset Pack

All character and effect assets are PNGs with true alpha transparency. The final sky is an opaque background.

## 00_CHARACTER

- `traveller-herbalist-source-sheet.png` — locked character design and palette reference.
- `traveller-herbalist-drowning.png` — replacement for the original rescued traveller.
- `traveller-herbalist-thanking.png` — standing, hands joined in thanks.
- `traveller-herbalist-pointing.png` — betrayal / guiding the royal party.
- `traveller-herbalist-falling.png` — falling into the deep pool; animate behind the water layer.

## 01_REVELATION

Recommended layer order, back to front:

1. Existing chapter background
2. `divine-light-halo.png`
3. Existing standing Nine-Colored Deer
4. `arrow-volley.png`
5. `arrows-to-ash.png`

Scroll sequence: arrow volley approaches → halo scales from 0.86 to 1 and brightens → volley fades → ash layer fades in and drifts upward.

## 02_AWAKENING

- `king-and-soldiers-weapons-lowered.png` — shame / cease-fire / withdrawal group.

Animate the group 4–8vw away from the deer while reducing opacity slightly. Do not mirror the group if that makes the lowered weapons face toward the deer.

## 03_BETRAYAL_POOL

Recommended layer order:

1. Dark pool background
2. `traveller-herbalist-falling.png`
3. `deep-pool-foreground-waves.png`

Move the traveller down and rotate 6–10 degrees; the foreground water should mask the torso, then the head. A separate sprite is unnecessary for sinking.

## 04_ASCENT

Recommended layer order:

1. `crimson-gold-sky-background.png`
2. `nine-colored-deer-ascending.png`
3. `crimson-gold-clouds-foreground.png`

Move the deer diagonally upward 22–30vh, scale 1 to 0.82, and slowly fade near the end. Move foreground clouds faster than the sky for parallax.

## Technical notes

- Keep the PNGs uncompressed during development; convert to WebP/AVIF only in the build pipeline.
- Apply `pointer-events: none` and `will-change: transform, opacity` to animated art layers.
- Drive all animations from normalized section scroll progress so reversing the scroll reverses the animation cleanly.
- The source sheet is reference material; do not place it in the finished page.
