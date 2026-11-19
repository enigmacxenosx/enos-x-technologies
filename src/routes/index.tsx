import { createFileRoute, Link } from "@tanstack/react-router";
import { Chapter, Constellation, Reveal } from "@/components/site";
import datacenter from "@/assets/datacenter.jpg";
import engineers from "@/assets/engineers.jpg";
import city from "@/assets/city.jpg";
import chip from "@/assets/chip.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ENOSX Technologies — Building what comes next" },
      { name: "description", content: "ENOSX Technologies builds AI, cloud and software that move businesses forward." },
      { property: "og:title", content: "ENOSX Technologies — Building what comes next" },
      { property: "og:description", content: "AI, cloud and software engineered in Africa, for the world." },
    ],
  }),
  component: Index,
});

const solutions = [["AI & Machine Learning", "Models, agents, automation"], ["Cloud Infrastructure", "Scalable, secure platforms"], ["Data & Analytics", "Decisions from real signals"]];
const services = [["Product Engineering", "Web & mobile, end to end"], ["Cybersecurity", "Protect every layer"], ["Digital Strategy", "Roadmaps that ship"]];

function List({ title, sub, items }: { title: string; sub: string; items: string[][] }) {
  return (
    <Reveal>
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="mt-1 text-muted-foreground">{sub}</p>
      <div className="mt-6 space-y-3">
        {items.map(([a, b]) => (
          <Link to="/solutions" key={a} className="flex items-center justify-between rounded-md border border-border bg-card px-5 py-4 transition hover:border-primary">
            <span className="font-semibold">{a}</span>
            <span className="text-sm text-muted-foreground">{b} ›</span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

function Index() {
  return (
    <>
      <section className="relative overflow-hidden pt-14">
        <Constellation />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 text-center">
          <Reveal>
            <h1 className="text-6xl font-black leading-[0.95] md:text-8xl">Building what<br />comes next.</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">ENOSX Technologies engineers AI, cloud and software for companies that refuse to stand still.</p>
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <div className="flex items-stretch overflow-hidden rounded-md border border-border bg-card text-left">
              <div className="flex-1 p-6">
                <div className="text-xl font-bold">Introducing Enos Core</div>
                <p className="mt-1 text-sm text-muted-foreground">Private AI for your business. Your data never leaves.</p>
              </div>
              <div className="relative hidden w-1/2 sm:block">
                <img src={chip} alt="Enos Core chip" className="absolute inset-0 h-full w-full object-cover" />
                <Link to="/solutions" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Explore</Link>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-32 md:grid-cols-2">
          <List title="Our Solutions" sub="Platforms built to scale" items={solutions} />
          <List title="Our Services" sub="Teams that ship with you" items={services} />
        </div>
      </section>

      <section className="relative h-screen overflow-hidden">
        <img src={datacenter} alt="Data center" className="slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="scrim-bottom absolute inset-0" />
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <Reveal><h2 className="text-5xl font-black md:text-8xl">We don't follow the future.<br /><span className="text-primary">We wire it.</span></h2></Reveal>
        </div>
      </section>

      <Chapter img={engineers} eyebrow="Our vision" title="Technology with people at its core." body="We believe the best technology disappears into everyday life — helping people connect, create and grow without friction." />
      <Chapter img={city} eyebrow="Our impact" title="From Nairobi to everywhere." align="right" body="Born in East Africa, our systems now power businesses across finance, health, logistics and education." />

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[["120+", "Projects shipped"], ["14", "Countries served"], ["99.98%", "Platform uptime"], ["40+", "Engineers"]].map(([n, l]) => (
            <div key={l} className="border-border p-10 md:border-r last:border-r-0">
              <div className="font-display text-5xl font-black text-primary">{n}</div>
              <div className="mt-2 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <Reveal>
          <h2 className="text-5xl font-black md:text-7xl">Let's build yours.</h2>
          <p className="mt-6 text-lg text-muted-foreground">Tell us what you're working on. We'll show you what's possible.</p>
          <Link to="/contact" className="mt-10 inline-block rounded-sm bg-primary px-8 py-4 font-semibold text-primary-foreground">Start a project</Link>
        </Reveal>
      </section>
    </>
  );
}
