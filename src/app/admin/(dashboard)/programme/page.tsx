"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Clock, Calendar } from "lucide-react";

type Session = {
  id: string; day: string; date: string; startTime: string; endTime: string;
  title: string; subtitle: string | null; description: string | null; type: string; venue: string | null;
};

const DAYS = [
  { label: "Day 1 – 26 Sep", value: "Day 1", date: "2026-09-26" },
  { label: "Day 2 – 27 Sep", value: "Day 2", date: "2026-09-27" },
  { label: "Day 3 – 28 Sep", value: "Day 3", date: "2026-09-28" },
  { label: "Day 4 – 29 Sep", value: "Day 4", date: "2026-09-29" },
  { label: "Day 5 – 30 Sep", value: "Day 5", date: "2026-09-30" },
];
const TYPES = ["PLENARY", "KEYNOTE", "PANEL", "WORKSHOP", "BREAK", "SOCIAL", "MEETING", "NETWORKING"];
const TYPE_COLORS: Record<string, string> = {
  PLENARY: "bg-blue-100 text-blue-800", KEYNOTE: "bg-purple-100 text-purple-800",
  PANEL: "bg-indigo-100 text-indigo-800", WORKSHOP: "bg-green-100 text-green-800",
  BREAK: "bg-gray-100 text-gray-600", SOCIAL: "bg-yellow-100 text-yellow-800",
  MEETING: "bg-orange-100 text-orange-800", NETWORKING: "bg-teal-100 text-teal-800",
};

const empty = { day: "Day 1", date: "2026-09-26", startTime: "09:00", endTime: "10:00", title: "", subtitle: "", description: "", type: "PLENARY", venue: "Rainbow Towers Hotel, Harare" };

export default function AdminProgrammePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState("Day 1");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Session | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/programme");
    const data = await res.json();
    setSessions(data.sessions || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    const dayObj = DAYS.find(d => d.value === activeDay) || DAYS[0];
    setEditing(null);
    setForm({ ...empty, day: dayObj.value, date: dayObj.date });
    setError(""); setShowForm(true);
  };
  const openEdit = (s: Session) => {
    setEditing(s);
    setForm({ day: s.day, date: s.date.slice(0, 10), startTime: s.startTime, endTime: s.endTime, title: s.title, subtitle: s.subtitle || "", description: s.description || "", type: s.type, venue: s.venue || "" });
    setError(""); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Session title is required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch(editing ? `/api/programme/${editing.id}` : "/api/programme", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setShowForm(false); await load();
    } catch { setError("Failed to save. Please try again."); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this session?")) return;
    setDeleting(id);
    await fetch(`/api/programme/${id}`, { method: "DELETE" });
    await load(); setDeleting(null);
  };

  const dayChanged = (day: string) => {
    const dayObj = DAYS.find(d => d.value === day) || DAYS[0];
    setForm(f => ({ ...f, day, date: dayObj.date }));
  };

  const daySessions = sessions.filter(s => s.day === activeDay);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">Conference Programme</h1>
          <p className="text-muted-foreground text-sm mt-1">{sessions.length} session{sessions.length !== 1 ? "s" : ""} across {DAYS.length} days</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 text-sm flex items-center"><Plus size={16} /> Add Session</button>
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {DAYS.map(d => {
          const count = sessions.filter(s => s.day === d.value).length;
          return (
            <button key={d.value} onClick={() => setActiveDay(d.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeDay === d.value ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground hover:bg-muted"}`}>
              <Calendar size={14} />{d.label}
              {count > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeDay === d.value ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>{count}</span>}
            </button>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">{editing ? "Edit Session" : "Add Session"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Day</label>
                  <select value={form.day} onChange={e => dayChanged(e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Session Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Start Time</label>
                  <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">End Time</label>
                  <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Session Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Opening Keynote Address" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Subtitle / Speaker</label>
                  <input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Dr. Jane Smith, CEO AfriRe" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Venue / Room</label>
                  <input value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Main Ballroom, Rainbow Towers" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Session description..." />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving..." : "Save Session"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 size={24} className="animate-spin mr-2" /> Loading...</div>
        ) : daySessions.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Calendar size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No sessions for {activeDay} yet</p>
            <p className="text-sm mt-1">Click "Add Session" to build the programme</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {daySessions.map(s => (
              <div key={s.id} className="px-6 py-4 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                    <Clock size={11} />{s.startTime}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.endTime}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[s.type] || "bg-gray-100 text-gray-600"}`}>{s.type}</span>
                  </div>
                  <p className="font-semibold text-foreground text-sm">{s.title}</p>
                  {s.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{s.subtitle}</p>}
                  {s.venue && <p className="text-xs text-primary/70 mt-0.5">📍 {s.venue}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(s)} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Edit2 size={15} /></button>
                  <button onClick={() => handleDelete(s.id)} disabled={deleting === s.id} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                    {deleting === s.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
