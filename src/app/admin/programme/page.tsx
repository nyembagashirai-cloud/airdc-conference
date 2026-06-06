"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Clock, Calendar } from "lucide-react";

const initialSessions = [
  { id: 1, day: "Day 1", date: "26 September 2026", time: "08:00", title: "Registration & Welcome Coffee", type: "Break", speaker: "" },
  { id: 2, day: "Day 1", date: "26 September 2026", time: "09:00", title: "Opening Ceremony & Keynote Address", type: "Keynote", speaker: "TBC" },
  { id: 3, day: "Day 1", date: "26 September 2026", time: "10:30", title: "Geopolitical Risk: Navigating Global Uncertainty", type: "Panel", speaker: "TBC" },
  { id: 4, day: "Day 1", date: "26 September 2026", time: "12:00", title: "Networking Lunch", type: "Break", speaker: "" },
  { id: 5, day: "Day 1", date: "26 September 2026", time: "14:00", title: "InsurTech & Digital Transformation in Developing Markets", type: "Session", speaker: "TBC" },
  { id: 6, day: "Day 1", date: "26 September 2026", time: "16:30", title: "Welcome Reception & Cultural Evening", type: "Social", speaker: "" },
  { id: 7, day: "Day 2", date: "27 September 2026", time: "09:00", title: "Keynote: Climate Risk & Parametric Insurance", type: "Keynote", speaker: "TBC" },
  { id: 8, day: "Day 2", date: "27 September 2026", time: "10:30", title: "Regulatory Sandbox: Global Perspectives", type: "Panel", speaker: "TBC" },
  { id: 9, day: "Day 2", date: "27 September 2026", time: "14:00", title: "Microinsurance & Financial Inclusion Workshop", type: "Workshop", speaker: "TBC" },
  { id: 10, day: "Day 2", date: "27 September 2026", time: "19:30", title: "Gala Dinner & AIRDC Awards Ceremony", type: "Social", speaker: "" },
  { id: 11, day: "Day 3", date: "28 September 2026", time: "09:00", title: "AI & Machine Learning in Underwriting", type: "Session", speaker: "TBC" },
  { id: 12, day: "Day 3", date: "28 September 2026", time: "14:00", title: "AIRDC AGM & Members Forum", type: "Meeting", speaker: "" },
  { id: 13, day: "Day 3", date: "28 September 2026", time: "15:30", title: "Closing Keynote & Resolutions", type: "Keynote", speaker: "TBC" },
  { id: 14, day: "Day 3", date: "28 September 2026", time: "17:00", title: "Conference Close & Departure", type: "Break", speaker: "" },
];

const typeColors: Record<string, string> = {
  Keynote: "bg-blue-100 text-blue-800",
  Panel: "bg-purple-100 text-purple-800",
  Workshop: "bg-green-100 text-green-800",
  Session: "bg-teal-100 text-teal-800",
  Break: "bg-gray-100 text-gray-600",
  Social: "bg-yellow-100 text-yellow-800",
  Meeting: "bg-orange-100 text-orange-800",
};

export default function AdminProgrammePage() {
  const [sessions, setSessions] = useState(initialSessions);
  const [editing, setEditing] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ day: "Day 1", date: "26 September 2026", time: "", title: "", type: "Session", speaker: "" });
  const [filterDay, setFilterDay] = useState("All");

  const days = ["All", "Day 1", "Day 2", "Day 3"];
  const filtered = filterDay === "All" ? sessions : sessions.filter(s => s.day === filterDay);

  const handleSave = () => {
    if (editing !== null) {
      setSessions(sessions.map(s => s.id === editing ? { ...s, ...form } : s));
      setEditing(null);
    } else {
      setSessions([...sessions, { ...form, id: Date.now() }]);
      setShowAdd(false);
    }
    setForm({ day: "Day 1", date: "26 September 2026", time: "", title: "", type: "Session", speaker: "" });
  };

  const handleEdit = (s: typeof sessions[0]) => {
    setForm({ day: s.day, date: s.date, time: s.time, title: s.title, type: s.type, speaker: s.speaker });
    setEditing(s.id);
    setShowAdd(true);
  };

  const handleDelete = (id: number) => setSessions(sessions.filter(s => s.id !== id));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programme Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage conference sessions, panels and events</p>
        </div>
        <button onClick={() => { setShowAdd(true); setEditing(null); }} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus size={16} /> Add Session
        </button>
      </div>

      {/* Day filter */}
      <div className="flex gap-2 mb-6">
        {days.map(d => (
          <button key={d} onClick={() => setFilterDay(d)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterDay === d ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{d}</button>
        ))}
      </div>

      {/* Add/Edit form */}
      {showAdd && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">{editing ? "Edit Session" : "Add New Session"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Day</label>
              <select value={form.day} onChange={e => setForm({...form, day: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>Day 1</option><option>Day 2</option><option>Day 3</option><option>Day 4</option><option>Day 5</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
              <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g. 26 September 2026" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
              <input value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g. 09:00" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {Object.keys(typeColors).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Session Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Session title" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Speaker(s)</label>
              <input value={form.speaker} onChange={e => setForm({...form, speaker: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Speaker name(s)" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">Save</button>
            <button onClick={() => { setShowAdd(false); setEditing(null); }} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
          </div>
        </div>
      )}

      {/* Sessions list */}
      <div className="space-y-2">
        {filtered.map(s => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-gray-300 transition-colors">
            <div className="w-14 text-center flex-shrink-0">
              <span className="font-mono font-bold text-blue-900 text-sm">{s.time}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[s.type] || "bg-gray-100 text-gray-600"}`}>{s.type}</span>
                <span className="text-xs text-gray-400">{s.day} • {s.date}</span>
              </div>
              <p className="font-medium text-gray-900 text-sm">{s.title}</p>
              {s.speaker && <p className="text-xs text-gray-500 mt-0.5">Speaker: {s.speaker}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(s)} className="p-1.5 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={15} /></button>
              <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center">Changes here update the live website programme. {sessions.length} sessions total.</p>
    </div>
  );
}
