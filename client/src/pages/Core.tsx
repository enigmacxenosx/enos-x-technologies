import { Link } from "wouter";
import Reel from "@/components/cinema/Reel";
import { LineWipe, MaskLines, Reveal } from "@/components/cinema/Reveal";
import { Arrow, ArrowLink, Band, SectionHead, Stat } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";
import { brand, modes, products } from "@/data/site";

const LEDGER = [
  ["Input", "Documents, PDFs, images, audio and video attached to a conversation"],
  ["Output", "Text, generated images, generated video, PDF, Word, Excel and Markdown"],
  ["Voice", "Speech-to-text and text-to-speech where the browser supports it"],
  ["Search", "Live web retrieval with cited sources"],
  ["Memory", "Long-term memory, knowledge bank and conversation branching"],
  ["Connectors", "GitHub, Shopify, Vercel and Email"],
  ["Lab", "GOD MODE developer tools and document export"],
  ["Interface", "Eight languages, including Kiswahili, Luhya and Nandi"],
];

const CONTROLS = [
  ["Temperature", "Determinism when you need it, range when you do not"],
  ["Context window", "How much of the conversation the model may see"],
  ["Max output", "A ceiling on the answer, not a surprise"],
  ["Top-p", "Nucleus sampling, exposed instead of hidden"],
];

const PROCESSING = [
  ["Local AI", "Model and context stay on the device"],
  ["Hybrid AI", "On-device first; escalate deliberately"],
  ["Private Cloud AI", "Declared boundary, our inference, your context"],
  ["No AI", "The same interface with intelligence off"],
];

