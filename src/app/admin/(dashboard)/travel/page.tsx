"use client";

import { useEffect, useState } from "react";
import {
  Plane, Mail, Send, Loader2, CheckCircle2, AlertTriangle, Search, Copy, Eye,
} from "lucide-react";

type Recipient = {
  confirmationCode: string;
  email: string;
  name: string;
  firstName: string;
  organisation: string;
  country: string;
  submitted: boolean;
  hasFlightInfo: boolean;
  hasHotel: boolean;
  formLink: string;
  duplicatesSkipped: number;
};

type SendResult = {
  email: string;
  confirmationCode: string;
  ok: boolean;
  error?: string;
};

export default function AdminTravelPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [duplicates, setDuplicates] = useState(0);
  const [maxBatch, setMaxBatch] = useState(5);
  const [resendConfigured, setResendConfigured] = useState(true);
  const [deadline, setDeadline] = useState("");

  const [search, setSearch] = useState("");
  const [skipSubmitted, setSkipSubmitted] = useState(true);
  const [testEmail, setTestEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SendResult[]>([]);
  const [testSent, setTestSent] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/travel-request")
      .then(async r => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Failed to load recipients");
        setRecipients(d.recipients || []);
        setDuplicates(d.duplicatesCollapsed || 0);
        setMaxBatch(d.maxBatch || 5);
        setResendConfigured(Boolean(d.resendConfigured));
        setDeadline(d.defaultDeadline || "");
        setError(null);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  };

  useEffect(load, []);

  /** Who a real send would actually go to, after the "skip submitted" toggle. */
  const targets = recipients.filter(r => !(skipSubmitted && r.submitted));
  const visible = targets.filter(r =>
    `${r.name} ${r.email} ${r.organisation} ${r.country}`.toLowerCase().includes(search.toLowerCase())
  );

  const runSend = async (codes: string[], asTest?: string) => {
    setBusy(true);
    setResults([]);
    setProgress(0);
    const collected: SendResult[] = [];
    try {
      for (let i = 0; i < codes.length; i += maxBatch) {
        const batch = codes.slice(i, i + maxBatch);
        const res = await fetch("/api/admin/travel-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codes: batch,
            ...(asTest && { testEmail: asTest }),
            ...(deadline.trim() && { deadline: deadline.trim() }),
          }),
        });
        const d = await res.json();
        if (!res.ok) throw new Error(d.error ? JSON.stringify(d.error) : "Send failed");
        collected.push(...(d.results || []));
        setResults([...collected]);
        setProgress(Math.min(i + batch.length, codes.length));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const sendTest = async () => {
    if (!testEmail.trim()) { alert("Enter an email address to receive the test."); return; }
    const first = targets[0];
    if (!first) { alert("No recipients to build a test from."); return; }
    await runSend([first.confirmationCode], testEmail.trim());
    setTestSent(true);
  };

  const sendAll = async () => {
    if (!testSent) {
      alert("Send yourself a test first — step 2 unlocks once a test has gone out.");
      return;
    }
    if (!confirm(
      `Email ${targets.length} international delegate${targets.length !== 1 ? "s" : ""} asking for flight and hotel details?\n\n` +
      "These are real delegates and the emails cannot be recalled."
    )) return;
    if (!confirm(`Final confirmation — email all ${targets.length} delegates now?`)) return;
    setTestSent(false);
    await runSend(targets.map(r => r.confirmationCode));
    load();
  };

  const succeeded = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok);
  const isTestRun = results.length === 1 && Boolean(testEmail) && results[0]?.email === testEmail.trim();
  const submittedCount = recipients.filter(r => r.submitted).length;

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#0D3B66]/10 flex items-center justify-center flex-shrink-0">
          <Plane size={20} className="text-[#0D3B66]" />
        </div>
        <div>
          <h1 className="font-bold text-2xl text-gray-900">Travel &amp; Hotel Details Request</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Emails international delegates a personal link to submit their flight and accommodation details.
            Answers save straight into the registration record.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 mb-5">
          <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 break-words">{error}</p>
        </div>
      )}

      {!loading && !resendConfigured && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 flex gap-3 mb-5">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">RESEND_API_KEY is not set on the server — no email can be sent.</p>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" /> Loading recipients…
        </p>
      ) : (
        <div className="space-y-5">
          {/* Summary */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900">{recipients.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">International delegates (non-Zimbabwe)</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-700">{submittedCount}</p>
              <p className="text-xs text-gray-500 mt-0.5">Already submitted the travel form</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#0D3B66]">{targets.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Will receive this email</p>
            </div>
          </div>

          {duplicates > 0 && (
            <p className="text-xs text-gray-600">
              {duplicates} duplicate record{duplicates !== 1 ? "s" : ""} collapsed — one email per address, using each
              delegate&apos;s most recent registration.
            </p>
          )}

          {/* Options */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Options</p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={skipSubmitted}
                onChange={e => setSkipSubmitted(e.target.checked)}
                className="mt-0.5 accent-[#0D3B66] w-4 h-4"
              />
              <span className="text-sm text-gray-800">
                Skip delegates who have already submitted the form
                <span className="block text-xs text-gray-500">Uncheck to email everyone again, including those who replied.</span>
              </span>
            </label>
            <div>
              <label className="block text-sm text-gray-800 mb-1.5">Deadline shown in the email</label>
              <input
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                placeholder="e.g. 15 September 2026"
                className="w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Step 1 — test */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Step 1 — send yourself a test</p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="email"
                value={testEmail}
                onChange={e => setTestEmail(e.target.value)}
                placeholder="your.name@icz.co.zw"
                className="flex-1 min-w-[220px] border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={sendTest}
                disabled={busy || !resendConfigured || targets.length === 0}
                className="flex items-center gap-2 border border-[#0D3B66] text-[#0D3B66] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0D3B66]/5 disabled:opacity-50"
              >
                <Mail size={16} /> Send test
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Uses {targets[0]?.name || "the first delegate"}&apos;s details and link, but delivers only to the address above.
              Click the button in the test email to check the form opens correctly.
            </p>
          </div>

          {/* Step 2 — real send */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Step 2 — send to delegates</p>
            <button
              onClick={sendAll}
              disabled={busy || !resendConfigured || targets.length === 0 || !testSent}
              className="flex items-center gap-2 bg-[#0D3B66] hover:bg-[#1D4E89] text-white px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {busy ? `Sending… ${progress}/${targets.length}` : `Send to ${targets.length} delegate${targets.length !== 1 ? "s" : ""}`}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              {testSent
                ? "Sent in batches with a pause between each to respect rate limits. Do not close this window while sending."
                : "Locked until you have sent yourself a test above."}
            </p>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-[#F8F9FA] px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                {failed.length === 0
                  ? <CheckCircle2 size={16} className="text-green-600" />
                  : <AlertTriangle size={16} className="text-amber-600" />}
                <p className="text-sm font-semibold text-gray-900">
                  {isTestRun ? "Test sent" : `${succeeded} sent`}
                  {failed.length > 0 && ` · ${failed.length} failed`}
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                {results.map((r, i) => (
                  <div key={r.confirmationCode + i} className="px-4 py-2.5 flex items-start gap-3">
                    {r.ok
                      ? <CheckCircle2 size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
                      : <AlertTriangle size={15} className="text-red-600 flex-shrink-0 mt-0.5" />}
                    <div className="min-w-0">
                      <p className="text-sm text-gray-900 truncate">{r.email}</p>
                      <p className="text-xs text-gray-500">{r.confirmationCode}</p>
                      {r.error && <p className="text-xs text-red-600 mt-0.5 break-words">{r.error}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipient list */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3 flex-wrap">
              <p className="text-sm font-semibold text-gray-900 flex-1">
                Recipients ({visible.length})
              </p>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search name, email, country…"
                  className="border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-sm w-64"
                />
              </div>
            </div>
            <div className="max-h-[28rem] overflow-y-auto divide-y divide-gray-100">
              {visible.map(r => (
                <div key={r.confirmationCode} className="px-4 py-3 flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{r.name}</p>
                    <p className="text-xs text-gray-500 truncate">{r.email} · {r.organisation} · {r.country}</p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-[11px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{r.confirmationCode}</span>
                      {r.submitted && <span className="text-[11px] bg-green-100 text-green-800 px-2 py-0.5 rounded">form submitted</span>}
                      {r.hasFlightInfo && <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded">has flight info</span>}
                      {r.hasHotel && <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded">has hotel</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <a
                      href={r.formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open this delegate's form"
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                    >
                      <Eye size={15} />
                    </a>
                    <button
                      onClick={() => { navigator.clipboard.writeText(r.formLink); }}
                      title="Copy this delegate's link"
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                </div>
              ))}
              {visible.length === 0 && (
                <p className="px-4 py-6 text-sm text-gray-500">
                  No international delegates match. {skipSubmitted && submittedCount > 0 && "Everyone may have submitted already — untick the skip option to see them."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
