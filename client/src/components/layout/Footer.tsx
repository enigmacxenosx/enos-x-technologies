import { Link } from "wouter";
import { accounts, brand, products } from "@/data/site";

const QUICK = accounts.filter(a => ["email-technology", "email-services", "whatsapp"].includes(a.key));

/**
 * Footer — the colophon. Printed-matter furniture: rules, tiny tracked caps,
 * and a machine-readable build note instead of marketing filler.
 */
export default function Footer() {
  return (
    <footer className="relative">
      {/* reversed strapline band */}
      <div className="overprint py-6">
        <div className="overflow-hidden" aria-hidden="true">
          <div className="marquee slate" style={{ color: "rgba(251,250,247,0.5)" }}>
            {Array.from({ length: 2 }, (_, dup) => (
              <span key={dup} className="slate-row" style={{ gap: "2.5rem" }}>
                {["Building the future from Kenya", "Speed is UX", "Nairobi · 2024", "Multimodal AI", "Private inference", "Commerce that pays in M-Pesa"].map(
                  (t, i) => (
                    <span key={i} className="slate-row">
                      <span className="slate-tick" aria-hidden="true" />
                      {t}
                    </span>
                  )
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-paper-2" style={{ borderTop: "1px solid var(--color-rule)" }}>
        <div className="wrap py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="brandlock mb-5">
                <img src="/brand/enosx-mark-96.png" alt="" width={48} height={48} />
                <span>
                  <span className="brandlock__word block">ENOSX</span>
                  <span className="brandlock__sub" style={{ display: "block" }}>
                    TECHNOLOGIES · KENYA
                  </span>
                </span>
              </div>
              <p className="pull" style={{ maxWidth: "30ch" }}>
                {brand.philosophy}
              </p>
              <p className="mt-4 body-muted" style={{ maxWidth: "40ch", fontSize: "0.95rem" }}>
                {brand.mission}
              </p>
              <div className="slate-row mt-6">
                {QUICK.map(a => (
                  <a key={a.key} className="tlink" href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">
                    {a.value}
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Products">
              <h2 className="slate mb-4">Products</h2>
              <ul className="grid gap-2">
                {products.map(p => (
                  <li key={p.id}>
                    <Link href="/products" className="navlink" style={{ textTransform: "none", letterSpacing: "0.02em", fontSize: "0.92rem" }}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <h2 className="slate mb-4">Company</h2>
              <ul className="grid gap-2">
                {[
                  { href: "/about", label: "About" },
                  { href: "/core", label: "Private AI" },
                  { href: "/team", label: "Team" },
                  { href: "/accounts", label: "Accounts" },
                  { href: "/contact", label: "Contact" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="navlink" style={{ textTransform: "none", letterSpacing: "0.02em", fontSize: "0.92rem" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Live properties">
              <h2 className="slate mb-4">Live</h2>
              <ul className="grid gap-2">
                {accounts
                  .filter(a => a.kind === "Web" || a.kind === "Domain" || a.kind === "GitHub")
                  .map(a => (
                    <li key={a.key}>
                      <a
                        className="navlink"
                        style={{ textTransform: "none", letterSpacing: "0.02em", fontSize: "0.92rem" }}
                        href={a.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {a.value}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <div className="rule mt-14" />
          <div className="slate-row mt-5 justify-between">
            <span>{brand.rights}</span>
            <span>{brand.city} · Founded {brand.foundedYear}</span>
            <span className="slate-teal">
              Colophon: React 19 · tRPC · MySQL · video encoded at 3840×2160
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
