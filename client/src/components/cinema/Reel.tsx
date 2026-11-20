import { useEffect, useRef, useState } from "react";

/**
 * Reel — a real encoded video layer, never a still pretending to move.
 *
 * Each reel ships two H.264 files (a 4K-grade master and a 1080p stream) plus a
 * JPEG poster. The browser picks by viewport width and device pixel ratio, so a
 * 2160p display gets the 3840x2160 file. Playback is driven by IntersectionObserver
 * so off-screen reels cost nothing, and reduced-motion / Save-Data visitors get the
 * poster frame instead of a moving layer.
 */

export type ReelId =
  | "hero"
  | "nairobi"
  | "studio"
  | "datacenter"
  | "core"
  | "commerce"
  | "signal";

type Src = { hd: string; ud: string; poster: string; ratio: string };

const REGISTRY: Record<ReelId, Src> = {
  hero: {
    hd: "/media/hero-1080.mp4",
    ud: "/media/hero-2160.mp4",
    poster: "/media/hero-poster.jpg",
    ratio: "16:9",
  },
  nairobi: {
    hd: "/media/chapter-nairobi.mp4",
    ud: "/media/chapter-nairobi.mp4",
    poster: "/media/chapter-nairobi-poster.jpg",
    ratio: "16:9",
  },
  studio: {
    hd: "/media/chapter-studio.mp4",
    ud: "/media/chapter-studio.mp4",
    poster: "/media/chapter-studio-poster.jpg",
    ratio: "16:9",
  },
  datacenter: {
    hd: "/media/chapter-datacenter.mp4",
    ud: "/media/chapter-datacenter.mp4",
    poster: "/media/chapter-datacenter-poster.jpg",
    ratio: "16:9",
  },
  core: {
    hd: "/media/chapter-core.mp4",
    ud: "/media/chapter-core.mp4",
    poster: "/media/chapter-core-poster.jpg",
    ratio: "16:9",
  },
  commerce: {
    hd: "/media/chapter-commerce.mp4",
    ud: "/media/chapter-commerce.mp4",
    poster: "/media/chapter-commerce-poster.jpg",
    ratio: "16:9",
  },
  signal: {
    hd: "/media/signal-loop.mp4",
    ud: "/media/signal-loop.mp4",
    poster: "/media/signal-poster.jpg",
    ratio: "16:9",
  },
};

export function reelPoster(id: ReelId) {
  return REGISTRY[id].poster;
}

function useCinemaPrefs() {
  const [prefs, setPrefs] = useState({ reduced: false, saveData: false, big: false });
  useEffect(() => {
    const mq = (q: string) => window.matchMedia(q).matches;
    const update = () =>
      setPrefs({
        reduced: mq("(prefers-reduced-motion: reduce)"),
        saveData:
          "connection" in navigator &&
          (navigator as any).connection?.saveData === true,
        big:
          window.innerWidth * (window.devicePixelRatio || 1) >= 3200,
      });
    update();
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return prefs;
}

export default function Reel({
  id,
  label,
  scrim = "bottom",
  frame = true,
  grain = true,
  eager = false,
  perf = false,
  anchor,
  className = "",
  children,
}: {
  id: ReelId;
  /** DOM id for chapter navigation; the reel itself is chosen by `id`. */
  anchor?: string;
  label: string;
  /** paper scrims keep ink type readable over a bright reel; ink darkens for reversed type */
  scrim?: "none" | "bottom" | "left" | "ink" | "paper";
  frame?: boolean;
  grain?: boolean;
  eager?: boolean;
  perf?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const src = REGISTRY[id];
  const multi = src.ud !== src.hd;
  const videoRef = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const { reduced, saveData, big } = useCinemaPrefs();
  const [failed, setFailed] = useState(false);
  const stillsOnly = reduced || saveData || failed;

  useEffect(() => {
    if (stillsOnly || !videoRef.current) return;
    const v = videoRef.current;
    // Only the reel in view decodes frames.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.18) {
            v.removeAttribute("preload");
            const p = v.play();
            if (p && typeof p.catch === "function") p.catch(() => setFailed(true));
            hostRef.current?.setAttribute("data-state", "live");
          } else {
            v.pause();
            hostRef.current?.setAttribute("data-state", "idle");
          }
        }
      },
      { threshold: [0, 0.18, 0.6] }
    );
    io.observe(v);
    const onErr = () => setFailed(true);
    v.addEventListener("error", onErr);
    return () => {
      io.disconnect();
      v.removeEventListener("error", onErr);
    };
  }, [stillsOnly]);

  return (
    <div
      ref={hostRef}
      id={anchor}
      className={`reel ${className}`}
      data-state="idle"
      role="img"
      aria-label={label}
    >
      {stillsOnly ? (
        <img
          src={src.poster}
          alt={label}
          className="reel__media"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          className="reel__media"
          aria-hidden="true"
          muted
          playsInline
          loop
          preload={eager ? "metadata" : "none"}
          poster={src.poster}
          disablePictureInPicture
        >
          {multi ? (
            <>
              <source src={src.ud} type="video/mp4" media="(min-width: 1600px)" />
              <source src={src.hd} type="video/mp4" />
            </>
          ) : (
            <source src={src.hd} type="video/mp4" />
          )}
        </video>
      )}

      {scrim === "bottom" && <div className="reel__scrim-b" aria-hidden="true" />}
      {scrim === "left" && <div className="reel__scrim-l" aria-hidden="true" />}
      {scrim === "paper" && <div className="reel__scrim-b" style={{ opacity: 0.55 }} aria-hidden="true" />}
      {scrim === "ink" && <div className="reel__scrim-ink" aria-hidden="true" />}
      {frame && <div className="reel__frame" aria-hidden="true" />}
      {perf && (
        <>
          <div className="perf" style={{ top: 0 }} aria-hidden="true" />
          <div className="perf" style={{ bottom: 0 }} aria-hidden="true" />
        </>
      )}
      {grain && <div className="reel__grain" aria-hidden="true" />}
      <div className="reel__content">{children}</div>
    </div>
  );
}
