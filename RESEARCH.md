# ENOSX research digest (extracted from the owner's repositories)

Working clone locations: `/home/ubuntu/study/{enos-x-technologies,enosxai,Enosx-X-enosxai,Exboot,Enosh-browser,enosh-blog,enigmacxenosx}`
GitHub login: `enigmacxenosx` (gh authenticated in sandbox). Reels pipeline: `/home/ubuntu/media/reels.py`, log `/home/ubuntu/media/reels.log`.
Project: `/home/ubuntu/enosxtech` (webdev, port 3000, server+database on, resource `wdp_4d837d3d666d89036f3a836e`).
AI hero clip: `/home/ubuntu/media/hero-raw.mp4` (1280x720, 5.04 s, 24 fps, 2.7 MB, Seedance 2.0 Mini 720p/5s per this session's plan).
Generated stills: `/home/ubuntu/assets/still-{nairobi,studio,datacenter,core,commerce}.jpg` (2816x1584).
Logo supplied by user: `/home/ubuntu/upload/enosx-logo-concept-c.png` (1920x1920, transparent, content bbox 1841x1857).
Logo HEX sampled: navy `#012363`, azure `#00A2FD`, teal `#01A9AB`.

## Verbatim brand lines (use as-is)
- Mission (`enosxai/const.ts`): "Make software feel instant by building multimodal AI assistants and commerce experiences that work with the operating environment, not beside it."
- Vision: "redefine the boundary between Human and OS." Philosophy: "Speed is UX." FOUNDER_VISION: "Speed is UX. Every interaction should be quicker than the thought that started it; this principle drives Enosx Technologies' product decisions."
- Story: "Founded in Nairobi, Kenya in 2024, Enosx Technologies builds products around the conviction that latency is a design flaw."
- Values (`enos-x-technologies/src/routes/about.tsx`): "Build boldly. Ship honestly. Stay curious."
- Founder sign-off (profile README): "Build with intention. Ship with courage. Keep learning." + "Enosx Technologies · Kenya · 2026"
- Profile banner strapline: "ENOSX — BUILDING THE FUTURE FROM KENYA"; bio "Founder · Product Engineer · AI Builder", "I turn ambitious ideas into useful digital products.", "Tech in the genes ⚡ Jesus is LORD ⚡ Founder @EnosxTechnologies ⚡ Building AI, Web & SaaS"
- Browser product promise: "Browse privately. Work intelligently. Stay in control." Positioning: "Enosx Browser is a private, intelligent browser that helps people understand the web, organize their work, and use AI without giving up control of their information."
- Exboot headline: "Build the USB you meant to build." / "One utility · three boot modes · zero ambiguity"
- Exboot license line: "Proprietary — © 2024–2026 Enosx Technologies. All rights reserved."

## Accounts (documented, verified)
- `enosxtech@gmail.com` — technology (also written Enosxtech@gmail.com)
- `enosxservices@gmail.com` — services and reports
- `hello@enosx.tech` — package author/maintainer address
- WhatsApp/calls/SMS `+254 798 303 978` → `https://wa.me/254798303978`
- Instagram `https://www.instagram.com/engima_cx`
- GitHub `enigmacxenosx` (products), `Enosx-X` (org), `vince551` (Vince)
- Live apps: `enosxai.vercel.app`, `enosxtech.vercel.app` (previous official site), `enosxtech-hub.vercel.app` (store), `enosxtechnologies.vercel.app` (WEBSITE_URL in const.ts)
- Domains declared in services: `enosx.ai`, `enosx.tech`
- Tauri appId `com.enosx.ai`; browser appId `com.enosx.browser`
- No X/Twitter, LinkedIn, TikTok, Facebook, YouTube, Discord or Telegram company account exists in any repo → do NOT fabricate those.

## Team (canonical TEAM.md, identical in 5 repos)
Enosh Yeswa — Founder and Chief Executive Officer — company vision/strategy, product direction, priorities, major decisions, key partnerships.
Grace Wangare — Product Design and User Research Lead — UX, onboarding, interviews, workflow design, evidence-based feedback.
Tracey Ivyone — Growth, Marketing and Community Lead — content, social media, community, referrals, acquisition.
Vince Odhiambo — Executive Assistant — founder support, scheduling, admin coordination, meeting records, follow-through. GitHub @vince551.
Faith Adhiambo — Product & Operations Associate (only in enos-x-technologies/src/data/team.ts) — project tracking, documentation, product feedback, coordination, follow-through.
Avatars (real photos, 768x1024 progressive JPEG): `enos-x-technologies/public/avatars/{enosh-yeswa,faith-adhiambo,grace-wangare,tracey-ivyone,vince-odhiambo}.jpg` → copied into `client/public/avatars/`.
Cadence: daily founder coordination (Enosh + Vince), weekly team sync scorecard, escalation to Enosh.

## Products
- ENOSX AI: multimodal assistant, web + Tauri desktop. Modes ENOSX One / Studio / Nexus (ids ex-core, ex-pro, enosh-mind). Attachments (doc/pdf/image/audio/video), image+video generation, NVIDIA VSR upscale bridge, web search (Tavily), voice STT/TTS, follow-up suggestions, 1–5 star ratings, branching, knowledge bank, memory, history, connectors (GitHub/Shopify/Vercel/Email), GOD MODE lab tools, document export (PDF/Word/Excel/Markdown), local Ollama models, PWA, 8 interface languages (English, Kiswahili, French, German, Luhya, Nandi, Latin, Hebrew). © 2024–2026.
- ENOSX Core: private/local inference posture — Local GGUF import (Enosx Browser, IndexedDB, no upload), processing modes Local AI / Hybrid AI / Private Cloud AI / No AI, generation controls (temperature, context window, max output, top-p), explicit context permission. (Productisation of features that exist; the name appeared in the owner's previous site build.)
- Exboot: Windows bootable-USB utility. GPT/UEFI, MBR/UEFI, MBR/BIOS Legacy; Ventoy multi-boot (Windows/Linux/IMG/VHD/VHDX); install.wim splitting for FAT32; ISO/WIM/ESD freshness detection; optional Win11 TPM + Secure Boot; GitHub Releases auto-update with SHA-256 verification; requires admin; erases target disk (explicit confirm). Windows 10/11, Python 3.10+, Inno Setup 6.
- Enosx Browser: offline-first private browser shell, Chrome-style tabs/address bar/bookmarks/reading list/history/workspaces/private mode + Enosx AI panel; Electron (context isolation, sandbox, no node integration), Next.js 16 static export, PWA, Linux AppImage/deb, Windows NSIS, macOS DMG. v0.1.0 preview; local runtime honestly reported as "not connected".
- Enosx Tech Store / e-commerce hub: Kenya-focused electronics storefront, M-Pesa-ready checkout, Nairobi delivery, price comparison.
- Enosh Blog: founder publishing platform, "Editorial Noir" serif-forward magazine design, React 19/Vite/Express/Drizzle.
- ExLover Coach existed in the older `Enosx-X/enosxai` snapshot (`exlover.vercel.app`) but was dropped from the newer repo → not advertised.

## Facts usable as numbers (no fabrication)
Founded 2024 · 6 portfolio products · 3 reasoning modes · 8 interface languages · 4 desktop/Linux installer formats · © 2024–2026.
Previous site's "120+ projects / 14 countries / 99.98% uptime" were explicitly placeholder copy → excluded.

## Design constraints from the user (must hold)
Not AI-looking · no glassmorphism/backdrop-blur · not too dark → light newsprint grounds + ink navy · real VIDEO backgrounds (Meta about style) · 4K/full-HD assets · full stack · team page · introduce ENOSX accounts · supplied logo + favicon · push to the ENOSX tech repo.
The owner's previous build was dark + glass (`enos-x-technologies` styles.css used `#08091b`, `backdrop-filter: blur(22px)`, oklch indigo/violet) — deliberately reversed this time. Their earlier plan asked for "deep olive/black + lime"; superseded by the light editorial direction.

## Open items to finish
1. Reels: confirm files in `client/public/media` (hero-2160, hero-1080, chapter-*, signal-loop + posters).
2. Components: Reveal/MaskLine, Slate, Header, Footer, ChapterRail, Playhead, AccountRow, Scramble, Meta.
3. Pages: Home, Products, Core, Team, About, Accounts, Contact, Admin, NotFound + App routes.
4. Backend: schema (enquiries, newsletter_signups, account_events), db.ts queries, routers.ts (enquiry/newsletter/signals/admin), drizzle migration + `pnpm db:migrate`.
5. `public/manus-routes.json`, robots.txt, sitemap.xml.
6. Dev command via `webdev.config PUT runtime/dev-commands`; typecheck; screenshots.
7. Manus checkpoint push to origin/main + push tree to `enigmacxenosx/enos-x-technologies` (keep old main on `archive/lovable-cinematic-v1`). Never commit tokens.
8. Video generation is limited to one 5-second 720p Seedance 2.0 Mini clip per request on this plan; 4K comes from the ffmpeg upscale, not from the generator.
