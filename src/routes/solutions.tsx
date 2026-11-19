import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import chip from "@/assets/chip.jpg";
import datacenter from "@/assets/datacenter.jpg";
import engineers from "@/assets/engineers.jpg";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — ENOSX Technologies" },
      { name: "description", content: "AI, cloud infrastructure and product engineering from ENOSX Technologies." },
      { property: "og:title", content: "Solutions — ENOSX Technologies" },
      { property: "og:description", content: "AI, cloud and software solutions built to scale." },
    ],
  }),
  component: Solutions,
});

const rows = [
  { img: chip, t: "AI & Machine Learning", d: "Custom models, intelligent agents and automation that cut hours of manual work into seconds." },
  { img: datacenter, t: "Cloud Infrastructure", d: "Secure, resilient platforms designed for growth — migrated, managed and monitored around the clock." },
  { img: engineers, t: "Product Engineering", d: "Web and mobile products designed and built end to end by a team that sweats the details." },
];

function Solutions() {
  return (
    <div className="pt-14">
      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <h1 className="max-w-4xl text-6xl font-black leading-[0.95] md:text-8xl">What we build.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Three disciplines. One team. Every layer of your stack.</p>
        </Reveal>
      </section>
      {rows.map((r, i) => (
        <section key={r.t} className="mx-auto grid max-w-7xl items-center gap-12 border-t border-border px-6 py-24 md:grid-cols-2">
          <Reveal className={i % 2 ? "md:order-2" : ""}>
            <img src={r.img} alt={r.t} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
          </Reveal>
          <Reveal>
            <div className="font-display text-sm text-primary">0{i + 1}</div>
            <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">{r.t}</h2>
            <p className="mt-6 text-lg text-muted-foreground">{r.d}</p>
          </Reveal>
        </section>
      ))}
    </div>
  );
}
