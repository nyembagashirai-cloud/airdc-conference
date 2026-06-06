"use client";
import { useState, useEffect } from "react";
import { Mail, Search, ChevronDown, ChevronUp } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then(r => r.json())
      .then(data => { setContacts(data.submissions || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = contacts.filter(c =>
    `${c.name} ${c.email} ${c.subject} ${c.organisation}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-500 text-sm mt-1">{contacts.length} messages received</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20" />
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading messages...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Mail size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">{search ? "No results" : "No messages yet"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setExpanded(expanded === c.id ? null : c.id)} className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-900">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                    <span className="text-gray-300">·</span>
                    <p className="text-gray-500 text-xs">{c.email}</p>
                  </div>
                  <p className="text-gray-700 text-sm truncate">{c.subject}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  {expanded === c.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </button>
              {expanded === c.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div><span className="text-gray-400 text-xs">Organisation</span><p className="text-gray-700">{c.organisation || "—"}</p></div>
                    <div><span className="text-gray-400 text-xs">Received</span><p className="text-gray-700">{new Date(c.createdAt).toLocaleString()}</p></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">{c.message}</div>
                  <a href={`mailto:${c.email}?subject=Re: ${c.subject}`} className="inline-flex items-center gap-2 mt-3 text-sm text-blue-900 font-medium hover:underline">
                    <Mail size={14} /> Reply via email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
