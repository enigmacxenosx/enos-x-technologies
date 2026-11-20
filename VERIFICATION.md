# Verification log — ENOSX cinematic site

## Live endpoints (dev server on port 3000, reached through the Preview proxy origin)

All page routes return `200 text/html`. `/manus-routes.json` returns `200 application/json`;
`/robots.txt`, `/sitemap.xml`, `/media/*.mp4` (`video/mp4`), `/avatars/*.jpg`, `/brand/*` and both
favicons return 200.

## Real video playback (Chromium, `browser_console_exec` on the Preview origin)

Home at 1280 viewport, dpr 1, `prefers-reduced-motion: reduce` = false:

- 4 `<video>` reel layers present, 0 image fallbacks.
- On load: `hero-1080.mp4` — `paused:false`, `currentTime 8.41s`, `readyState 4`, decoded
  1920×1080. The three off-screen reels — `paused:true`, `t:0`, `readyState:0`, `preload:none`
  (no decode cost outside the frame).
- After scrolling the ENOSX Core band into view: `host.dataset.state === "live"`,
  `chapter-core.mp4` — `paused:false`, `t:1.7s`, `readyState 4`, width 1920 — while
  `hero-1080.mp4` flipped to `paused:true`.

Conclusion: the backgrounds are encoded video that starts and stops with the scroll, not stills.

## 4K path

`client/src/components/cinema/Reel.tsx` emits
`<source media="(min-width: 1600px)" src="/media/hero-2160.mp4">` plus the 1080p source. The
3840×2160 master was probed: `width,height,nb_frames = 3840,2160,242`. On a 1280px viewport the
browser correctly selected `hero-1080.mp4` in `currentSrc`, which is the intended width/DPR gating.

## Backend (tRPC over `/api/trpc`, dot-notation paths, superjson envelopes)

- `site.signals` → `{enquiries, signups, accountEvents, byAccount[], ready:true}`; values are live
  database counts, and the endpoint returns `ready:false` when no `DATABASE_URL` is present rather
  than inventing numbers.
- `site.enquiry` (human payload) → `{ok:true, reference:"ENX-TPJ9-MRH", routedTo:"enosxtech@gmail.com"}`.
- `site.enquiry` with the `website` honeypot filled → silent fake success
  (`reference:"ENX-0000-000"`), nothing stored.
- `site.enquiry` invalid → zod issues ("Please give us a name to reply to", email/message limits).
- Rate limit: 6 accepted, then `TOO_MANY_REQUESTS` ("…or use the WhatsApp line") in the 10-minute window.
- `site.newsletter` → `{ok:true, already:false}`, then `{ok:true, already:true}` on repeat
  (case-insensitive unique email, dedupe pre-check plus duplicate detection through the driver
  error and its `cause`).
- `site.accountEvent` → `{ok:true}` for registered account keys only; a bogus key is rejected by the enum.
- `admin.*` unauthenticated → `403 FORBIDDEN` ("You do not have required permission"), so `/admin` is gated.
- All test rows were deleted afterwards and `AUTO_INCREMENT` reset; `site.signals` now reports
  `enquiries:0, signups:0, accountEvents:0` so the public counters start honest at zero.

## UI form run

Filled name, email, organisation, channel = WhatsApp, desk = Partnership, message → the routing
preview updated live to `→ hello@enosx.tech` → submit rendered
"Logged as ENX-M2ZM-RQC · routed to hello@enosx.tech" with
`mailto:hello@enosx.tech?subject=ENQUIRY%20ENX-M2ZM-RQC` and a WhatsApp follow-up link.

This run exposed one real defect: a `select` value that was not a known topic crashed
`TOPIC_COPY[f.topic].routesTo`. Fixed with a `topicOf()` fallback plus submit-time normalisation,
then re-verified.

## Screenshot passes (`webdev.take_screenshot`)

- Desktop 1440×900 first pass — `/home/ubuntu/.addon-screenshots/wdp_4d837d3d666d89036f3a836e/20261120-201905-hMNciQ/`
  Findings: reversed headlines missing on ink-graded page openers (added `.on-media`); chapter-rail
  labels overlapping the hero headline (labels now hover-only).
- Desktop second pass — `.../20261120-202045-xeOwZQ/` (About, Admin, 404, Products): headlines read correctly.
- Mobile 390×844 first pass — `.../20261120-202116-EKo6gw/`
  Findings: header CTA overlapping the wordmark and body copy clipped at the viewport edge, caused
  by unlayered custom CSS outranking Tailwind utilities, and by `aspect-ratio` + `min-height`
  forcing a wider-than-viewport reel column.
- Fix: every custom class moved into `@layer components` in `client/src/index.css`; `.reel-box`
  `min-height` applies from 768px up only.
- Mobile re-check — `.../20261120-202314--Cc_7w/`: header collapses to mark + wordmark + MENU, no clipping.

Capture caveat: these shots freeze entrance animations and force low-opacity elements opaque, so
they verify layout, not motion.

## Checks

`pnpm check` (tsc --noEmit) clean. `pnpm build` clean — CSS 111 kB, JS 602 kB; rollup warnings were
chunk-size and a zod annotation only. `pnpm db:push` generated
`drizzle/0001_needy_rocket_racer.sql` (`enquiries`, `newsletter_signups`, `account_events`) and
`pnpm db:migrate` applied it. Total media payload ≈18 MB, each file far below the 30 MiB limit.
