import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "./cinema/Reveal";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>#*";

/**
 * Scramble — a decode-in title: characters resolve from noise, left to right.
 * Honours reduced motion by showing the final string immediately.
 */
export default function Scramble({
  text,
  className = "",
  speed = 34,
  style,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  speed?: number;
  style?: CSSProperties;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const { ref, inView } = useInView<HTMLElement>(0.4);
  const [out, setOut] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      return;
    }
    let timer = 0;
    frame.current = 0;
    const chars = Array.from(text);
    const steps = Math.max(chars.length * 2, 12);
    const step = () => {
      frame.current += 1;
      const revealed = Math.floor((frame.current / steps) * chars.length);
      setOut(
        chars
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < revealed) return c;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (frame.current < steps) {
        timer = window.setTimeout(step, speed);
      } else {
        setOut(text);
      }
    };
    timer = window.setTimeout(step, 0);
    return () => window.clearTimeout(timer);
  }, [inView, text, speed]);

  return (
    <Tag ref={ref as never} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
