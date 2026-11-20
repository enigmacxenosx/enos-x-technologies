import { Link } from "wouter";
import Reel from "@/components/cinema/Reel";
import { LineWipe, MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, ArrowLink, Band, SectionHead, Stat } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";
import { brand, products, stats, team, timeline } from "@/data/site";

export default function About() {
  return (
    <>
      <Meta
        title="About"
        description="Enosx Technologies was founded in Nairobi in 2024 around one conviction: latency is a design flaw. Mission, vision, values and the record so far."
        path="/about"
      />

      <Reel id="nairobi" label="Aerial pass over Nairobi at golden hour, slow push-in" scrim="ink">
        <div className="wrap on-media" style={{ paddingTop: "clamp(6rem, 13vw, 11rem)", paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <Slate no="Reel 06" items={["About", brand.city, `Founded ${brand.foundedYear}`]} tone="media" className="mb-8" />
          <MaskLines as="h1" lines={[<span key="a">Nairobi,</span>, <span key="b">since 2024.</span>]} />
          <Reveal delay={200}>
            <p className="lede mt-8" style={{ color: "#e6edf5", maxWidth: "32ch" }}>
              We are a technology company that behaves like a workshop: small, opinionated, and
              allergic to waiting.
            </p>
          </Reveal>
        </div>
      </Reel>

      <Band>
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <Slate no="01" items={["Mission", "Verbatim"]} className="mb-8" />
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <MaskLines
                as="h2"
                lines={[<span key="a">Make software</span>, <span key="b">feel instant.</span>]}
              />
              <Reveal delay={180}>
                <p className="pull mt-8" style={{ maxWidth: "48ch" }}>
                  {brand.mission}
                </p>
                <p className="body-muted mt-6" style={{ maxWidth: "56ch" }}>
                  {brand.story}
                </p>
                <div className="mt-8">
                  <LineWipe className="block" />
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="stack-hair">
                <div className="py-6 first:pt-0">
                  <span className="slate">Vision</span>
                  <p className="pull mt-3">{brand.vision}</p>
                </div>
                <div className="py-6">
                  <span className="slate">Philosophy</span>
                  <p className="pull mt-3">{brand.philosophy}</p>
                  <p className="body-muted mt-3" style={{ fontSize: "0.96rem" }}>
                    Every interaction should be quicker than the thought that started it. That is the
                    measure we hold our own products to.
                  </p>
                </div>
                <div className="py-6">
                  <span className="slate">Conviction</span>
                  <p className="pull mt-3">{brand.belief}</p>
                </div>
                <div className="py-6">
                  <span className="slate">Where we work</span>
                  <p className="pull mt-3">{brand.city}</p>
                  <p className="body-muted mt-3" style={{ fontSize: "0.96rem" }}>
                    East Africa Time (UTC+3). Written work first; calls when writing stops working.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>

      <Band tone="paper-2" id="record">
        <div className="wrap">
          <SectionHead
            no="02"
            meta={["The record", "2024 → next", "Written from our own repositories"]}
            title={["Four entries,", "no filler."]}
            lede="This is the short version of three years of shipping, taken from commit history, release pages and the README files that came with them."
          />
          <div className="dossier mt-14">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <div className="dossier__row">
                  <span className="dossier__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="dossier__title" style={{ fontSize: "clamp(1.8rem,1.2rem + 2vw,2.9rem)" }}>
                    {t.year}
                  </h3>
                  <p className="dossier__desc">{t.text}</p>
                  <span className="slate" aria-hidden="true">
                    <Arrow />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      <Band tone="ink" id="what-we-ship">
        <div className="wrap">
          <Slate no="03" items={["Scope", "Six products", "Three surfaces"]} tone="media" className="mb-9" />
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <MaskLines
              as="h2"
              lines={[<span key="a">One team,</span>, <span key="b">four surfaces:</span>, <span key="c">web, desktop,</span>, <span key="d">device, commerce.</span>]}
            />
            <Reveal delay={160}>
              <p className="pull" style={{ color: "#cfd9e6", maxWidth: "42ch" }}>
                The assistant, the browser and the utility all started from the same complaint:
                software that waits. So we build the whole stack — inference, interface, installer and
                storefront — rather than outsource the part that feels slow.
              </p>
              <ul className="mt-8 grid gap-3 p-0" style={{ listStyle: "none" }}>
                {products.map(p => (
                  <li key={p.id} className="grid grid-cols-[2.6rem_1fr] gap-3 items-baseline">
                    <span className="slate slate-teal">{p.index}</span>
                    <span style={{ color: "#eef2f7" }}>{p.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ArrowLink href="/products">Portfolio with capability lists</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>

      <Band>
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Slate no="04" items={["The people", `${team.length} named roles`]} className="mb-8" />
              <MaskLines as="h2" lines={[<span key="a">Who is</span>, <span key="b">answerable.</span>]} />
              <Reveal delay={160}>
                <p className="body-muted mt-6" style={{ maxWidth: "44ch" }}>
                  {team.map(m => m.name).join(" · ")}
                </p>
                <div className="mt-7">
                  <ArrowLink href="/team">Team page with roles and cadence</ArrowLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                {stats.map(s => (
                  <Stat key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
              <div className="mt-12 portrait-row grid gap-4 sm:grid-cols-3">
                {team.slice(0, 3).map(m => (
                  <div key={m.name} className="portrait">
                    <img src={m.avatar} alt={`${m.name}`} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="slate-row mt-16">
            <Link className="btn btn-primary" href="/contact">
              Start an enquiry <Arrow />
            </Link>
            <Link className="btn" href="/accounts">
              ENOSX accounts
            </Link>
            <span className="slate">{brand.ownerNote}</span>
          </div>
        </div>
      </Band>
    </>
  );
}
