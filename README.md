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

Every reel is **footage of people** — the studio, the pair at one screen, the rack aisle, the
Nairobi pavement, the shop counter — encoded as real video, never a still pretending to move.

| File | Resolution | Length | Role |
| --- | --- | --- | --- |
| `hero-2160.mp4` | 3840×2160, 15.6 MB | 12.5 s | 4K master, served by `<source media="(min-width: 1600px)">` |
| `hero-1080.mp4` | 1920×1080, 5.7 MB | 12.5 s | fallback for smaller screens and `devicePixelRatio` |
| `chapter-crew.mp4` | 1920×1080, 0.84 MB | 10 s | the five-person team around one table (`/team`) |
| `chapter-studio.mp4` | 1920×1080, 0.76 MB | 10 s | two developers at one screen (`/core`, browser row) |
| `chapter-datacenter.mp4` | 1920×1080, 0.77 MB | 10 s | technician working a rack with a laptop (`/products`, 404) |
| `chapter-nairobi.mp4` | 1920×1080, 0.74 MB | 10 s | pedestrians and a matatu at golden hour (`/about`, impact) |
| `chapter-core.mp4` | 1920×1080, 0.60 MB | 10 s | an engineer's hands on the device (Core band) |
| `chapter-commerce.mp4` | 1920×1080, 0.74 MB | 10 s | customer and shopkeeper at the counter (`/contact`) |
| `signal-loop.mp4` | 1920×1080, 0.64 MB | 10 s | accounts-band signal field (the one non-photographic reel) |
| `*-poster.jpg` | — | — | posters; also the static treatment for `prefers-reduced-motion`, `save-data` or blocked autoplay |

The hero is a six-shot documentary montage: each shot is a sinusoidal push-in that returns to its
own opening scale, the shots are joined by 0.5 s cross-dissolves, and the sequence dissolves back
to the first frame — so frame 0 and frame 299 measure a mean difference of 1.38/255 and the loop
has no visible seam (chapter reels measure 1.31/255). Grades, animated grain and vignette are
applied before the 4K upscale. Pipeline: `/home/ubuntu/media/reels2.py`.

**Who appears.** The reel footage is illustrative documentary imagery generated for this site: it
shows *people at work in a Kenyan software studio*, not the named individuals on `/team`, and it is
never captioned as if it were. The founder and team portraits remain the real photographs taken
from the company repository (`client/public/avatars/`). Nothing on the site claims a client, a
headcount or a metric that is not in the repositories.

## Brand assets

`client/public/brand/` carries a size set of the supplied logo (`enosx-logo-concept-c.png`) cut
to PNG at 48/96/180/192/256/384/512/1024, an inverted 768 mark for the ink overprint band,
`apple-touch-icon.png` and `og-cover.jpg` (1600×840, the studio frame with an ink foot band and the
wordmark). The unmodified supply is kept at
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
