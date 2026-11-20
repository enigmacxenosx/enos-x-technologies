import { useEffect, useState } from "react";

/**
 * ChapterRail — the vertical chapter strip on the home film: it marks which
 * chapter is in frame and lets you cut straight to it. Desktop only (CSS).
 */
export default function ChapterRail({
  chapters,
}: {
  chapters: readonly { id: string; label: string }[];
}) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const nodes = chapters
      .map(c => document.getElementById(c.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-18% 0px -18% 0px" }
    );
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav className="rail" aria-label="Chapters">
      {chapters.map((c, i) => (
        <button
          key={c.id}
          type="button"
          className="rail__item"
          data-active={active === c.id ? "1" : "0"}
          onClick={() => {
            document.getElementById(c.id)?.scrollIntoView({ block: "start" });
          }}
        >
          <span className="rail__dot" aria-hidden="true" />
          <span className="rail__label">
            {String(i + 1).padStart(2, "0")} {c.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
