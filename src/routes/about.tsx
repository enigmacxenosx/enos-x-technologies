import { createFileRoute } from "@tanstack/react-router";
import { Chapter, Reveal } from "@/components/site";
import engineers from "@/assets/engineers.jpg";
import city from "@/assets/city.jpg";

const team = [
  ["EY", "Enosh Yeswa", "Founder & Chief Executive Officer", "Vision, strategy, leadership, major decisions, and key partnerships"],
  ["TI", "Tracey Ivyone", "Growth, Marketing & Community Lead", "Content, social media, community, referrals, and acquisition"],
  ["GW", "Grace Wangare", "Product Design & User Research Lead", "User experience, onboarding, interviews, and workflow design"],
  ["VO", "Vince Odhiambo", "Executive Assistant", "Administration, scheduling, meeting follow-ups, and founder support"],
  ["FA", "Faith Adhiambo", "Product & Operations Associate", "Project tracking, documentation, product feedback, coordination, and follow-through"],
] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Enos X Technologies" },
      { name: "description", content: "Our mission, story and values at Enos X Technologies." },
      { property: "og:title", content: "About Enos X Technologies" },
      { property: "og:description", content: "Our mission is to build technology that gives everyone more power to create." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative flex h-screen items-end overflow-hidden">
        <img src={city} alt="Nairobi skyline" className="slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="scrim-bottom absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our mission</div>
            <h1 className="mt-4 max-w-4xl text-6xl font-black leading-[0.95] md:text-8xl">Give every business the power of great technology.</h1>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-32">
        <Reveal><h2 className="text-4xl font-bold md:text-5xl">Our story</h2></Reveal>
        <div className="mt-12 space-y-0">
          {[["2019", "Founded in Nairobi by a small team of engineers."], ["2021", "Launched our first cloud platform for East African fintechs."], ["2023", "Expanded into AI and data, serving 10+ countries."], ["2026", "Introduced Enos Core — private AI for every business."]].map(([y, t]) => (
            <Reveal key={y} className="grid grid-cols-[120px_1fr] gap-8 border-t border-border py-8">
              <div className="font-display text-3xl font-black text-primary">{y}</div>
              <p className="text-xl">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The people behind the work</div>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">ENOSX Technologies Team</h2>
          </Reveal>
          <Reveal className="mt-10">
            <div className="overflow-x-auto rounded-md border border-border bg-background">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">ENOSX Technologies team members and responsibilities</caption>
                <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <tr>
                    <th scope="col" className="w-20 border-b border-border px-4 py-4 font-semibold">Avatar</th>
                    <th scope="col" className="w-44 border-b border-border px-4 py-4 font-semibold">Team member</th>
                    <th scope="col" className="w-64 border-b border-border px-4 py-4 font-semibold">Role</th>
                    <th scope="col" className="border-b border-border px-4 py-4 font-semibold">Main responsibility</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map(([avatar, name, role, responsibility]) => (
                    <tr key={name} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-5 align-top">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 font-display text-xs font-black text-primary" aria-hidden="true">
                          {avatar}
                        </span>
                      </td>
                      <th scope="row" className="px-4 py-5 align-top font-semibold text-foreground">{name}</th>
                      <td className="px-4 py-5 align-top text-muted-foreground">{role}</td>
                      <td className="px-4 py-5 align-top leading-relaxed text-muted-foreground">{responsibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
      <Chapter img={engineers} eyebrow="Our values" title="Build boldly. Ship honestly. Stay curious." body="We move fast with care, tell clients the truth, and never stop learning." />
    </>
  );
}
