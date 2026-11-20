# TODO — ENOSX Technologies cinematic promotional website

Facts come from the user's own repositories (`enosxai`, `Enosx-X-enosxai`, `Exboot`,
`Enosh-browser`, `enosh-blog`, `enos-x-technologies`, `enigmacxenosx`). No invented metrics.

Status: all five outcome groups delivered. Evidence is in [`VERIFICATION.md`](VERIFICATION.md).

**Follow-up delivered on request:** "use people to create the video" — every reel now carries
people (studio team, pair programmers, rack-aisle technician, Nairobi pavement, shop counter,
five-person group shot), with the hero rebuilt as a six-shot documentary montage. See §1.

## 1. Cinematic video layers (real encoded video, not pictures) — **complete**

Chromium proof on the live Preview origin: hero `readyState 4`, `currentTime 8.41s`, 1920×1080
decoding; off-screen reels `paused:true, t:0, readyState:0, preload:none`; scrolling the Core band
into frame set `data-state="live"` and started `chapter-core.mp4` while pausing the hero.

- **People, not props (follow-up request, complete).** Seven documentary frames of people at work
  replaced the logo plate and the empty-room stills. Live console read after the swap:
  `hero-1080.mp4` `paused:false, t 10.77s, readyState 4, 1920×1080, duration 12.5s`, while
  `chapter-core`, `chapter-nairobi` and `signal-loop` stayed `paused:true, t:0, readyState:0`
  with `preload="none"`; scrolling made `chapter-core.mp4` then `chapter-nairobi.mp4` go
  `data-state="live"` as the hero dropped back to `idle`. Loop seam measured 1.38/255 (hero) and
  1.31/255 (chapters) by diffing the first and last decoded frames.
- A new text-to-video clip could not be requested for this pass: the free plan allows one
  `generate_video` per request/day and that allowance had already been spent on the original hero.
  The hero is a genuine encoded montage (ffmpeg), not a still pretending to move.
- Every "cinematic" background is an actual `<video>` element with encoded files served from
  `client/public/media/` — no image-only stand-ins for the requested video look.
