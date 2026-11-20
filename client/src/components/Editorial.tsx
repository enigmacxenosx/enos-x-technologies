import type { ReactNode } from "react";
import { Link } from "wouter";
import Slate from "./Slate";
import { MaskLines, Reveal } from "./cinema/Reveal";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arrow ${className}`}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 13L13 2M13 2H5.5M13 2v7.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Chip — status label. "Live" gets the teal treatment; nothing is claimed that
 *  is not true of the repository behind it. */
export function Chip({ label, live = false }: { label: string; live?: boolean }) {
  return (
    <span className={`chip ${live ? "chip-live" : ""}`}>
      {live ? <span className="live-dot" aria-hidden="true" /> : null}
      {label}
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `tlink arrow-link ${className}`;
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer noopener">
        {children}
        <Arrow />
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}

/**
 * SectionHead — the recurring slate + declarative headline + lede + jump link.
 * Every chapter on every page uses it, which is what makes the site read as
 * one film rather than a pile of blocks.
 */
export function SectionHead({
  no,
  meta,
  title,
  lede,
  href,
  linkLabel,
  align = "left",
  onMedia = false,
}: {
  no: string;
  meta: string[];
  title: string[];
  lede?: ReactNode;
  href?: string;
  linkLabel?: string;
  align?: "left" | "wide";
  onMedia?: boolean;
}) {
  return (
    <div className={align === "wide" ? "" : "grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16"}>
      <div>
        <Slate
          no={no}
          items={meta}
          tone={onMedia ? "media" : "ink"}
          className={onMedia ? "opacity-90" : "mb-7"}
        />
        <MaskLines
          as="h2"
          className={onMedia ? "text-paper" : ""}
          lines={title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        />
      </div>
      {(lede || (href && linkLabel)) && (
        <Reveal delay={180} className="flex flex-col justify-end gap-6">
          {lede ? (
            <p className={onMedia ? "text-paper/85" : "body-muted"} style={{ maxWidth: "46ch" }}>
              {lede}
            </p>
          ) : null}
          {href && linkLabel ? (
            <div>
              <ArrowLink href={href}>{linkLabel}</ArrowLink>
            </div>
          ) : null}
        </Reveal>
      )}
    </div>
  );
}

export function Stat({ value, label, tone = "ink" }: { value: string; label: string; tone?: "ink" | "media" }) {
  return (
    <div className="stat">
      <div className="stat__v" style={tone === "media" ? { color: "#fbfaf7" } : undefined}>
        {value}
      </div>
      <div className={`stat__k slate ${tone === "media" ? "slate-on-media" : ""}`}>{label}</div>
    </div>
  );
}

/** Page opener: a full-bleed reel with a reversed title sitting on it. */
export function PageReel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative ${className}`} style={{ paddingTop: "clamp(4.5rem, 9vw, 7rem)" }}>
      {children}
    </section>
  );
}

export function Band({
  id,
  children,
  tone = "paper",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "paper" | "paper-2" | "ink";
  className?: string;
}) {
  const bg =
    tone === "ink" ? "overprint" : tone === "paper-2" ? "bg-paper-2" : "";
  return (
    <section
      id={id}
      className={`${bg} ${className}`}
      style={{
        paddingTop: "clamp(4rem, 9vw, 9.5rem)",
        paddingBottom: "clamp(4rem, 9vw, 9.5rem)",
        ...(tone === "paper-2"
          ? { borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }
          : null),
      }}
    >
      {children}
    </section>
  );
}
