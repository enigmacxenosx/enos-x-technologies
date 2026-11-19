import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Enos X Technologies" },
      { name: "description", content: "Start a project with Enos X Technologies." },
      { property: "og:title", content: "Contact Enos X Technologies" },
      { property: "og:description", content: "Tell us what you're building." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-sm border border-input bg-card px-4 py-3 outline-none focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-32 pt-40 md:grid-cols-2">
      <Reveal>
        <h1 className="text-6xl font-black leading-[0.95] md:text-7xl">Let's talk.</h1>
        <p className="mt-6 text-lg text-muted-foreground">hello@enosx.tech<br />Nairobi, Kenya</p>
      </Reveal>
      <Reveal>
        {sent ? (
          <div className="rounded-md border border-primary bg-card p-10 text-xl">Thanks — we'll be in touch within one business day.</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <input required placeholder="Name" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <textarea required rows={5} placeholder="Tell us about your project" className={field} />
            <button className="rounded-sm bg-primary px-8 py-4 font-semibold text-primary-foreground">Send message</button>
          </form>
        )}
      </Reveal>
    </div>
  );
}
