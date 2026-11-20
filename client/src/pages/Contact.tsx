import { useState } from "react";
import Reel from "@/components/cinema/Reel";
import { MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, Band, SectionHead } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";
import { brand } from "@/data/site";
import { enquirySchema, TOPIC_COPY, type EnquiryTopic } from "@shared/enquiry";
import { trpc } from "@/lib/trpc";

const TOPICS = Object.keys(TOPIC_COPY) as EnquiryTopic[];

/** Never trust a stale select value: fall back to the technology desk. */
function topicOf(value: string) {
  const key = value as EnquiryTopic;
  return TOPIC_COPY[key] ?? TOPIC_COPY.technology;
}
const BUDGETS = [
  "Not a paid project",
  "Under KES 100,000",
  "KES 100,000 – 500,000",
  "Above KES 500,000",
  "Prefer to discuss",
];
const CHANNELS = ["Email", "WhatsApp", "Phone call"];

type Fields = {
  name: string;
  email: string;
  organisation: string;
  channel: string;
  topic: EnquiryTopic;
  budget: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  organisation: "",
  channel: "Email",
  topic: "technology",
  budget: "",
  message: "",
};

export default function Contact() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ reference: string; routedTo: string } | null>(null);
  const mutation = trpc.site.enquiry.useMutation();

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setF(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const topic = TOPICS.includes(f.topic) ? f.topic : "technology";
    const parsed = enquirySchema.safeParse({
      ...f,
      topic,
      website: trap,
      sourcePath: "/contact",
    });
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = String(issue.path[0] ?? "form");
        if (!flat[path]) flat[path] = issue.message;
      }
      setErrors(flat);
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data, {
      onSuccess: data => {
        setResult({ reference: data.reference, routedTo: data.routedTo });
        setF(EMPTY);
      },
    });
  };

  const err = (k: keyof Fields) => (errors[k] ? <span className="slate mt-2 block" style={{ color: "#a4262c" }}>{errors[k]}</span> : null);

  return (
    <>
      <Meta
        title="Contact"
        description="Talk to Enosx Technologies in Nairobi. Enquiries are routed to the right desk — technology, services and reports, partnerships or press — and answered by a person."
        path="/contact"
      />

      <Reel id="commerce" label="A customer and the shopkeeper at a Kenyan electronics counter" scrim="ink">
        <div
          className="wrap on-media"
          style={{ paddingTop: "clamp(6rem, 12vw, 10rem)", paddingBottom: "clamp(3.5rem, 7vw, 6rem)" }}
        >
          <Slate no="Reel 07" items={["Contact desk", "Answered by a person", brand.city]} tone="media" className="mb-7" />
          <MaskLines as="h1" lines={[<span key="a">Say what you</span>, <span key="b">want to be true.</span>]} />
        </div>
      </Reel>

      <Band>
        <div className="wrap">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            {/* ------------------------------------------------------ form */}
            <div>
              <Slate no="01" items={["Enquiry", "Stored in our database", "Reference issued"]} className="mb-8" />
              {result ? (
                <Reveal>
                  <div className="stack-hair">
                    <div className="py-6 first:pt-0">
                      <span className="slate slate-teal">Received</span>
                      <h2 className="mt-4">Logged as {result.reference}</h2>
                      <p className="body-muted mt-4" style={{ maxWidth: "46ch" }}>
                        Your enquiry is in the desk and routed to{" "}
                        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                          {result.routedTo}
                        </span>
                        . Quote the reference if you follow up on WhatsApp — it reaches the same list.
                      </p>
                    </div>
                    <div className="py-6 slate-row">
                      <a className="btn" href={`mailto:${result.routedTo}?subject=${encodeURIComponent(`ENQUIRY ${result.reference}`)}`}>
                        Send it by mail too <Arrow />
                      </a>
                      <a className="btn" href="https://wa.me/254798303978" target="_blank" rel="noreferrer noopener">
                        WhatsApp the reference
                      </a>
                    </div>
                    <div className="py-6">
                      <button className="tlink" type="button" onClick={() => setResult(null)}>
                        Write another
                      </button>
                    </div>
                  </div>
                </Reveal>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label className="lbl" htmlFor="c-name">Your name</label>
                      <input id="c-name" className="field" value={f.name} onChange={e => set("name", e.target.value)} autoComplete="name" />
                      {err("name")}
                    </div>
                    <div>
                      <label className="lbl" htmlFor="c-email">Email</label>
                      <input id="c-email" className="field" type="email" value={f.email} onChange={e => set("email", e.target.value)} autoComplete="email" placeholder="you@company.com" />
                      {err("email")}
                    </div>
                    <div>
                      <label className="lbl" htmlFor="c-org">Organisation (optional)</label>
                      <input id="c-org" className="field" value={f.organisation} onChange={e => set("organisation", e.target.value)} autoComplete="organization" />
                    </div>
                    <div>
                      <label className="lbl" htmlFor="c-channel">Best way to reach you</label>
                      <select id="c-channel" className="field" value={f.channel} onChange={e => set("channel", e.target.value)}>
                        {CHANNELS.map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="lbl" htmlFor="c-topic">Desk</label>
                      <select
                        id="c-topic"
                        className="field"
                        value={TOPICS.includes(f.topic) ? f.topic : "technology"}
                        onChange={e => set("topic", e.target.value as EnquiryTopic)}
                      >
                        {TOPICS.map(t => (
                          <option key={t} value={t}>
                            {TOPIC_COPY[t].label}
                          </option>
                        ))}
                      </select>
                      <p className="slate mt-2" style={{ textTransform: "none", letterSpacing: "0.05em" }}>
                        → {topicOf(f.topic).routesTo}
                      </p>
                    </div>
                    <div>
                      <label className="lbl" htmlFor="c-budget">Indicative budget (optional)</label>
                      <select id="c-budget" className="field" value={f.budget} onChange={e => set("budget", e.target.value)}>
                        <option value="">Leave blank</option>
                        {BUDGETS.map(b => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-7">
                    <label className="lbl" htmlFor="c-message">What should feel instant?</label>
                    <textarea
                      id="c-message"
                      className="field"
                      rows={7}
                      value={f.message}
                      onChange={e => set("message", e.target.value)}
                      placeholder="Which product, which workflow, which deadline — and what happens today instead."
                    />
                    {err("message")}
                  </div>
                  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={e => setTrap(e.target.value)} />
                  <div className="mt-8 slate-row">
                    <button className="btn btn-primary" type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? "Sending" : "Send to the desk"} <Arrow />
                    </button>
                    <span className="slate" style={mutation.error ? { color: "#a4262c" } : undefined}>
                      {mutation.error
                        ? mutation.error.message
                        : "We publish no marketing newsletter from this form and we do not sell the list."}
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* ---------------------------------------------------- sidebar */}
            <div>
              <Reveal delay={120}>
                <div className="stack-hair">
                  <div className="py-6 first:pt-0">
                    <span className="slate">01 · Direct line</span>
                    <p className="pull mt-3">
                      <a href="https://wa.me/254798303978" className="hover:text-ink">
                        +254 798 303 978
                      </a>
                    </p>
                    <p className="body-muted mt-2" style={{ fontSize: "0.95rem" }}>
                      WhatsApp, calls and SMS. Nairobi time (UTC+3).
                    </p>
                  </div>
                  <div className="py-6">
                    <span className="slate">02 · Technology</span>
                    <p className="pull mt-3">
                      <a href="mailto:enosxtech@gmail.com" className="hover:text-ink">
                        enosxtech@gmail.com
                      </a>
                    </p>
                  </div>
                  <div className="py-6">
                    <span className="slate">03 · Services &amp; reports</span>
                    <p className="pull mt-3">
                      <a href="mailto:enosxservices@gmail.com" className="hover:text-ink">
                        enosxservices@gmail.com
                      </a>
                    </p>
                  </div>
                  <div className="py-6">
                    <span className="slate">04 · Company</span>
                    <p className="pull mt-3">
                      <a href="mailto:hello@enosx.tech" className="hover:text-ink">
                        hello@enosx.tech
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-12">
                  <span className="slate">What happens next</span>
                  <ol className="mt-4 grid gap-4 p-0 pl-5" style={{ listStyle: "none" }}>
                    {[
                      "The desk file gets a reference code and a destination address.",
                      "A person reads it — the founder for strategy, the relevant lead otherwise.",
                      "You get a reply that says what is real, what is demo and what is next.",
                    ].map((s, i) => (
                      <li key={s} className="grid grid-cols-[2rem_1fr] gap-3">
                        <span className="hanging-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="body-muted" style={{ fontSize: "0.96rem" }}>
                          {s}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <Reel
                  id="signal"
                  label="Signal field: contact nodes linking on newsprint"
                  scrim="none"
                  frame={false}
                  grain={false}
                  className="reel-box mt-12"
                />
                <p className="slate mt-3" style={{ textTransform: "none", letterSpacing: "0.05em" }}>
                  Twelve documented accounts.{" "}
                  <a className="tlink" href="/accounts">
                    See the register
                  </a>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Band>

      <Band tone="paper-2">
        <div className="wrap">
          <SectionHead
            no="02"
            meta={["Before you write", "Expectations", "Honest ones"]}
            title={["We answer in order", "of ownership."]}
            lede="Grace owns research and design questions, Tracey owns growth and community, Vince owns the founder’s calendar, Faith owns follow-through. Your message still lands on one list — but it does not sit there."
          />
        </div>
      </Band>
    </>
  );
}
