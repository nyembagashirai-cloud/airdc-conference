"use client";
import { useState, useEffect } from "react";
import { Users, Download, Search, Mail, Building } from "lucide-react";

type Registration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  delegateType: string;
  createdAt: string;
};

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/register")
      .then(r => r.json())
      .then(data => { setRegistrations(data.registrations || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = registrations.filter(r =>
    `${r.firstName} ${r.lastName} ${r.email} ${r.organisation} ${r.country}`.toLowerCase().includes(search.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["First Name", "Last Name", "Email", "Organisation", "Country", "Type", "Date"];
    const rows = filtered.map(r => [r.firstName, r.lastName, r.email, r.organisation, r.country, r.delegateType, new Date(r.createdAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "registrations.csv"; a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
          <p className="text-gray-500 text-sm mt-1">{registrations.length} delegates registered</p>
        </div>
        <button onClick={downloadCSV} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600">
          <Download size={16} /> Export CSV
        </button>
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

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading registrations...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">{search ? "No results found" : "No registrations yet"}</p>
          <p className="text-sm mt-1">Registrations will appear here as delegates sign up</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Name", "Email", "Organisation", "Country", "Type", "Date"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.firstName} {r.lastName}</td>
                  <td className="px-4 py-3 text-gray-600">{r.email}</td>
                  <td className="px-4 py-3 text-gray-600">{r.organisation}</td>
                  <td className="px-4 py-3 text-gray-600">{r.country}</td>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{r.delegateType}</span></td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
