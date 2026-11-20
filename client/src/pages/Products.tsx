import { Link } from "wouter";
import Reel, { type ReelId } from "@/components/cinema/Reel";
import { MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, Band, Chip, SectionHead } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";
import { brand, products } from "@/data/site";

const REEL_LABELS: Record<string, string> = {
  datacenter: "A technician walking the rack aisle with a laptop, slow push-in",
  core: "An engineer's hands testing the device, one lit indicator",
  studio: "Two developers at one screen, hands on the keyboard",
  commerce: "Customer and shopkeeper at a Kenyan electronics counter",
  nairobi: "Pedestrians crossing a Nairobi pavement at golden hour",
  crew: "The five-person team around one table, mid-conversation",
};

export default function Products() {
  return (
    <>
      <Meta
        title="Portfolio"
        description="ENOSX AI, ENOSX Core, Exboot, Enosx Browser, Enosx Tech Store and Enosh Blog — six products built by Enosx Technologies in Nairobi, Kenya."
        path="/products"
      />

      <Reel id="datacenter" label={REEL_LABELS.datacenter} scrim="ink">
        <div className="wrap on-media" style={{ paddingTop: "clamp(6rem, 13vw, 11rem)", paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <Slate no="Reel 02" items={["Portfolio", "Six products", brand.city]} tone="media" className="mb-8" />
          <MaskLines as="h1" lines={[<span key="a">The</span>, <span key="b">portfolio.</span>]} />
          <Reveal delay={220}>
            <p className="lede mt-8" style={{ color: "#e6edf5", maxWidth: "38ch" }}>
              Each of these exists as code, as a release, or as a live URL. None of them are slideware.
            </p>
          </Reveal>
        </div>
      </Reel>

      {products.map((p, i) => (
        <Band key={p.id} id={p.id} tone={i % 2 === 0 ? "paper" : "paper-2"}>
          <div className="wrap">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 === 0 ? "" : "lg:order-2"}>
                <Slate no={p.index} items={[p.kicker, p.status]} className="mb-7" />
                <MaskLines as="h2" lines={[<span key="n">{p.name}</span>]} />
                <Reveal delay={140}>
                  <p className="pull mt-6" style={{ maxWidth: "40ch" }}>
                    {p.summary}
                  </p>
                  <p className="body-muted mt-5" style={{ maxWidth: "56ch" }}>
                    {p.detail}
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <div className="mt-9">
                    <span className="slate mb-4 block">What it does</span>
                    <ul className="stack-hair m-0 p-0" style={{ listStyle: "none" }}>
                      {p.capabilities.map((c, j) => (
                        <li key={c} className="grid grid-cols-[2.4rem_1fr] items-baseline gap-2 py-3">
                          <span className="hanging-num">{String(j + 1).padStart(2, "0")}</span>
                          <span style={{ fontSize: "0.97rem" }}>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="slate-row mt-9">
                    {p.link ? (
                      <a className="btn" href={p.link.href} target="_blank" rel="noreferrer noopener">
                        {p.link.label} <Arrow />
                      </a>
                    ) : (
                      <span className="chip">Shipped inside our products</span>
                    )}
                    <Chip label={p.status} live={p.status === "Live"} />
                  </div>
                </Reveal>
              </div>

              <Reveal delay={100} className={i % 2 === 0 ? "" : "lg:order-1"}>
                <Reel
                  id={p.reel as ReelId}
                  label={`${p.name} — ${REEL_LABELS[p.reel] ?? "chapter reel"}`}
                  scrim="none"
                  className="reel-box"
                />
                <div className="slate-row mt-4">
                  <span className="slate">
                    Reel {p.index} · {p.reel} · 1920×1080 people footage
                  </span>
                  <span className="slate-bar" aria-hidden="true" />
                  <span className="slate slate-teal">loops seamlessly</span>
                </div>
              </Reveal>
            </div>
          </div>
        </Band>
      ))}

      <Band>
        <div className="wrap">
          <SectionHead
            no="07"
            meta={["Next", "Build requests", "Partnerships"]}
            title={["Something missing", "from this list?"]}
            lede="We take on work that fits this posture: assistants that touch real files, private inference, desktop tools that respect the machine, and commerce that works with how Kenya pays."
            href="/contact"
            linkLabel="Start an enquiry"
          />
          <div className="mt-10 slate-row">
            <Link className="btn btn-primary" href="/core">
              Private AI brief <Arrow />
            </Link>
            <Link className="btn" href="/accounts">
              ENOSX accounts
            </Link>
          </div>
        </div>
      </Band>
    </>
  );
}
