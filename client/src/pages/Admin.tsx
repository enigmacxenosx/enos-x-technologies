import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { MaskLines } from "@/components/cinema/Reveal";
import { Band } from "@/components/Editorial";
import Slate from "@/components/Slate";
import Meta from "@/components/Meta";
import type { EnquiryTopic } from "@shared/enquiry";

const STATUSES = ["new", "read", "answered", "archived"] as const;

function when(value: string | Date | null | undefined) {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return `${d.toISOString().slice(0, 10)} ${d.toISOString().slice(11, 16)}Z`;
}

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const isAdmin = user?.role === "admin";

  const enquiries = trpc.admin.enquiries.useQuery({ limit: 100 }, { enabled: Boolean(isAdmin) });
  const signals = trpc.admin.signals.useQuery(undefined, { enabled: Boolean(isAdmin) });
  const events = trpc.admin.recentEvents.useQuery(undefined, { enabled: Boolean(isAdmin) });
  const utils = trpc.useUtils();
  const setStatus = trpc.admin.setEnquiryStatus.useMutation({
    onSuccess: () => utils.admin.enquiries.invalidate(),
  });

  return (
    <>
      <Meta title="Owner desk" description="Private enquiry desk for Enosx Technologies." path="/admin" />
      <Band>
        <div className="wrap" style={{ minHeight: "60vh" }}>
          <Slate no="Private" items={["Owner desk", "Authenticated session required"]} className="mb-8" />

          {loading ? (
            <p className="slate">Checking the session…</p>
          ) : !isAuthenticated ? (
            <div>
              <MaskLines as="h1" lines={[<span key="a">Owner</span>, <span key="b">desk.</span>]} />
              <p className="pull mt-8" style={{ maxWidth: "44ch" }}>
                Sign in with the Manus account that owns this workspace. Submissions are only ever
                listed for that session — nothing here is public.
              </p>
              <div className="mt-8 slate-row">
                <button className="btn btn-primary" type="button" onClick={() => startLogin()}>
                  Sign in
                </button>
                <Link className="btn" href="/">
                  Back to the film
                </Link>
              </div>
            </div>
          ) : !isAdmin ? (
            <div>
              <MaskLines as="h1" lines={[<span key="a">Not this</span>, <span key="b">account.</span>]} />
              <p className="pull mt-8" style={{ maxWidth: "46ch" }}>
                You are signed in{user?.email ? ` as ${user.email}` : ""}, but this desk belongs to the
                workspace owner (role: admin). Log in with the owner account to read submissions.
              </p>
              <div className="mt-8">
                <Link className="btn" href="/">
                  Back to the film
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <MaskLines as="h1" lines={[<span key="a">The desk.</span>]} />
              <div className="slate-row mt-6 justify-between">
                <span className="slate">
                  Signed in as {user?.name || user?.email || user?.openId}
                </span>
                <span className="slate slate-teal">
                  {signals.data?.ready
                    ? `${signals.data.enquiries} enquiries · ${signals.data.signups} subscriptions · ${signals.data.accountEvents} account interactions`
                    : "Database not attached in this environment"}
                </span>
              </div>

              <div className="mt-10 overflow-x-auto">
                <table className="tbl" style={{ minWidth: "72rem" }}>
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Received</th>
                      <th>From</th>
                      <th>Desk</th>
                      <th>Message</th>
                      <th>Routed</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.isLoading ? (
                      <tr>
                        <td colSpan={7} className="slate">
                          Loading…
                        </td>
                      </tr>
                    ) : enquiries.data?.length ? (
                      enquiries.data.map(e => (
                        <tr key={e.id}>
                          <td style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>{e.reference}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{when(e.createdAt)}</td>
                          <td>
                            <strong style={{ fontWeight: 600 }}>{e.name}</strong>
                            <br />
                            <a className="slate" href={`mailto:${e.email}`}>
                              {e.email}
                            </a>
                            {e.organisation ? (
                              <>
                                <br />
                                <span className="slate">{e.organisation}</span>
                              </>
                            ) : null}
                          </td>
                          <td className="slate">{e.topic}</td>
                          <td style={{ maxWidth: "30rem" }}>
                            <span style={{ fontSize: "0.92rem" }}>{e.message}</span>
                            {e.budget ? (
                              <span className="slate mt-2 block">Budget: {e.budget}</span>
                            ) : null}
                            {e.channel ? (
                              <span className="slate mt-1 block">Reply via: {e.channel}</span>
                            ) : null}
                          </td>
                          <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{e.routedTo}</td>
                          <td>
                            <div className="slate-row" style={{ gap: "0.4rem" }}>
                              {STATUSES.map(s => (
                                <button
                                  key={s}
                                  type="button"
                                  className="copybtn"
                                  data-done={e.status === s ? "1" : "0"}
                                  disabled={setStatus.isPending}
                                  onClick={() => setStatus.mutate({ id: e.id, status: s })}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="body-muted">
                          No submissions yet. Use the contact desk and this table stops being empty —
                          which is the honest state of a new site.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-16 grid gap-12 lg:grid-cols-2">
                <div>
                  <span className="slate mb-4 block">Account interactions (anonymised)</span>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>Action</th>
                        <th>At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.data?.length ? (
                        events.data.map(ev => (
                          <tr key={ev.id}>
                            <td style={{ fontFamily: "var(--font-mono)" }}>{ev.accountKey}</td>
                            <td className="slate">{ev.action}</td>
                            <td>{when(ev.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="body-muted">
                            Nothing recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div>
                  <span className="slate mb-4 block">Most-used account</span>
                  {signals.data?.byAccount?.length ? (
                    <ul className="stack-hair m-0 p-0" style={{ listStyle: "none" }}>
                      {[...signals.data.byAccount]
                        .sort((a, b) => b.n - a.n)
                        .map(r => (
                          <li key={r.key} className="grid grid-cols-[1fr_auto] py-3">
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.86rem" }}>{r.key}</span>
                            <span className="slate slate-teal">{r.n}×</span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="body-muted">No interactions recorded yet.</p>
                  )}
                  <p className="slate mt-6" style={{ textTransform: "none", letterSpacing: "0.05em" }}>
                    Topics in the register: {("technology" as EnquiryTopic)}, services, partnership,
                    support, press, other.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Band>
    </>
  );
}
