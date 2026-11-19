# Enos X Technologies — Cinematic Promotional Landing Page

## Direction
- Dark, NVIDIA-style base (near-black with a deep olive/green tint), one sharp accent color (electric lime), flat solid surfaces — no glassmorphism, no blur, no purple gradients.
- Meta "About"-style cinematic storytelling: full-bleed image sections, huge confident headlines, slow scroll-driven reveals, generous whitespace, alternating image/text chapters.
- Typography: bold geometric display font (e.g. "Space Grotesk"/"Archivo") + clean body font; tight tracking, large scale.
- Subtle animated constellation/node network behind the hero (canvas, low opacity) echoing the reference.

## Pages (separate routes)
- `/` Home: hero ("Building the technology of tomorrow"), featured product banner card, "What we build" two-column lists (Solutions / Services) like the reference cards, cinematic full-bleed chapters (Vision, Innovation, Impact), stats strip, CTA.
- `/about` Mission, story timeline, values — Meta About style.
- `/solutions` Product/service grid with detail rows.
- `/contact` Simple contact form (front-end only, toast on submit).
- Shared header (logo wordmark "ENOS X", nav, search pill, CTA) and large footer in root layout.

## Imagery
- Generate cinematic, photographic (not illustrated) images: data center, engineers at work, city at night, hardware close-ups, people using tech.

## Technical details
- Tokens in `src/styles.css` (oklch), fonts via `<link>` in `__root.tsx`, framer-motion style reveals via IntersectionObserver/CSS.
- Unique head() metadata per route; replace placeholder index.
- Placeholder copy written by me; can be swapped for real company info later.
