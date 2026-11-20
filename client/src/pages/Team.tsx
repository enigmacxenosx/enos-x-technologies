import { Link } from "wouter";
import Reel from "@/components/cinema/Reel";
import { MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, ArrowLink, Band, SectionHead } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";
import { brand, team } from "@/data/site";

const CADENCE = [
  ["Daily", "Founder coordination", "Enosh and Vince review the day: what moved, what is blocked, what needs a decision."],
  ["Weekly", "Team sync + scorecard", "Every lead reports against the same short list. Owners are named, not implied."],
  ["As needed", "Escalation", "Anything that changes scope, cost or a customer’s day goes to the founder."],
];

export default function Team() {
  return (
    <>
      <Meta
        title="Team"
        description="Enosx Technologies is five named people with written ownership: Enosh Yeswa, Grace Wangare, Tracey Ivyone, Vince Odhiambo and Faith Adhiambo."
        path="/team"
      />

      <Reel id="crew" label="The five-person ENOSX team around one table, slow push-in" scrim="ink">
        <div className="wrap on-media" style={{ paddingTop: "clamp(6rem, 13vw, 11rem)", paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <Slate no="Reel 04" items={["People", brand.city, "TEAM.md"]} tone="media" className="mb-8" />
          <MaskLines as="h1" lines={[<span key="a">The</span>, <span key="b">team.</span>]} />
          <Reveal delay={200}>
            <p className="lede mt-8" style={{ color: "#e6edf5", maxWidth: "32ch" }}>
              Five people, each with a written brief on what they own.
            </p>
          </Reveal>
        </div>
      </Reel>

      <Band>
        <div className="wrap">
          <SectionHead
            no="01"
            meta={["Roster", "Named roles", "Written ownership"]}
            title={["Small on purpose.", "Every role is load-bearing."]}
            lede="Design, research, growth, executive coordination and product operations sit next to the engineering — which is why the assistant, the browser, the utility and the storefront share one posture instead of four dialects."
          />
        </div>
      </Band>

      {team.map((m, i) => (
        <Band key={m.name} tone={i % 2 === 0 ? "paper-2" : "paper"} id={m.name.toLowerCase().replace(/\s+/g, "-")}>
          <div className="wrap">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20 lg:items-center">
              <Reveal className={i % 2 === 0 ? "" : "lg:order-2"}>
                <figure className="m-0">
                  <div className="portrait reel--paper" style={{ aspectRatio: "3 / 4" }}>
                    <span className="portrait__index">{m.initials}</span>
                    <img src={m.avatar} alt={`${m.name} — ${m.role}`} width={768} height={1024} decoding="async" loading={i === 0 ? "eager" : "lazy"} />
                  </div>
                  <figcaption className="slate-row mt-4">
                    <span className="slate">Portrait {String(i + 1).padStart(2, "0")}</span>
                    <span className="slate-bar" aria-hidden="true" />
                    <span className="slate slate-teal">{m.note}</span>
                  </figcaption>
                </figure>
              </Reveal>

              <div className={i % 2 === 0 ? "" : "lg:order-1"}>
                <Slate no={String(i + 1).padStart(2, "0")} items={["Ownership"]} className="mb-6" />
                <MaskLines as="h2" lines={[<span key="n">{m.name}</span>]} />
                <Reveal delay={140}>
                  <p className="pull mt-5" style={{ maxWidth: "34ch" }}>
                    {m.role}
                  </p>
                  <p className="body-muted mt-5" style={{ maxWidth: "52ch" }}>
                    {m.responsibility}
                  </p>
                  <div className="mt-7 slate-row">
                    {m.handle ? (
                      <ArrowLink href={`https://github.com/${m.handle}`} external>
                        github.com/{m.handle}
                      </ArrowLink>
                    ) : (
                      <span className="slate">Reachable through {`hello@enosx.tech`}</span>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Band>
      ))}

      <Band tone="ink" id="cadence">
        <div className="wrap">
          <Slate no="02" items={["Operating cadence", "From the team brief"]} tone="media" className="mb-9" />
          <MaskLines as="h2" lines={[<span key="a">How the week</span>, <span key="b">actually runs.</span>]} />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {CADENCE.map(([when, what, body], i) => (
              <Reveal key={what} delay={i * 110}>
                <div style={{ borderTop: "1px solid rgba(251,250,247,0.24)", paddingTop: "1.1rem" }}>
                  <span className="slate slate-teal">{when}</span>
                  <h3 style={{ color: "#fbfaf7" }} className="mt-3">
                    {what}
                  </h3>
                  <p className="mt-3" style={{ color: "#9fb0c4", fontSize: "0.96rem" }}>
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      <Band id="values">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Slate no="03" items={["Values", "Verbatim"]} className="mb-8" />
              <MaskLines as="h2" lines={[<span key="a">Build boldly.</span>, <span key="b">Ship honestly.</span>, <span key="c">Stay curious.</span>]} />
            </div>
            <Reveal delay={160}>
              <ul className="stack-hair m-0 p-0" style={{ listStyle: "none" }}>
                {brand.values.map(v => (
                  <li key={v.title} className="py-6">
                    <h3>{v.title}</h3>
                    <p className="body-muted mt-2" style={{ maxWidth: "48ch" }}>
                      {v.body}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="pull mt-10" style={{ maxWidth: "32ch" }}>
                “{brand.founderLine}”
              </p>
              <p className="slate slate-teal mt-3">Enosh Yeswa — Founder &amp; CEO</p>
              <div className="mt-9 slate-row">
                <Link className="btn btn-primary" href="/contact">
                  Work with us <Arrow />
                </Link>
                <Link className="btn" href="/accounts">
                  ENOSX accounts
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>
    </>
  );
}
