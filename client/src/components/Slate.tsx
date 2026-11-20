import type { ReactNode } from "react";

/**
 * Slate — the clapperboard metadata strip used as section furniture:
 * scene number, take, location, timestamp. Monospaced, tracked, never decorative.
 */
export default function Slate({
  no,
  items,
  tone = "ink",
  bar = true,
  className = "",
}: {
  no?: string;
  items: ReactNode[];
  tone?: "ink" | "azure" | "teal" | "media";
  bar?: boolean;
  className?: string;
}) {
  const toneClass =
    tone === "azure"
      ? "slate-azure"
      : tone === "teal"
        ? "slate-teal"
        : tone === "media"
          ? "slate-on-media"
          : "";
  return (
    <div className={`slate slate-row ${toneClass} ${className}`}>
      {no ? <span className="slate-tick ink" aria-hidden="true" /> : null}
      {no ? <span>{no}</span> : null}
      {items.map((item, i) => (
        <span key={i} className="slate-row">
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          <span>{item}</span>
        </span>
      ))}
      {bar ? <span className="slate-bar" aria-hidden="true" /> : null}
    </div>
  );
}
