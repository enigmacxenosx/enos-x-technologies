import type { CSSProperties } from "react";
import { Link } from "wouter";
import Reel from "@/components/cinema/Reel";
import { LineWipe, MaskLines, Reveal } from "@/components/cinema/Reveal";
import {
  Arrow,
  ArrowLink,
  Band,
  Chip,
  SectionHead,
  Stat,
} from "@/components/Editorial";
import Slate from "@/components/Slate";
import AccountRow from "@/components/AccountRow";
import Scramble from "@/components/Scramble";
import Meta from "@/components/Meta";
import { accounts, brand, products, stats, team } from "@/data/site";
import { trpc } from "@/lib/trpc";

const PROCESS_MODES = [
  {
    name: "Local AI",
    body: "The model runs on your machine. Nothing leaves the device.",
  },
  {
    name: "Hybrid AI",
    body: "On-device first; only the parts that need more reach out.",
  },
  {
    name: "Private Cloud AI",
    body: "Your context, our inference, a declared boundary.",
  },
  {
    name: "No AI",
    body: "The interface with the intelligence switched off, honestly.",
  },
];

const HOME_ACCOUNTS = [
  "email-technology",
  "email-services",
  "whatsapp",
  "github-personal",
];

const pad: CSSProperties = {
  paddingTop: "clamp(4rem, 9vw, 9.5rem)",
  paddingBottom: "clamp(4rem, 9vw, 9.5rem)",
};

