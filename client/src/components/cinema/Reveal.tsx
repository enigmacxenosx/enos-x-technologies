import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveal — scroll-triggered entrance. One IntersectionObserver per node, no
 * scroll listener, nothing animated off-screen. The visual language lives in
 * index.css (.rv, .mask-line, .line-wipe); this only flips data-in="1".
 */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

type RevealProps = {
  as?: ElementType;
  delay?: number;
  threshold?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  threshold = 0.25,
  className = "",
  children,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>(threshold);
  return (
    <Tag
      id={id}
      ref={ref as never}
      data-in={inView ? "1" : "0"}
      className={`rv ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Line-mask reveal: the text rises out of a hard-edged clipping band. */
export function MaskLines({
  lines,
  className = "",
  step = 110,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  step?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  return (
    <Tag ref={ref as never} data-in={inView ? "1" : "0"} className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span style={{ ["--d" as string]: `${i * step}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Hairline that wipes open in signal blue when it enters the frame. */
export function LineWipe({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  return (
    <span ref={ref} data-in={inView ? "1" : "0"} className={className}>
      <span className="line-wipe block" style={{ ["--d" as string]: `${delay}ms` }} />
    </span>
  );
}
