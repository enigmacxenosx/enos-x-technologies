# ENOSX Technologies — cinematic promotional website

The official promotional site for **ENOSX Technologies** (Enosx Tech), a Nairobi-based technology
company founded in 2024 by Enosh Yeswa. It is a full-stack application: an editorial, video-led
front end with a real API and database behind it.

Design reference was Meta's `about` page: full-bleed moving backgrounds, oversized declarative
headlines, scroll-linked chapters. The look is deliberately **light editorial** — newsprint
grounds, Ink Navy type, hard-edged frames and film-slate metadata. No glassmorphism, no page-wide
dark theme, no decorative rounded-card grid.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero reel, mission, product dossier, vision and impact chapters, accounts strip, CTA |
| `/about` | Mission, story ("latency is a design flaw"), values, founder line |
| `/products` | Dossier rows: ENOSX AI, ENOSX Core, Exboot, Enosx Browser, Enosx Tech Store, Enosh Blog |
| `/core` | ENOSX AI deep dive — ENOSX One / Studio / Nexus modes, attachments, media, voice, connectors, "Speed is UX" |
| `/team` | Five-person team with real portraits, roles and primary ownership from `TEAM.md` |
| `/accounts` | Every documented ENOSX account with copy-to-clipboard and click tracking |
| `/contact` | Full-stack enquiry form (validation, honeypot, rate limit, reference code) |
| `/admin` | Owner-only view of enquiries, signups and account activity |

## Stack

- **Front end:** React 19, wouter, Tailwind CSS v4 (`@theme` tokens), Vite. `client/src/`
- **Back end:** Express + tRPC v11 (superjson), zod v4 contracts shared with the client.
  `server/routers.ts`, `server/db.ts`, `shared/enquiry.ts`
- **Data:** Managed MySQL through Drizzle ORM. `drizzle/schema.ts`, migrations in `drizzle/`
- **Tables:** `enquiries`, `newsletter_signups`, `account_events`
- **Runtime:** `server/_core/index.ts` serves the API and the built SPA on `PORT` (3000 default)

## Commands

```bash
pnpm dev          # dev server on port 3000 (API + HMR)
pnpm check        # tsc --noEmit across client, server, shared
pnpm build        # production bundle -> dist/
pnpm start        # serve dist/index.js + dist/public
pnpm test         # application tests
pnpm db:generate  # write a migration from schema changes
pnpm db:migrate   # apply migrations
pnpm db:push      # generate + apply in one step
```

## Content provenance

Every factual claim on this site is sourced from the founder's own repositories — `enosxai`,
`Enosx-X-enosxai`, `Exboot`, `Enosh-browser`, `enosh-blog`, `enos-x-technologies`, and the
`enigmacxenosx` profile — and is catalogued in [`RESEARCH.md`](RESEARCH.md). Brand copy
(mission, vision, values, "Speed is UX", the founder line) is quoted verbatim.

**No fabricated metrics.** The counters on `/accounts` and in the footer are live counts read from
the database via `site.signals`, and they render `0` until real enquiries, signups and clicks
arrive. Placeholder statistics inherited from the earlier prototype were removed on purpose.
Only accounts that actually exist are listed: no X, LinkedIn, TikTok, Facebook or YouTube presence
is claimed.

## Media pipeline

`client/public/media/` holds **7 encoded reels** (8 MP4 files, the hero ships two resolutions)
plus 7 poster JPEGs — real video, not stills. Each reel is a `<video>` element
(`muted playsinline autoplay loop`) driven by an IntersectionObserver, so off-screen reels are
paused with `preload="none"` and cost no decode. All are H.264 at 24 fps with identical first and
last frames for seamless loops, `+faststart` for progressive playback.

| File | Resolution | Role |
| --- | --- | --- |
| `hero-2160.mp4` | 3840×2160, 5.8 MB | 4K master, served by `<source media="(min-width: 1600px)">` |
| `hero-1080.mp4` | 1920×1080, 4.7 MB | fallback for smaller screens and `devicePixelRatio` |
| `chapter-{nairobi,studio,datacenter,core,commerce}.mp4` | 1920×1080, 0.5–1.7 MB | full-HD chapter reels |
| `signal-loop.mp4` | 1920×1080, 0.6 MB | accounts-band signal field |
| `*-poster.jpg` | — | posters; also the static treatment for `prefers-reduced-motion`, `save-data` or blocked autoplay |

The hero was generated as a 720p, 5-second seamless clip, then upscaled, de-noised and grained
with ffmpeg to the 4K master. The chapter reels were rendered from 2816×1584 photographic frames
and the signal field from procedurally drawn frames by the pipeline in `/home/ubuntu/media/reels.py`
(slow push-in, drifting light pass, vignette breathing, film grain). The largest file is 5.8 MB,
far inside the 30 MiB per-asset limit.

## Brand assets

`client/public/brand/` carries a size set of the supplied logo (`enosx-logo-concept-c.png`) cut
to PNG at 48/96/180/192/256/384/512/1024, an inverted 768 mark for the ink overprint band,
`apple-touch-icon.png` and `og-cover.jpg`. The unmodified supply is kept at
`client/public/enosx-logo.png`, and `favicon.ico` + `favicon.png` are declared in the document
head along with `theme-color: #012363`. The hexagon mark appears at full bleed through CSS
(`.overprint__mark`) rather than as a separate SVG file, so it stays crisp at any scale.
`client/public/avatars/` holds the real team portraits taken from the company repository.

## Contact and routing rules

`shared/enquiry.ts` owns the zod schema and topic list; the server derives the destination address
per topic (technology → `enosxtech@gmail.com`, services and reports → `enosxservices@gmail.com`,
everything else → `hello@enosx.tech`), returns a reference code such as `ENX-TPJ9-MRH`, and
silently swallows honeypot submissions. Requests are rate-limited per IP. Nothing is trusted from
the browser.

## Deploy

`Dockerfile` builds the app and serves it on `PORT`; health check is `/api/health`
(`webdev.config` runtime config: port 3000, `healthPath: /api/health`). Preview runs through a
cross-site proxy, so session cookies stay `SameSite=None; Secure` and no `X-Frame-Options` deny
header is sent. `/admin` uses the platform's OAuth session and requires `role === "admin"`.

See [`VERIFICATION.md`](VERIFICATION.md) for the evidence log (video decode checks, API behaviour,
responsive passes) and [`plan.md`](plan.md) / [`TODO.md`](TODO.md) for the approved design and
acceptance list.
