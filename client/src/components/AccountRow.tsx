import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ACCOUNT_EVENT_KEYS, type AccountEventKey } from "@shared/enquiry";
import type { Account } from "@/data/site";

/**
 * AccountRow — one documented ENOSX account. Copying is a real clipboard write
 * with a legacy fallback; the interaction is counted server-side under a stable
 * key only (no IP, no UA, no fingerprint), which is what makes the public
 * "people actually used this" figure honest.
 */
export default function AccountRow({
  account,
  index,
  count,
}: {
  account: Account;
  index: number;
  count?: number;
}) {
  if (!(ACCOUNT_EVENT_KEYS as readonly string[]).includes(account.key)) {
    // A data entry without a registered key still renders, it simply is not counted.
    return <StaticAccountRow account={account} index={index} />;
  }
  const [done, setDone] = useState(false);
  const event = trpc.site.accountEvent.useMutation();

  const ping = (action: "copy" | "open") => {
    event.mutate({ accountKey: account.key as AccountEventKey, action });
  };

  const copy = async () => {
    const text = account.copy ?? account.value;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setDone(true);
      ping("copy");
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      window.prompt("Copy this address", text);
    }
  };

  const numeric = index + 1;

  return (
    <div className="acct">
      <span className="acct__kind slate">
        <span className="slate-tick teal" aria-hidden="true" />
        {account.kind}
      </span>
      <span>
        <a
          className="pull block hover:text-ink transition-colors"
          href={account.href}
          target={account.href.startsWith("http") ? "_blank" : undefined}
          rel={account.href.startsWith("http") ? "noreferrer noopener" : undefined}
          onClick={() => ping("open")}
        >
          {account.value}
        </a>
        <span className="slate" style={{ letterSpacing: "0.14em", textTransform: "none" }}>
          {String(numeric).padStart(2, "0")} · {account.label} — {account.note}
          {count && count > 0 ? ` · used ${count}×` : ""}
        </span>
      </span>
      <button
        type="button"
        className="copybtn"
        data-done={done ? "1" : "0"}
        onClick={copy}
        aria-label={`Copy ${account.label}: ${account.value}`}
      >
        {done ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/** Rendered when a data row has no registered counter key: no mutation, no count. */
function StaticAccountRow({ account, index }: { account: Account; index: number }) {
  return (
    <div className="acct">
      <span className="acct__kind slate">
        <span className="slate-tick teal" aria-hidden="true" />
        {account.kind}
      </span>
      <span>
        <a
          className="pull block"
          href={account.href}
          target={account.href.startsWith("http") ? "_blank" : undefined}
          rel={account.href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          {account.value}
        </a>
        <span className="slate" style={{ letterSpacing: "0.14em", textTransform: "none" }}>
          {String(index + 1).padStart(2, "0")} · {account.label} — {account.note}
        </span>
      </span>
      <span className="copybtn" style={{ cursor: "default" }}>
        {account.value}
      </span>
    </div>
  );
}