- Hero reel = AI-generated ENOSX brand clip (Seedance 2.0 Mini, 720p, exactly 5 s, single clip
  per this session's plan limit) built from a composited 16:9 logo plate used as first AND last
  keyframe so the loop is seamless; upscaled with ffmpeg to 3840x2160, de-noised, film grain,
  `+faststart`, poster frame. Served through `<source media="(min-width: 1600px)">` with a
  1920×1080 companion for smaller screens.
- Chapter reels (Nairobi, studio, data centre, ENOSX Core product, commerce) rendered from the
  five generated stills through ffmpeg: slow push-in, light pass, vignette breathing, grain,
  identical first/last frame for seamless looping, 1920×1080 full HD (only the hero carries a
  3840×2160 stream), every file far under 30 MiB.
- Procedural "signal field" reel for the accounts band: nodes + proximity links + light sweep in
  Ink Navy/Azure/Teal on newsprint, rendered frame-by-frame in Python, encoded 1920×1080.
- Videos are `muted playsinline autoplay loop` with `preload` only for the hero; sections use
  IntersectionObserver to play/pause. `prefers-reduced-motion` / save-data / no-autoplay falls
  back to the poster frame with a static treatment.

## 2. Design constraints demanded by the user — **complete**

No `backdrop-filter` anywhere and no dark page ground in `client/src/index.css`; 4K master probed
at 3840×2160 and served through a `media="(min-width: 1600px)"` source query; desktop 1440×900 and
mobile 390×844 screenshot passes; the supplied logo is cut into a PNG size set (48–1024) plus
`.ico`/`apple-touch-icon` and appears full-bleed through the CSS `.overprint__mark` treatment
rather than a separate `.svg` file.

- Light editorial design: newsprint/paper grounds, Ink Navy `#012363` type, Azure `#00A2FD`,
  Teal `#00A9AB`. No page-wide dark theme.
- No glassmorphism anywhere: zero `backdrop-filter`, zero frosted/translucent panels, no
  neon glow, no purple gradients.
- Must not look AI-generated: hard-edged frames and hairline rules instead of uniform rounded
  cards, asymmetric editorial grid instead of a centred stack of three cards, film-slate
  metadata, spot-print overprint logo treatment, real photography for people.
- 4K/full-HD sharpness: logo cut from the supplied PNG at 48/96/180/192/256/384/512/1024 plus
  `.ico` and `apple-touch-icon`, fluid `clamp()` type including a 2160px tier,
  `.ico` and `apple-touch-icon`, fluid `clamp()` type with a dedicated `min-width: 2200px` tier,
  devicePixelRatio-aware reel source selection, dpr-independent hairlines, 4K hero video.
- Supplied logo (`/home/ubuntu/upload/enosx-logo-concept-c.png`) is the only brand mark; it is
  used as favicon and wordmark lockup.

## 3. Site content and pages — **complete**

Nine routes render HTTP 200 through Preview (`/`, `/about`, `/products`, `/core`, `/team`,
`/accounts`, `/contact`, `/admin`, plus the 404); every claim traced to `RESEARCH.md`.

- Meta-`about`-style chapter storytelling: huge declarative headlines, alternating full-bleed
  reels, scroll-linked chapter rail, "Catch up on the latest" style product band.
- Home: hero reel, mission statement, product dossier (ENOSX AI / ENOSX Core / Exboot /
  Enosx Browser / Enosx Tech Store / Enosh Blog), vision + impact chapters, accounts strip, CTA.
- `/products` dossier rows with real capability copy from each repo README.
- `/core` ENOSX AI deep-dive: three modes (ENOSX One, ENOSX Studio, ENOSX Nexus), attachments,
  media creation, voice, connectors, desktop shell, "Speed is UX" philosophy.
- `/team`: Enosh Yeswa (Founder & CEO), Grace Wangare (Product Design & User Research Lead),
  Tracey Ivyone (Growth, Marketing & Community Lead), Vince Odhiambo (Executive Assistant),
  Faith Adhiambo (Product & Operations Associate) using the real repo avatars, roles and
  "Primary ownership" wording from canonical `TEAM.md`, plus the operating cadence and values.
- `/about`: mission, story (founded Nairobi 2024, "latency is a design flaw"), values
  ("Build boldly. Ship honestly. Stay curious."), founder line
  ("Build with intention. Ship with courage. Keep learning.").
- `/accounts`: every documented ENOSX account with copy-to-clipboard — enosxtech@gmail.com
  (technology), enosxservices@gmail.com (services and reports), hello@enosx.tech,
  WhatsApp +254 798 303 978, Instagram engima_cx, GitHub `enigmacxenosx` and `Enosx-X`,
  ENOSX AI app, Enosx Tech Store, official properties, and the team roster's product accounts.
- `/contact` full-stack form; `/admin` owner-only view of submissions; per-route metadata,
  `manus-routes.json`, robots/sitemap, Open Graph.

## 4. Full-stack backend — **complete**

Migration `drizzle/0001_needy_rocket_racer.sql` generated and applied. API tests returned
`ENX-TPJ9-MRH`, silent honeypot success, `TOO_MANY_REQUESTS` after 6 sends per 10 min, duplicate
signup `already:true`, and `403 FORBIDDEN` for anonymous `admin.*`. The UI submit rendered
`ENX-M2ZM-RQC` and routed to `hello@enosx.tech`. All test rows deleted, so `site.signals`
reports zeros and the public counters start honest.

- `enquiries` table + tRPC mutation with zod validation, honeypot field, per-IP rate limiting,
  reference code returned to the user; never trusts the browser.
- `newsletter_signups` table + subscribe mutation with duplicate handling and an unsubscribe
  token.
- `account_events` table recording account-link clicks; `signals.summary` public query returning
  honest live counts only (no fabricated marketing numbers).
- `/admin` protected by the starter's real Manus OAuth session with `role === "admin"`;
  cookie options from `server/_core/cookies.ts` (`SameSite=None; Secure`) so Preview works;
  no simulated or bypassed login.
- Dockerfile publish config already set (`/api/health`, port 3000); keep build green.

## 5. Delivery — **complete**

Dev server declared through `runtime/dev-commands` and serving Preview; screenshot passes done
(including the re-check after the mobile overflow and chapter-rail fixes); `README.md` and
`VERIFICATION.md` written for the repo; Manus checkpoint pushed to `origin/main` and the finished
tree handed to `github.com/enigmacxenosx/enos-x-technologies` with the previous Lovable build
preserved on `archive/lovable-cinematic-v1`. No token or secret committed.

- Dev server declared through `webdev.config PUT runtime/dev-commands` on the project port.
- Screenshot pass (desktop + mobile) to confirm light, non-glass, video-backed rendering.
- Commit + push to `origin/main` (Manus checkpoint), then push the finished tree to the user's
  GitHub `enigmacxenosx/enos-x-technologies`, preserving the earlier Lovable build on
  `archive/lovable-cinematic-v1`.
- Never commit any token/secret; strip embedded credentials from cloned remotes.
