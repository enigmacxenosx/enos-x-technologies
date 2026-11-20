# ENOSX Technologies — Cinematic Promotional Website

Full-stack promotional site for **Enosx Technologies** (Nairobi, Kenya). Meta-`about`-style
cinematic storytelling driven by **real encoded video files** as section backgrounds, on a
**light editorial** canvas. No glassmorphism. No dark theme. No generic AI styling.

Delivered and verified: see [`TODO.md`](TODO.md) for the outcome list and
[`VERIFICATION.md`](VERIFICATION.md) for the evidence (video decode checks, API behaviour,
responsive passes). Two deviations from the sketch below, both recorded here so the plan matches
the code: media ships as MP4 only (`client/public/media/*.mp4` + JPEG posters — no WebM
variants), and the accounts "signal field" reel is an offline ffmpeg render instead of a live
`<canvas>`.

## 1. Source of truth (from the user's repos)

| Fact | Value | Repo |
| --- | --- | --- |
| Company | Enosx Technologies (ENOSX), Nairobi, Kenya, founded 2024, © 2024–2026 | `enosxai/const.ts`, `Exboot/README.md` |
| Mission | "Make software feel instant by building multimodal AI assistants and commerce experiences that work with the operating environment, not beside it." | `enosxai/const.ts` |
| Vision | "Redefine the boundary between Human and OS" | `ENOSX_AI_Identity_Plan.md` |
| Philosophy | "Speed is UX. Every interaction should be quicker than the thought that started it." | `enosxai/const.ts` |
| Story | "Founded in Nairobi, Kenya in 2024 … latency is a design flaw." | `enosxai/const.ts` |
| Values | "Build boldly. Ship honestly. Stay curious." | `enos-x-technologies/src/routes/about.tsx` |
| Founder line | "Build with intention. Ship with courage. Keep learning." | `enigmacxenosx/README.md` |
| Team | Enosh Yeswa (Founder & CEO), Grace Wangare (Product Design & User Research Lead), Tracey Ivyone (Growth, Marketing & Community Lead), Vince Odhiambo (Executive Assistant), Faith Adhiambo (Product & Operations Associate) | canonical `TEAM.md` + `enos-x-technologies/src/data/team.ts` |
| Products | ENOSX AI, ENOSX Core, Exboot, Enosx Browser, Enosx Tech Store, Enosh Blog | `enosxai`, `Exboot`, `Enosh-browser`, `enosx-kenya-commerce`, `enosh-blog` |
| Accounts | enosxtech@gmail.com, enosxservices@gmail.com, hello@enosx.tech, WhatsApp +254 798 303 978, Instagram engima_cx, github.com/enigmacxenosx, github.com/Enosx-X, enosx.tech, enosx.ai, enosxai.vercel.app, enosxtech-hub.vercel.app | profile README, `const.ts`, `package.json` author |

Numbers used on the site are only facts that exist in the repositories (founded 2024, 3 AI
modes, 6 portfolio products, 8 interface languages, © 2024–2026). No invented traction metrics.
Live counts (enquiries, subscribers) come from the database.

## 2. Implementation approach

**Stack (Manus-managed web-db-user starter):** React 19 + Wouter routing + Tailwind v4
frontend, Express + tRPC + Drizzle(MySQL) backend, managed database, Dockerfile publish with
`/api/health`.

- **Frontend:** `client/src/pages/{Home,Products,Core,Team,Accounts,About,Contact}.tsx`,
  shared cinematic primitives in `client/src/components/cinema/`, content data in
  `client/src/data/`.
- **Backend:** new tables `enquiries`, `newsletterSignups`, `accountEvents` in
  `drizzle/schema.ts`; queries in `server/db.ts`; tRPC routers `enquiry`, `newsletter`,
  `signals`, `admin` in `server/routers.ts`; a rate-limited honeypot-protected write path.
  Read-only public stats via `signals.summary`.