export default function Core() {
  const ai = products[0];
  const core = products[1];

  return (
    <>
      <Meta
        title="Private AI"
        description="ENOSX AI and ENOSX Core: a multimodal assistant with three reasoning modes and a private inference posture where your data stays on your machine."
        path="/core"
      />

      <Reel id="studio" label="Daylit studio, two developers working at one screen, slow push-in" scrim="ink">
        <div className="wrap on-media" style={{ paddingTop: "clamp(6rem, 13vw, 11rem)", paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <Slate no="Reel 03" items={["ENOSX AI · ENOSX Core", "Multimodal", "Private by posture"]} tone="media" className="mb-8" />
          <MaskLines as="h1" lines={[<span key="a">Speed</span>, <span key="b">is UX.</span>]} />
          <Reveal delay={220}>
            <p className="lede mt-8" style={{ color: "#e6edf5", maxWidth: "34ch" }}>
              Every interaction should be quicker than the thought that started it. That is the
              principle the rest of this page is arguments for.
            </p>
          </Reveal>
        </div>
      </Reel>

      {/* ------------------------------------------------------- the modes */}
      <Band id="modes">
        <div className="wrap">
          <SectionHead
            no="01"
            meta={["Reasoning", "Three modes", "One workspace"]}
            title={["Choose how hard", "the machine thinks."]}
            lede="ENOSX AI is not one model pretending to be everything. Three named modes cover the ninety-percent answer, the drafted document and the decision that needs the whole context."
          />
          <div className="dossier mt-14">
            {modes.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <div className="dossier__row">
                  <span className="dossier__no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="dossier__title">{m.name}</h3>
                    <span className="slate slate-teal mt-3 block">{m.tone}</span>
                  </div>
                  <p className="dossier__desc">{m.body}</p>
                  <span className="slate" aria-hidden="true">
                    <Arrow />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------- capability ledger */}
      <Band tone="paper-2" id="ledger">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Slate no="02" items={["Capabilities", "Documented in source"]} className="mb-8" />
              <MaskLines as="h2" lines={[<span key="a">What the</span>, <span key="b">assistant touches.</span>]} />
              <Reveal delay={160}>
                <p className="body-muted mt-7" style={{ maxWidth: "42ch" }}>
                  {ai.detail}
                </p>
                <div className="mt-8">
                  <ArrowLink href={ai.link?.href ?? "https://enosxai.vercel.app"} external>
                    Open ENOSX AI
                  </ArrowLink>
                </div>
              </Reveal>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <Reveal delay={220}>
                  <Stat value="01" label="Web · Tauri desktop · PWA" />
                </Reveal>
                <Reveal delay={280}>
                  <Stat value="08" label="Interface languages" />
                </Reveal>
              </div>
            </div>

            <Reveal delay={120}>
              <ul className="stack-hair m-0 p-0" style={{ listStyle: "none" }}>
                {LEDGER.map(([k, v], i) => (
                  <li key={k} className="grid gap-2 py-5 md:grid-cols-[9rem_1fr] md:gap-6 md:items-baseline">
                    <span className="slate slate-teal">{String(i + 1).padStart(2, "0")} · {k}</span>
                    <span style={{ fontSize: "0.99rem" }}>{v}</span>
                  </li>
                ))}
              </ul>
              <LineWipe className="mt-8 block" />
              <p className="slate mt-4">
                Also in the build: follow-up suggestions, 1–5 response ratings, NVIDIA VSR upscaling
                bridge, local Ollama models, and a lab area for experimental tools.
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------------ ENOSX Core */}
      <Band tone="ink" id="enosx-core">
        <div className="wrap">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <Slate no="03" items={["ENOSX Core", "Private inference layer"]} tone="media" className="mb-8" />
              <MaskLines as="h2" lines={[<span key="a">Your data is not</span>, <span key="b">a rounding error.</span>]} />
              <Reveal delay={160}>
                <p className="pull mt-8" style={{ color: "#cfd9e6", maxWidth: "40ch" }}>
                  {core.summary}
                </p>
                <p className="mt-5" style={{ color: "#9fb0c4", maxWidth: "54ch" }}>
                  {core.detail}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2">
                  {PROCESSING.map(([k, v], i) => (
                    <div key={k} className="border-l-0 py-3" style={{ borderTop: "1px solid rgba(251,250,247,0.2)" }}>
                      <span className="slate" style={{ color: "#fbfaf7" }}>
                        {String(i + 1).padStart(2, "0")} · {k}
                      </span>
                      <p className="mt-2" style={{ color: "#9fb0c4", fontSize: "0.94rem" }}>
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <Reel id="core" label="Compact compute device with a single lit indicator, slow push-in" scrim="none" className="reel-box" />
              <div className="mt-10">
                <span className="slate mb-4 block" style={{ color: "rgba(251,250,247,0.6)" }}>
                  Generation controls, exposed
                </span>
                <ul className="m-0 grid gap-3 p-0" style={{ listStyle: "none" }}>
                  {CONTROLS.map(([k, v]) => (
                    <li key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 items-baseline">
                      <span className="slate slate-teal">{k}</span>
                      <span style={{ color: "#cfd9e6", fontSize: "0.94rem" }}>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="slate mt-10" style={{ color: "rgba(251,250,247,0.55)" }}>
                Where it already runs: GGUF models imported inside Enosx Browser are stored on the
                device in IndexedDB; the ENOSX AI desktop shell can talk to a local Ollama endpoint.
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* -------------------------------------------------------- honesty */}
      <Band>
        <div className="wrap">
          <SectionHead
            no="04"
            meta={["Honesty", "How we report status"]}
            title={["We will tell you", "what is demo."]}
            lede="Enosx Browser is a preview: its local runtime reports “not connected” when nothing is listening, rather than pretending. That is the same rule we apply to every number on this site — we only publish figures our own systems can produce."
          />
          <div className="mt-12 slate-row">
            <Link className="btn btn-primary" href="/contact">
              Discuss a build <Arrow />
            </Link>
            <Link className="btn" href="/products">
              All six products
            </Link>
            <span className="slate">{brand.philosophy}</span>
          </div>
        </div>
      </Band>
    </>
  );
}
