import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { brand } from "@/data/site";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Portfolio" },
  { href: "/core", label: "Private AI" },
  { href: "/team", label: "Team" },
  { href: "/accounts", label: "Accounts" },
  { href: "/contact", label: "Contact" },
];

/**
 * Masthead — a printed nameplate rather than a floating glass bar: solid paper,
 * one hairline when stuck, hides on scroll-down, returns on scroll-up.
 */
export default function Header() {
  const [location, navigate] = useLocation();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 24);
      setHidden(y > 520 && y > last + 4);
      if (y < last - 4) setHidden(false);
      setLast(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [last]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="masthead" data-stuck={stuck ? "1" : "0"} data-hidden={hidden ? "1" : "0"}>
        <div className="wrap flex items-center justify-between gap-4">
          <Link href="/" className="brandlock" aria-label={`${brand.name} — home`}>
            <img src="/brand/enosx-mark-96.png" alt="" width={48} height={48} />
            <span>
              <span className="brandlock__word block">ENOSX</span>
              <span className="brandlock__sub">TECHNOLOGIES · KENYA</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="navlink"
                aria-current={location === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="navlink hidden xl:inline-flex"
              onClick={() => {
                navigator.clipboard
                  ?.writeText("enosxtech@gmail.com")
                  .catch(() => undefined);
              }}
            >
              enosxtech@gmail.com
            </button>
            <a className="btn btn-primary hidden md:inline-flex" href="/contact" onClick={(e) => { e.preventDefault(); go("/contact"); }}>
              Start an enquiry
            </a>
            <button
              type="button"
              className="navlink lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div className="drawer" data-open={open ? "1" : "0"} aria-hidden={!open}>
        <div className="slate slate-row mb-8">
          <span className="slate-tick" aria-hidden="true" />
          Index
          <span className="slate-bar" aria-hidden="true" />
          <button type="button" className="navlink" onClick={() => setOpen(false)}>
            Close ×
          </button>
        </div>
        {NAV.map((item, i) => (
          <a
            key={item.href}
            className="drawer__link"
            href={item.href}
            onClick={e => {
              e.preventDefault();
              go(item.href);
            }}
          >
            <span className="hanging-num mr-3">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
        <div className="mt-auto pt-8">
          <p className="slate">{brand.city}</p>
          <p className="slate slate-teal">Founded {brand.foundedYear}</p>
        </div>
      </div>
    </>
  );
}
