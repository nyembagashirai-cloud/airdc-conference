"use client";
import { useState, useEffect } from "react";
import { Users, Download, Search, Mail, Building, X, Trash2 } from "lucide-react";

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

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
          <p className="text-gray-500 text-sm mt-1">{registrations.length} delegates registered</p>
        </div>
        <div className="flex gap-3 flex-wrap justify-end">
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