export default function Home() {
  const signals = trpc.site.signals.useQuery(undefined, {
    retry: false,
    staleTime: 60_000,
  });
  const counts = new Map<string, number>(
    (signals.data?.byAccount ?? []).map(r => [r.key, r.n])
  );
  const shown = HOME_ACCOUNTS.map(k => accounts.find(a => a.key === k));

  return (
    <>
      <Meta
        title="ENOSX Technologies"
        description="Enosx Technologies builds multimodal AI assistants, private inference and Kenyan commerce experiences from Nairobi, Kenya. Speed is UX."
        path="/"
      />

      {/* --------------------------------------------------------- 01 hero */}
      <Reel
        id="hero"
        label="Documentary montage: the ENOSX team at work in Nairobi, seamless loop"
        eager
        scrim="bottom"
        frame={false}
      >
        <div
          className="wrap w-full flex flex-col justify-between gap-14"
          style={{
            minHeight: "100svh",
            paddingTop: "clamp(6rem, 13vh, 9rem)",
            paddingBottom: "clamp(2.5rem, 6vh, 4rem)",
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Slate
              no="Reel 01"
              items={[
                brand.city,
                `Est. ${brand.foundedYear}`,
                "Multimodal AI · Commerce",
              ]}
            />
            <p className="slate hidden text-right md:block">
              3840 × 2160 · H.264
              <br />
              seamless loop
            </p>
          </div>

          <div>
            <MaskLines
              as="h1"
              className="hero__title"
              step={140}
              lines={[
                <span key="a">Latency is</span>,
                <span key="b">a design flaw.</span>,
              ]}
            />
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end">
              <Reveal delay={420}>
                <p className="lede" style={{ maxWidth: "34ch" }}>
                  {brand.mission}
                </p>
                <div className="slate-row mt-7">
                  <Link className="btn btn-primary" href="/products">
                    See the portfolio <Arrow />
                  </Link>
                  <Link className="btn" href="/contact">
                    Start an enquiry
                  </Link>
                </div>
                <div className="proofline mt-8" aria-label="ENOSX proof points">
                  <span>
                    <strong>06</strong> products shipping
                  </span>
                  <span>
                    <strong>03</strong> AI reasoning modes
                  </span>
                  <span>
                    <strong>2024</strong> founded in Nairobi
                  </span>
                </div>
              </Reveal>
              <Reveal delay={560} className="hidden lg:block">
                <Scramble
                  as="p"
                  text="BUILDING THE FUTURE FROM KENYA"
                  className="slate slate-teal text-right"
                  style={{ maxWidth: "20ch" }}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Reel>

      {/* ------------------------------------------------------ 02 mission */}
      <Band id="origin">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            <div>
              <Slate
                no="02"
                items={["Mission", "Verbatim", "from our own source files"]}
                className="mb-9"
              />
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <Reveal>
                <p className="lede" style={{ maxWidth: "30ch" }}>
                  {brand.mission}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-8 body-muted" style={{ maxWidth: "58ch" }}>
                  {brand.story}
                </p>
              </Reveal>
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 90}>
                    <Stat value={s.value} label={s.label} />
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={220}>
              <div className="stack-hair">
                {brand.values.map((v, i) => (
                  <div key={v.title} className="py-6 first:pt-0">
                    <div className="slate-row mb-3">
                      <span className="hanging-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="slate">Value</span>
                    </div>
                    <h3 className="mb-2">{v.title}</h3>
                    <p className="body-muted" style={{ fontSize: "0.98rem" }}>
                      {v.body}
                    </p>
                    <LineWipe className="mt-6 block" delay={i * 120} />
                  </div>
                ))}
                <div className="py-6">
                  <p className="pull">Vision — {brand.vision}</p>
                  <p className="slate slate-teal mt-4">{brand.founderLine}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ----------------------------------------------------- 03 portfolio */}
      <Band id="portfolio" tone="paper-2">
        <div className="wrap">
          <SectionHead
            no="03"
            meta={["Portfolio", "Six shipped products", "Nairobi"]}
            title={["Six products,", "one posture."]}
            lede="An assistant that behaves like part of the operating system, a private inference layer, a Windows utility, a browser, a Kenyan storefront and a publishing platform — built by the same small team."
            href="/products"
            linkLabel="Full portfolio"
          />
          <div className="dossier mt-14">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <Link href="/products" className="dossier__row">
                  <span className="dossier__no">{p.index}</span>
                  <div>
                    <h3 className="dossier__title">{p.name}</h3>
                    <div className="slate-row mt-3">
                      <span className="slate">{p.kicker}</span>
                      <Chip label={p.status} live={p.status === "Live"} />
                    </div>
                  </div>
                  <p className="dossier__desc">{p.summary}</p>
                  <span className="slate" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------------- 03b ecosystem */}
      <Band id="ecosystem">
        <div className="wrap">
          <SectionHead
            no="03B"
            meta={["Explore", "The ENOSX ecosystem", "Start with one signal"]}
            title={["One team.", "Several ways in."]}
            lede="Discover the products that make the ENOSX point of view tangible — from an assistant that works across your context to private inference and commerce built for Kenya."
            href="/products"
            linkLabel="Compare all products"
          />
          <div className="ecosystem-grid mt-14">
            {products.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <article className={`ecosystem-card ecosystem-card--${i + 1}`}>
                  <div className="ecosystem-card__top">
                    <span className="slate">
                      {p.index} / {p.kicker}
                    </span>
                    <Chip label={p.status} live={p.status === "Live"} />
                  </div>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                  </div>
                  <div className="ecosystem-card__footer">
                    {p.link ? (
                      <ArrowLink href={p.link.href} external>
                        {p.link.label}
                      </ArrowLink>
                    ) : (
                      <ArrowLink href="/core">
                        Read the private AI brief
                      </ArrowLink>
                    )}
                    <span
                      className="ecosystem-card__signal"
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* --------------------------------------------------------- 04 core */}
      <Band id="core" tone="ink">
        <div className="wrap">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:items-center">
            <div>
              <Slate
                no="04"
                items={["ENOSX Core", "Private inference"]}
                tone="media"
                className="mb-8"
              />
              <MaskLines
                as="h2"
                lines={[
                  <span key="a">Intelligence that</span>,
                  <span key="b">stays where you are.</span>,
                ]}
              />
              <Reveal delay={200}>
                <p
                  className="pull mt-8"
                  style={{ color: "#cfd9e6", maxWidth: "44ch" }}
                >
                  {products[1].summary}
                </p>
                <p
                  className="mt-6"
                  style={{ color: "#9fb0c4", maxWidth: "52ch" }}
                >
                  {products[1].detail}
                </p>
                <div className="mt-9">
                  <ArrowLink href="/core">Read the private AI brief</ArrowLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <Reel
                id="core"
                label="ENOSX Core in an engineer's hands, one lit indicator, slow push-in"
                scrim="none"
                className="reel-box"
              />
              <div className="stack-hair mt-10">
                {PROCESS_MODES.map((m, i) => (
                  <div
                    key={m.name}
                    className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-4"
                  >
                    <span className="slate slate-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="slate" style={{ color: "#fbfaf7" }}>
                        {m.name}
                      </span>
                      <span
                        className="block"
                        style={{ color: "#9fb0c4", fontSize: "0.95rem" }}
                      >
                        {m.body}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------------- 05 people */}
      <Band id="people">
        <div className="wrap">
          <SectionHead
            no="05"
            meta={["People", "Five named roles", "Written ownership"]}
            title={["A small studio,", "not a crowd."]}
            lede="The company runs on five named people with written ownership: strategy, design and research, growth, executive coordination, and product operations."
            href="/team"
            linkLabel="Meet the team"
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <figure className="m-0">
                  <div className="portrait">
                    <span className="portrait__index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={m.avatar}
                      alt={`${m.name}, ${m.role}`}
                      loading="lazy"
                      decoding="async"
                      width={768}
                      height={1024}
                    />
                    <span className="portrait__tag">
                      <span className="slate" style={{ color: "#fbfaf7" }}>
                        {m.initials}
                      </span>
                      <span
                        className="slate"
                        style={{ color: "rgba(251,250,247,0.7)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </div>
                  <figcaption className="mt-4">
                    <h3 style={{ fontSize: "1.15rem" }}>{m.name}</h3>
                    <p className="slate mt-2">{m.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------------- 06 impact */}
      <Reel
        id="nairobi"
        anchor="impact"
        label="Nairobi street at golden hour: pedestrians, traffic, one call in progress"
        scrim="ink"
      >
        <div
          className="wrap"
          style={{
            paddingTop: "clamp(5rem, 11vw, 10rem)",
            paddingBottom: "clamp(5rem, 11vw, 10rem)",
          }}
        >
          <SectionHead
            no="06"
            meta={["Origin", "Nairobi", "1°17′S 36°49′E"]}
            title={["Built in Nairobi.", "Shipped everywhere."]}
            onMedia
          />
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={`m-${s.label}`} delay={i * 90}>
                <Stat value={s.value} label={s.label} tone="media" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p
              className="pull mt-16"
              style={{ color: "#fbfaf7", maxWidth: "34ch" }}
            >
              “{brand.founderLine}”
            </p>
            <p className="slate slate-on-media mt-4">
              Enosh Yeswa — Founder &amp; CEO
            </p>
          </Reveal>
        </div>
      </Reel>

      {/* ----------------------------------------------------- 07 accounts */}
      <Reel
        id="signal"
        anchor="accounts"
        label="Signal field: nodes and proximity links drifting on newsprint"
        scrim="none"
        frame={false}
        grain={false}
      >
        <div className="wrap" style={pad}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Slate
                no="07"
                items={["Accounts", "Documented, not guessed"]}
                className="mb-8"
              />
              <MaskLines
                as="h2"
                lines={[
                  <span key="a">Every place</span>,
                  <span key="b">we actually are.</span>,
                ]}
              />
              <Reveal delay={160}>
                <p className="body-muted mt-7" style={{ maxWidth: "46ch" }}>
                  Two mailboxes split by purpose, a direct line, the founder’s
                  channel and the repositories.{" "}
                  {signals.data?.ready
                    ? `${signals.data.accountEvents} recorded interactions so far.`
                    : "The counter below comes from this site’s own database."}
                </p>
                <div className="mt-8">
                  <ArrowLink href="/accounts">All twelve accounts</ArrowLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div>
                {shown.map((a, i) =>
                  a ? (
                    <AccountRow
                      key={a.key}
                      account={a}
                      index={i}
                      count={counts.get(a.key)}
                    />
                  ) : null
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Reel>

      {/* ---------------------------------------------------------- 08 CTA */}
      <Band id="trust" tone="paper-2">
        <div className="wrap">
          <SectionHead
            no="07B"
            meta={["Trust", "A declared posture", "No silent promises"]}
            title={["Technology with", "the boundaries visible."]}
            lede="Meta makes safety and privacy part of the product journey. ENOSX does the same at its scale: the important choices stay visible before the system acts."
            href="/core"
            linkLabel="See the private AI posture"
          />
          <div className="trust-grid mt-14">
            <div className="trust-item">
              <span className="trust-item__number">01</span>
              <h3>Privacy by choice</h3>
              <p>
                Local, hybrid, private cloud or no AI. The processing boundary
                is something you decide.
              </p>
            </div>
            <div className="trust-item">
              <span className="trust-item__number">02</span>
              <h3>Speed is UX</h3>
              <p>
                We treat latency as a design problem, not a technical footnote
                hidden after launch.
              </p>
            </div>
            <div className="trust-item">
              <span className="trust-item__number">03</span>
              <h3>Built in Nairobi</h3>
              <p>
                Our origin is part of the product perspective: grounded locally,
                designed to travel.
              </p>
            </div>
          </div>
        </div>
      </Band>

      {/* ---------------------------------------------------------- 08 CTA */}
      <Band>
        <div className="wrap">
          <div className="relative">
            <img
              src="/brand/enosx-mark-invert-768.png"
              alt=""
              className="overprint__mark"
              style={{ opacity: 0.07, mixBlendMode: "multiply" }}
            />
            <Slate
              no="08"
              items={["Next", "Partnerships", "Build requests"]}
              className="mb-9"
            />
            <MaskLines
              as="h2"
              lines={[
                <span key="a">Tell us what</span>,
                <span key="b">should feel instant.</span>,
              ]}
            />
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link className="btn btn-primary" href="/contact">
                  Start an enquiry <Arrow />
                </Link>
                <a
                  className="btn"
                  href="https://wa.me/254798303978"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  WhatsApp +254 798 303 978
                </a>
                <span className="slate" style={{ marginLeft: "0.5rem" }}>
                  {brand.rights}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>
    </>
  );
}
