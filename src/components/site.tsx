import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (el.classList.add("in"), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    let w = 0,
      h = 0,
      raf = 0;
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
    }));
    const resize = () => {
      w = c.width = c.offsetWidth;
      h = c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = ctx.fillStyle = color;
      for (const p of pts) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]!;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(a.x * w, a.y * h, 2, 2);
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]!,
            d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < 140) {
            ctx.globalAlpha = 0.18 * (1 - d / 140);
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2" aria-label="ENOSX Technologies">
      <img src="/enosx-logo.png" alt="" className="h-8 w-8 object-contain" />
      <span className="font-display text-lg font-black tracking-tight">
        ENOS<span className="text-primary">X</span>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-5 px-4 md:gap-10 md:px-6">
        <Link to="/" aria-label="ENOSX Technologies home">
          <Logo />
        </Link>
        <nav className="flex gap-1 text-xs text-muted-foreground sm:gap-3 md:gap-7 md:text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="ml-auto hidden rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:inline-block"
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            Technology built in Africa, for the world.
          </p>
        </div>
        {[
          ["Company", ["About", "Careers", "Newsroom"]],
          ["Solutions", ["AI & Data", "Cloud", "Software"]],
          ["Connect", ["Contact", "LinkedIn", "X / Twitter"]],
        ].map(([t, items]) => (
          <div key={t as string}>
            <div className="text-sm font-semibold">{t as string}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {(items as string[]).map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ENOSX Technologies. All rights reserved.
      </div>
    </footer>
  );
}

export function Chapter({
  img,
  eyebrow,
  title,
  body,
  align = "left",
}: {
  img: string;
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "right";
}) {
  return (
    <section className="relative flex min-h-[90svh] items-end overflow-hidden">
      <img
        src={img}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="scrim-bottom absolute inset-0" />
      <div
        className={`relative mx-auto w-full max-w-7xl px-6 pb-24 ${align === "right" ? "flex justify-end" : ""}`}
      >
        <Reveal className="max-w-xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </div>
          <h2 className="mt-4 text-5xl font-extrabold leading-[1.02] md:text-7xl">{title}</h2>
          <p className="mt-6 text-lg text-muted-foreground">{body}</p>
        </Reveal>
      </div>
    </section>
  );
}
