import { Link } from "wouter";
import Reel from "@/components/cinema/Reel";
import { MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, Band } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";

export default function NotFound() {
  return (
    <>
      <Meta title="Not on this reel" description="This address is not part of the ENOSX Technologies site." path="/404" />
      <Reel id="datacenter" label="Machine room corridor receding into light" scrim="ink">
        <div className="wrap on-media" style={{ paddingTop: "clamp(7rem, 15vw, 12rem)", paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <Slate no="Error 404" items={["Frame missing", "Cut list has no such entry"]} tone="media" className="mb-8" />
          <MaskLines as="h1" lines={[<span key="a">Wrong</span>, <span key="b">scene.</span>]} />
          <Reveal delay={200}>
            <p className="lede mt-8" style={{ color: "#e6edf5", maxWidth: "30ch" }}>
              Nothing is encoded at this address.
            </p>
            <div className="mt-9 slate-row">
              <Link className="btn btn-media" href="/">
                Back to the film <Arrow />
              </Link>
              <Link className="btn btn-media" href="/accounts">
                ENOSX accounts
              </Link>
            </div>
          </Reveal>
        </div>
      </Reel>
      <Band>
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { href: "/products", label: "Portfolio" },
              { href: "/core", label: "Private AI" },
              { href: "/team", label: "Team" },
              { href: "/contact", label: "Contact desk" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="stat">
                <span className="stat__v" style={{ fontSize: "2rem" }}>
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}
