import { useMemo, useState } from "react";
import Reel from "@/components/cinema/Reel";
import { MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, Band, SectionHead, Stat } from "@/components/Editorial";
import Slate from "@/components/Slate";
import AccountRow from "@/components/AccountRow";
import Meta from "@/components/Meta";
import { accounts, brand } from "@/data/site";
import { TOPIC_COPY, type EnquiryTopic } from "@shared/enquiry";
import { trpc } from "@/lib/trpc";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [note, setNote] = useState("");
  const mutation = trpc.site.newsletter.useMutation({
    onError: err => setNote(err.message),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(email.trim())) {
      setNote("That address does not look complete.");
      return;
    }
    setNote("");
    mutation.mutate(
      { email: email.trim(), website: trap, sourcePath: "/accounts" },
      { onSuccess: () => setStatus("sent") }
    );
  };

  return (
    <form onSubmit={submit} className="mt-8">
      <label className="lbl" htmlFor="nl-email">
        Release notes, occasionally
      </label>
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[16rem] flex-1">
          <input
            id="nl-email"
            className="field"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={mutation.isPending}>
          {status === "sent" ? "Noted" : mutation.isPending ? "Sending" : "Subscribe"} <Arrow />
        </button>
      </div>
      {/* honeypot: invisible to people, irresistible to bots */}
      <input
        className="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={trap}
        onChange={e => setTrap(e.target.value)}
      />
      <p className="slate mt-4" style={{ textTransform: "none", letterSpacing: "0.06em" }}>
        {status === "sent"
          ? "Saved. You will hear from us when something ships — nothing else."
          : note
            ? note
            : "One address, stored in this site’s own database. No third-party tracker is involved."}
      </p>
    </form>
  );
}

export default function Accounts() {
  const signals = trpc.site.signals.useQuery(undefined, { retry: false });
  const counts = useMemo(
    () => new Map<string, number>((signals.data?.byAccount ?? []).map(r => [r.key, r.n])),
    [signals.data]
  );
  const groups = useMemo(() => {
    const order = ["Email", "WhatsApp", "Instagram", "GitHub", "Web", "Domain"];
    return order
      .map(kind => ({ kind, items: accounts.filter(a => a.kind === kind) }))
      .filter(g => g.items.length);
  }, []);

  return (
    <>
      <Meta
        title="Accounts"
        description="Every documented Enosx Technologies account: enosxtech@gmail.com for technology, enosxservices@gmail.com for services and reports, hello@enosx.tech, the WhatsApp line, Instagram, GitHub, live properties and domains."
        path="/accounts"
      />

      <Reel
        id="signal"
        label="Signal field: contact nodes and proximity links drifting on newsprint"
        scrim="none"
        frame={false}
        grain={false}
      >
        <div className="wrap" style={{ paddingTop: "clamp(6rem, 13vw, 11rem)", paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <Slate no="Reel 05" items={["Accounts", "Contact", "Documented"]} className="mb-8" />
          <MaskLines as="h1" lines={[<span key="a">Every</span>, <span key="b">channel.</span>]} />
          <Reveal delay={200}>
            <p className="lede mt-8" style={{ maxWidth: "34ch" }}>
              Two mailboxes split by purpose, one direct line, and the properties we actually operate.
            </p>
          </Reveal>
        </div>
      </Reel>

      <Band>
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <SectionHead
                no="01"
                meta={["The register", `${accounts.length} accounts`]}
                title={["Read this", "before you write."]}
                lede="Mail addressed to the right desk gets answered by the person who owns that desk. Technology and product go to enosxtech, services and reports go to enosxservices, everything corporate goes to hello."
              />
              <Reveal delay={140}>
                <p className="pull mt-8" style={{ maxWidth: "44ch" }}>
                  If a profile claims to be Enosx Technologies on X, LinkedIn, TikTok, Facebook,
                  YouTube or Telegram — it is not us. We have published accounts, and these are they.
                </p>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <div className="grid grid-cols-2 gap-8">
                <Stat value={String(counts.size)} label="Accounts with recorded use" />
                <Stat
                  value={signals.data?.ready ? String(signals.data.accountEvents) : "—"}
                  label="Interactions counted here"
                />
                <Stat
                  value={signals.data?.ready ? String(signals.data.enquiries) : "—"}
                  label="Enquiries through the desk"
                />
                <Stat
                  value={signals.data?.ready ? String(signals.data.signups) : "—"}
                  label="Release-note subscriptions"
                />
              </div>
              <p className="slate mt-6" style={{ textTransform: "none", letterSpacing: "0.05em" }}>
                {signals.data?.ready
                  ? "These four numbers come from this site’s own database. They start at zero and we are not embarrassed by that."
                  : "The database is not attached in this preview, so the counters read — instead of a made-up figure."}
              </p>
              <Newsletter />
            </Reveal>
          </div>
        </div>
      </Band>

      <Band tone="paper-2" id="register">
        <div className="wrap">
          <div className="stack-hair">
            {groups.map((g, gi) => (
              <Reveal key={g.kind} delay={gi * 60}>
                <div className="py-12 first:pt-0">
                  <div className="slate-row mb-5">
                    <span className="hanging-num">{String(gi + 1).padStart(2, "0")}</span>
                    <span className="slate">{g.kind}</span>
                    <span className="slate-bar" aria-hidden="true" />
                    <span className="slate slate-teal">{g.items.length} listed</span>
                  </div>
                  {g.items.map((a, i) => (
                    <AccountRow key={a.key} account={a} index={i} count={counts.get(a.key)} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      <Band id="routing">
        <div className="wrap">
          <SectionHead
            no="03"
            meta={["Routing", "Contact desk", "Server-decided"]}
            title={["Where your message", "is going."]}
            lede="The enquiry form on /contact does not send to one general inbox. The topic you pick decides the destination, and the rule lives on the server."
          />
          <Reveal delay={140}>
            <div className="mt-12 overflow-x-auto">
              <table className="tbl" style={{ minWidth: "46rem" }}>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Routes to</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(TOPIC_COPY) as EnquiryTopic[]).map(t => (
                    <tr key={t}>
                      <td>
                        <span className="slate">{TOPIC_COPY[t].label}</span>
                      </td>
                      <td style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                        {TOPIC_COPY[t].routesTo}
                      </td>
                      <td className="body-muted">{TOPIC_COPY[t].note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="slate-row mt-10">
              <a className="btn btn-primary" href="/contact">
                Use the desk <Arrow />
              </a>
              <a className="btn" href="https://wa.me/254798303978" target="_blank" rel="noreferrer noopener">
                WhatsApp +254 798 303 978
              </a>
              <span className="slate">{brand.city}</span>
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