- **Admin:** `/admin` lists enquiries + subscribers, gated by the starter's Manus OAuth
  session and `role === "admin"` (the owner is already promoted in `server/db.ts upsertUser`).
  Cookie options come from `server/_core/cookies.ts` so Preview iframe sessions work.
- **Video pipeline (the core requirement):** every "cinematic background" is a real
  `<video autoplay muted loop playsinline>` element sourced from encoded files in
  `client/public/media/` (H.264 MP4 + VP9 WebM + `poster` JPEG, `<30 MiB each, no CDN).
  1. `generate_image` supplies five 16:9 photographic frames.
  2. `ffmpeg` turns each frame into a genuine motion clip: slow push-in (`zoompan`),
     drifting light pass, animated film grain, vignette breathing, letterboxed 2.39:1
     variants; encoded 3840x2160 where size allows, otherwise 1920x1080 with a 4K-grade
     CRF, `+faststart`, seamless loop (identical first/last frame).
  3. One AI-generated brand clip (`generate_video`, Seedance 2.0 Mini, 5 s, 720p) using a
     composited 16:9 ENOSX logo plate as first+last keyframe, so it loops perfectly; it is
     upscaled/de-noised with ffmpeg and used for the hero.
  4. A procedural `signal` clip rendered frame-by-frame (Python) in the brand palette for
     the accounts band — nodes + links + light sweep, no stock footage.
  Fallback for reduced motion / save-data / no-autoplay: the poster frame plus CSS
  `@media (prefers-reduced-motion: reduce)`.
- **4K readiness:** `srcset`-free vector logo (traced SVG from the supplied PNG), fluid
  `clamp()` type with a 2160px tier, `devicePixelRatio`-aware canvas, video rendered at
  2160p where bandwidth allows, `image-rendering` and subpixel settings tuned, and
  `dpr`-independent hairlines (1px borders via `max(1px, .0625rem)`).
- **GitHub delivery:** after the Manus checkpoint, push the finished tree to
  `github.com/enigmacxenosx/enos-x-technologies` as the requested project hand-off, keeping the
  previous Lovable build on `archive/lovable-cinematic-v1` so nothing is lost.

## 3. Design

- **Design Movement:** Kenyan print-editorial meets documentary film title sequence — the
  restraint of Swiss grid journalism (pale ink-on-paper, hairline rules, tracked micro-caps)
  fused with a cinema slate's metadata language. Reference: Meta's `about` page scale and
  video-first chapters, rebuilt in daylight like a *Nation* magazine feature spread.
- **Core Principles:**
  1. Paper first: light ground, ink type — the video supplies the drama, not a black page.
  2. Hard edges: square corners, 1px rules, real margins; no frosted panels, no blur, no glow.
  3. Chapters, not sections: each screen is a titled scene with slate metadata (SCENE/TAKE/RUNTIME).
  4. One idea per screen with generous negative space; asymmetric two-column rhythm.
- **Color Philosophy:** the logo's own three values do all the work — **Ink Navy `#012363`**
  as the voice of the brand (type, rules, solid blocks), **Azure `#00A2FD`** as the signal
  accent (active states, links, underlines), **Teal `#00A9AB`** as the counter-signal
  (secondary data, hover, small graphics). Grounds are warm, print-like: **Newsprint
  `#F6F4EF`**, **Paper `#FCFBF8`**, **Slate `#2A2C2E`** body ink, with `#E4E0D6` hairlines.
  A deep navy band (`#012363`) appears only twice as a deliberate "print overprint" chapter,
  always paired with light type — never as the site-wide background.
- **Layout Paradigm:** an asymmetric 12-column editorial grid. Headlines sit in columns 1–7
  while media bleeds to the right edge or becomes a letterboxed 2.39:1 reel across the full
  width with paper margins above and below. A persistent left-edge chapter rail (fixed, hairline)
  tracks the active scene. Nothing is centred in a stack of three identical cards.
- **Signature Elements:**
  1. **Film slate metadata strip** — mono uppercase `SCENE 04 / ENOSX CORE / 00:12 / NAIROBI`
     with a clapper tick, on every cinematic chapter.
  2. **Line-mask headline reveals** — each line rises out of a clipped band, staggered 60ms,
     900ms `cubic-bezier(.16,1,.3,1)`; plus a scramble-decode on the hero wordmark.
  3. **Overprint mark** — the hexagon logo drawn as a vector, with azure/teal offset copies in
     `multiply` to imitate misregistered spot printing; used at 4K scale in dividers and the footer.
- **Interaction Philosophy:** deliberate, physical, never bouncy. Cursor-tracking parallax on
  hero video (2% max), magnetic underline links, a scroll-linked playhead that scrubs chapter
  progress and nudges `video.currentTime` on the hero reel, copy-to-clipboard on every account
  value with a mono "COPIED" slate toast.
- **Animation:** IntersectionObserver-driven chapter state only; no perpetual floating
  elements. Video speed eases from 0.6x to 1x on entry. `prefers-reduced-motion` disables
  scrub, parallax, and swaps video for poster. Full-page load: a 700ms ink-line wipe, never a spinner.
- **Typography System:** **Archivo** (variable, wdth 100–125, wght 500–900) for display at
  `clamp(2.6rem, 7.2vw, 9.5rem)` with `-0.045em` tracking and 0.9 leading; **IBM Plex Sans**
  400/500 for body at 1.0625rem/1.65; **IBM Plex Mono** 500 uppercase 0.18em tracking for all
  slate/metadata and buttons. Hierarchy: slate → display headline → lede (max 34ch) → body.
  (Continuity: both families already appear in the user's own `enos-x-technologies` build.)
- **Wordmark & Logo:** the supplied hexagon mark (E/X interlock in navy/azure/teal) vectorised
  to SVG, locked up with a custom-set `ENOSX` wordmark in Archivo 800 at 0.02em tracking, and a
  small `TECHNOLOGIES` mono caption on wide breakpoints only. Favicon: mark-only, transparent,
  48/96/180/512 plus `favicon.ico`.
- **Brand Essence:** "Nairobi-built technology with the polish of a global studio."
  Personality: *assured, crafted, fast.*
- **Brand Voice:** declarative, short, print-headline cadence; no marketing filler, no
  "welcome to". Examples — "Latency is a design flaw." / "We ship the boring parts beautifully."
  CTAs read as work orders: "Start a build", "Request the deck", "Talk to the founder".
- **Signature Brand Color:** **Ink Navy `#012363`** — the exact navy of the supplied logo,
  used as an overprint field and as every rule line, so the brand reads even with the mark absent.
- **Explicitly avoided (user constraint):** glassmorphism/backdrop-blur, page-wide dark mode,
  purple-on-black gradients, neon glow, rounded-2xl card rows, emoji, "AI-generated" stock
  gloss, and any look-alike portraits (real repo avatars only).

## 4. Project structure

```
client/src
  App.tsx                     route table + chapter rail + skip link
  index.css                   tokens (newsprint/ink/azure/teal), slate + reveal primitives
  main.tsx                    tRPC client bootstrap
  pages/                      Home, Products, Core, Team, Accounts, About, Contact, Admin, NotFound
  components/cinema/          Reel (video layer), Slate, LineReveal, ChapterRail, Scramble,
                              SignalCanvas (dpr-aware), Grain, Playhead
  components/site/            Header, Footer, AccountRow, StatBlock, EnquiryForm, NewsletterForm
  data/                       site.ts (products, team, accounts, chapters, values)
client/public
  media/*.mp4|*.webm|*.jpg    encoded video reels, posters
  brand/enosx-mark.svg …      vector logo, favicon set
server/
  routers.ts                  enquiry | newsletter | signals | admin | auth | system
  db.ts                       insert/count/list queries
drizzle/schema.ts             enquiries, newsletter_signups, account_events
```

## 5. Acceptance mapping

Video backgrounds are encoded files (not `<img>`), Meta-style chapters, light non-glass UI,
team page from repo data, accounts section with real handles, full-stack DB writes behind the
forms, 4K-grade assets, and a push to the user's Enosx Technologies repository.
