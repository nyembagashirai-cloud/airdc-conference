"use client";
import { useState, useEffect } from "react";
import { Users, Download, Search, Mail, Building, X, Trash2, Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

type Registration = {
  id: string;
  civility?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  passportId?: string;
  organisation: string;
  jobTitle?: string;
  companyAddress?: string;
  country: string;
  delegateType: string;
  branchOfActivity?: string;
  visaInvitation?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  departureDate?: string;
  departureTime?: string;
  airlineCompany?: string;
  flightNumber?: string;
  confirmationCode?: string;
  paymentStatus?: string;
  createdAt: string;
};

function DetailModal({ reg, onClose }: { reg: Registration; onClose: () => void }) {
  const row = (label: string, value?: string | null) =>
    value ? (
      <div className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
        <span className="text-xs text-gray-500 w-40 flex-shrink-0 pt-0.5">{label}</span>
        <span className="text-sm text-gray-900 font-medium">{value}</span>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-xl text-gray-900">{reg.civility} {reg.firstName} {reg.lastName}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{reg.jobTitle} · {reg.organisation}</p>
            {reg.confirmationCode && (
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full tracking-widest">{reg.confirmationCode}</span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Personal Information</h3>
            {row("Email", reg.email)}
            {row("Phone", reg.phone)}
            {row("Passport / ID", reg.passportId)}
            {row("Country", reg.country)}
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Professional Details</h3>
            {row("Job Title", reg.jobTitle)}
            {row("Company", reg.organisation)}
            {row("Company Address", reg.companyAddress)}
            {row("Category", reg.delegateType?.replace(/_/g, " "))}
            {row("Branch of Activity", reg.branchOfActivity)}
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Visa & Travel</h3>
            {row("Visa Invitation Required", reg.visaInvitation)}
            {row("Arrival Date", reg.arrivalDate)}
            {row("Arrival Time", reg.arrivalTime)}
            {row("Departure Date", reg.departureDate)}
            {row("Departure Time", reg.departureTime)}
            {row("Airline", reg.airlineCompany)}
            {row("Flight Number", reg.flightNumber)}
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Registration Status</h3>
            {row("Payment Status", reg.paymentStatus)}
            {row("Registered On", new Date(reg.createdAt).toLocaleString())}
          </div>
          {reg.confirmationCode && (
            <div className="pt-2 border-t border-gray-100">
              <a
                href={`/api/invoice?code=${encodeURIComponent(reg.confirmationCode)}`}
                className="inline-flex items-center gap-2 bg-[#0D3B66] hover:bg-[#1D4E89] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <Download size={16} /> Download Invoice (PDF)
              </a>
              <p className="text-xs text-gray-500 mt-2">
                Proforma invoice with FBC banking details — same file that is emailed to the delegate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type Recipient = {
  confirmationCode: string;
  email: string;
  name: string;
  organisation: string;
  delegateLabel: string;
  fee: string;
  duplicatesSkipped: number;
};

type SendResult = {
  email: string;
  confirmationCode: string;
  ok: boolean;
  attached: boolean;
  error?: string;
};

function ResendPanel({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [duplicates, setDuplicates] = useState(0);
  const [maxBatch, setMaxBatch] = useState(4);
  const [resendConfigured, setResendConfigured] = useState(true);

  const [testEmail, setTestEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SendResult[]>([]);

  useEffect(() => {
    fetch("/api/register/resend")
      .then(async r => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Failed to load recipients");
        setRecipients(d.recipients || []);
        setDuplicates(d.duplicatesCollapsed || 0);
        setMaxBatch(d.maxBatch || 4);
        setResendConfigured(Boolean(d.resendConfigured));
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  /** Sends the given codes in throttled batches, streaming results into state. */
  const runSend = async (codes: string[], asTest?: string) => {
    setBusy(true);
    setResults([]);
    setProgress(0);
    const collected: SendResult[] = [];
    try {
      for (let i = 0; i < codes.length; i += maxBatch) {
        const batch = codes.slice(i, i + maxBatch);
        const res = await fetch("/api/register/resend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codes: batch, ...(asTest && { testEmail: asTest }) }),
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

  const sendTest = () => {
    if (!testEmail.trim()) { alert("Enter an email address to receive the test."); return; }
    const first = recipients[0];
    if (!first) return;
    runSend([first.confirmationCode], testEmail.trim());
  };

  const sendAll = () => {
    if (!confirm(
      `Send the confirmation email with invoice to ${recipients.length} delegates?\n\n` +
      `These are real delegates and the emails cannot be recalled.`
    )) return;
    if (!confirm(`Final confirmation — email all ${recipients.length} delegates now?`)) return;
    runSend(recipients.map(r => r.confirmationCode));
  };

  const succeeded = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok);
  const isTestRun = results.length === 1 && Boolean(testEmail) && results[0]?.email === testEmail.trim();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-xl text-gray-900">Resend confirmations with invoices</h2>
            <p className="text-sm text-gray-500 mt-1">
              Sends the confirmation email again, with the PDF invoice and banking details attached.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-5">
          {loading && (
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading recipients…
            </p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {!loading && !resendConfigured && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 flex gap-3">
              <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                RESEND_API_KEY is not set on the server — no email can be sent.
              </p>
            </div>
          )}

          {!loading && !error && recipients.length > 0 && (
            <>
              <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-900 font-semibold">
                  {recipients.length} recipient{recipients.length !== 1 ? "s" : ""}
                </p>
                {duplicates > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    {duplicates} duplicate record{duplicates !== 1 ? "s" : ""} collapsed — one email per address,
                    using each delegate&apos;s most recent registration.
                  </p>
                )}
              </div>

              {/* Step 1 — test */}
              <div className="border border-gray-200 rounded-lg p-4">
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
                    disabled={busy}
                    className="flex items-center gap-2 border border-[#0D3B66] text-[#0D3B66] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0D3B66]/5 disabled:opacity-50"
                  >
                    <Mail size={16} /> Send test
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Uses {recipients[0]?.name || "the first delegate"}&apos;s details but delivers only to the address above.
                </p>
              </div>

              {/* Step 2 — real send */}
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Step 2 — send to all delegates</p>
                <button
                  onClick={sendAll}
                  disabled={busy || !resendConfigured}
                  className="flex items-center gap-2 bg-[#0D3B66] hover:bg-[#1D4E89] text-white px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {busy ? `Sending… ${progress}/${recipients.length}` : `Send to all ${recipients.length} delegates`}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Sent in batches with a pause between each to respect rate limits. Do not close this window while sending.
                </p>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
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
                          <p className="text-xs text-gray-500">
                            {r.confirmationCode}
                            {r.ok && (r.attached ? " · invoice attached" : " · sent WITHOUT invoice")}
                          </p>
                          {r.error && <p className="text-xs text-red-600 mt-0.5 break-words">{r.error}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && !error && recipients.length === 0 && (
            <p className="text-sm text-gray-500">No registrations with confirmation codes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Registration | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    fetch("/api/register")
      .then(r => r.json())
      .then(data => { setRegistrations(data.registrations || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = registrations.filter(r =>
    `${r.firstName} ${r.lastName} ${r.email} ${r.organisation} ${r.country}`.toLowerCase().includes(search.toLowerCase())
  );

  // Checkbox helpers
  const allFilteredChecked = filtered.length > 0 && filtered.every(r => checkedIds.has(r.id));
  const someChecked = filtered.some(r => checkedIds.has(r.id));

  const toggleAll = () => {
    if (allFilteredChecked) {
      const next = new Set(checkedIds);
      filtered.forEach(r => next.delete(r.id));
      setCheckedIds(next);
    } else {
      const next = new Set(checkedIds);
      filtered.forEach(r => next.add(r.id));
      setCheckedIds(next);
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(checkedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setCheckedIds(next);
  };

  const deleteSelected = async () => {
    const ids = Array.from(checkedIds);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected registration${ids.length > 1 ? "s" : ""}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/register", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegistrations(prev => prev.filter(r => !checkedIds.has(r.id)));
        setCheckedIds(new Set());
        alert(`✅ ${data.deleted} registration${data.deleted !== 1 ? "s" : ""} deleted.`);
      } else {
        alert("Error: " + (data.error || "Failed to delete"));
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const deleteAll = async () => {
    if (!confirm(`⚠️ Delete ALL ${registrations.length} registrations? This cannot be undone.`)) return;
    if (!confirm("Second confirmation: Delete ALL registrations permanently?")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/register", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setRegistrations([]);
        setCheckedIds(new Set());
        alert(`✅ Done — ${data.deleted} registrations deleted.`);
      } else {
        alert("Error: " + (data.error || "Failed to delete"));
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const downloadCSV = () => {
    const headers = ["Civility","First Name","Last Name","Email","Phone","Passport/ID","Organisation","Job Title","Company Address","Country","Category","Branch","Visa Invitation","Arrival Date","Arrival Time","Departure Date","Departure Time","Airline","Flight No","Confirmation Code","Payment Status","Date Registered"];
    const rows = filtered.map(r => [
      r.civility,r.firstName,r.lastName,r.email,r.phone,r.passportId,r.organisation,r.jobTitle,
      r.companyAddress,r.country,r.delegateType,r.branchOfActivity,r.visaInvitation,
      r.arrivalDate,r.arrivalTime,r.departureDate,r.departureTime,r.airlineCompany,r.flightNumber,
      r.confirmationCode,r.paymentStatus,new Date(r.createdAt).toLocaleDateString()
    ].map(v => `"${v ?? ""}"`));
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "airdc-registrations.csv"; a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {selected && <DetailModal reg={selected} onClose={() => setSelected(null)} />}
      {showResend && <ResendPanel onClose={() => setShowResend(false)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
          <p className="text-gray-500 text-sm mt-1">{registrations.length} delegates registered</p>
        </div>
        <div className="flex gap-3 flex-wrap justify-end">
          {registrations.length > 0 && (
            <button onClick={() => setShowResend(true)} className="flex items-center gap-2 bg-[#0D3B66] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1D4E89]">
              <Send size={16} /> Resend with Invoices
            </button>
          )}
          <button onClick={downloadCSV} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600">
            <Download size={16} /> Export CSV
          </button>
          {checkedIds.size > 0 && (
            <button onClick={deleteSelected} disabled={deleting} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
              <Trash2 size={16} /> {deleting ? "Deleting..." : `Delete Selected (${checkedIds.size})`}
            </button>
          )}
          {registrations.length > 0 && checkedIds.size === 0 && (
            <button onClick={deleteAll} disabled={deleting} className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-50">
              <Trash2 size={16} /> {deleting ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Registered", value: registrations.length, icon: Users, color: "text-blue-900" },
          { label: "Countries", value: new Set(registrations.map(r => r.country)).size, icon: Building, color: "text-teal-700" },
          { label: "This Week", value: registrations.filter(r => new Date(r.createdAt) > new Date(Date.now() - 7*24*60*60*1000)).length, icon: Mail, color: "text-yellow-700" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`text-3xl font-black mt-1 ${color}`}>{value}</p>
              </div>
              <Icon size={28} className="text-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, organisation..." className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20" />
      </div>

      <p className="text-xs text-gray-400 mb-3">
        {checkedIds.size > 0
          ? `${checkedIds.size} selected — click row to view details, or use the Delete Selected button above`
          : "Tick checkboxes to select entries for deletion · Click a row to view full details"}
      </p>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading registrations...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">{search ? "No results found" : "No registrations yet"}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allFilteredChecked}
                    ref={el => { if (el) el.indeterminate = someChecked && !allFilteredChecked; }}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-blue-900 cursor-pointer"
                  />
                </th>
                {["Name","Email","Organisation","Country","Category","Visa","Payment","Date"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => (
                <tr
                  key={r.id}
                  className={`transition-colors ${checkedIds.has(r.id) ? "bg-red-50" : "hover:bg-primary/5"}`}
                >
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={checkedIds.has(r.id)}
                      onChange={() => toggleOne(r.id)}
                      className="rounded border-gray-300 text-red-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 cursor-pointer" onClick={() => setSelected(r)}>{r.civility} {r.firstName} {r.lastName}</td>
                  <td className="px-4 py-3 text-gray-600 cursor-pointer" onClick={() => setSelected(r)}>{r.email}</td>
                  <td className="px-4 py-3 text-gray-600 cursor-pointer" onClick={() => setSelected(r)}>{r.organisation}</td>
                  <td className="px-4 py-3 text-gray-600 cursor-pointer" onClick={() => setSelected(r)}>{r.country}</td>
                  <td className="px-4 py-3 cursor-pointer" onClick={() => setSelected(r)}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{r.delegateType?.replace(/_/g," ")}</span></td>
                  <td className="px-4 py-3 cursor-pointer" onClick={() => setSelected(r)}><span className={`text-xs px-2 py-0.5 rounded-full ${r.visaInvitation === "YES" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-500"}`}>{r.visaInvitation ?? "—"}</span></td>
                  <td className="px-4 py-3 cursor-pointer" onClick={() => setSelected(r)}><span className={`text-xs px-2 py-0.5 rounded-full ${r.paymentStatus === "PAID" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-700"}`}>{r.paymentStatus ?? "PENDING"}</span></td>
                  <td className="px-4 py-3 text-gray-400 text-xs cursor-pointer" onClick={() => setSelected(r)}>{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
