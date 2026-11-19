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
      {
        name: "description",
        content: "ENOSX Technologies builds AI, cloud and software that move businesses forward.",
      },
      { property: "og:title", content: "ENOSX Technologies — Building what comes next" },
      {
        property: "og:description",
        content: "AI, cloud and software engineered in Africa, for the world.",
      },
    ],
  }),
  component: Index,
});

const solutions = [
  ["01", "AI & Machine Learning", "Models, agents, and automation that turn signals into action."],
  ["02", "Cloud Infrastructure", "Secure, resilient platforms designed to move at your pace."],
  ["03", "Data & Analytics", "Decision systems that make the important things visible."],
];

function Index() {
  return (
    <>
      <section className="cinematic-hero relative min-h-[92svh] overflow-hidden pt-14">
        <img
          src={datacenter}
          alt="ENOSX infrastructure"
          className="slowzoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-glow absolute inset-0" />
        <Constellation />
        <div className="relative mx-auto flex min-h-[calc(92svh-3.5rem)] max-w-7xl flex-col justify-end px-6 pb-14 pt-24 md:pb-20">
          <Reveal className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/65">
              <span className="h-px w-10 bg-primary" /> ENOSX / Nairobi → everywhere
            </div>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.86] tracking-[-0.07em] text-white md:text-[clamp(5rem,11vw,10rem)]">
              Build the
              <br />
              <span className="text-primary">next signal.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              AI, cloud and software for companies that refuse to stand still.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/solutions"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Explore capabilities
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Start a project
              </Link>
            </div>
          </Reveal>
          <div className="mt-16 flex items-end justify-between border-t border-white/15 pt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
            <span>Systems for a world in motion</span>
            <span className="hidden items-center gap-3 sm:flex">
              <span className="h-8 w-px bg-white/35" /> Scroll to explore
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-background py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              A different kind of partner
            </div>
            <h2 className="mt-5 max-w-md text-4xl font-black leading-[0.95] md:text-6xl">
              Technology with a point of view.
            </h2>
          </Reveal>
          <Reveal className="md:pt-10">
            <p className="max-w-2xl text-2xl leading-tight text-foreground/85 md:text-4xl">
              We connect ambitious people with the systems, intelligence, and velocity to make
              meaningful progress.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                ["120+", "Projects shipped"],
                ["14", "Countries served"],
                ["99.98%", "Platform uptime"],
              ].map(([value, label]) => (
                <div key={label} className="border-t border-border pt-4">
                  <div className="font-display text-3xl font-black text-primary">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-card/45 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  What we make possible
                </div>
                <h2 className="mt-5 text-4xl font-black leading-none md:text-7xl">
                  The stack, reimagined.
                </h2>
              </div>
              <Link
                to="/solutions"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                See all solutions ↗
              </Link>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {solutions.map(([number, title, body]) => (
              <Reveal key={number}>
                <Link
                  to="/solutions"
                  className="group cinematic-card block min-h-[280px] rounded-2xl border border-border bg-background p-6 transition duration-500 hover:-translate-y-2 hover:border-primary/60 md:p-8"
                >
                  <div className="flex items-start justify-between text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    <span>{number}</span>
                    <span className="text-lg transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                  <h3 className="mt-24 text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[88svh] overflow-hidden">
        <img
          src={chip}
          alt="Enos Core private AI hardware"
          className="slowzoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="scrim-left absolute inset-0" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl items-end px-6 pb-20">
          <Reveal className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Introducing Enos Core
            </div>
            <h2 className="mt-5 text-5xl font-black leading-[0.92] text-white md:text-8xl">
              Private AI.
              <br />
              <span className="text-primary">No compromise.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Intelligence that works where your data does. Built for control, speed, and the next
              decision.
            </p>
            <Link
              to="/solutions"
              className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Discover Enos Core
            </Link>
          </Reveal>
        </div>
      </section>

      <Chapter
        img={engineers}
        eyebrow="Our vision"
        title="Technology with people at its core."
        body="The best systems do more than work. They give people room to think, create, and move."
      />
      <Chapter
        img={city}
        eyebrow="Our impact"
        title="From Nairobi to everywhere."
        align="right"
        body="Born in East Africa, built for the world, and grounded in the realities of the people we build with."
      />
      <section className="relative overflow-hidden border-y border-border py-28 md:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Make your next move
            </div>
            <h2 className="mt-6 text-5xl font-black leading-[0.9] md:text-8xl">
              Let&apos;s build
              <br />
              <span className="text-primary">yours.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-lg text-muted-foreground">
              Tell us what you&apos;re working on. We&apos;ll show you what&apos;s possible.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Start a project
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
