"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Star, X, Loader2 } from "lucide-react";

type Speaker = {
  id: string; name: string; title: string; organisation: string; country: string;
  bio: string | null; photoUrl: string | null; speakerType: string; featured: boolean;
  linkedinUrl: string | null; order: number;
};

const TYPES = ["Keynote Speaker", "Panel Speaker", "Moderator", "Workshop Facilitator", "Guest Speaker"];
const empty = { name: "", title: "", organisation: "", country: "", bio: "", photoUrl: "", speakerType: "Panel Speaker", featured: false, linkedinUrl: "", order: 0 };

export default function AdminSpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Speaker | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/speakers");
    const data = await res.json();
    setSpeakers(data.speakers || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setError(""); setShowForm(true); };
  const openEdit = (s: Speaker) => {
    setEditing(s);
    setForm({ name: s.name, title: s.title, organisation: s.organisation, country: s.country, bio: s.bio || "", photoUrl: s.photoUrl || "", speakerType: s.speakerType, featured: s.featured, linkedinUrl: s.linkedinUrl || "", order: s.order });
    setError(""); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.title.trim() || !form.organisation.trim()) { setError("Name, title and organisation are required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch(editing ? `/api/speakers/${editing.id}` : "/api/speakers", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setShowForm(false); await load();
    } catch { setError("Failed to save. Please try again."); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this speaker?")) return;
    setDeleting(id);
    await fetch(`/api/speakers/${id}`, { method: "DELETE" });
    await load(); setDeleting(null);
  };

  const filtered = speakers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.organisation.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">Speakers</h1>
          <p className="text-muted-foreground text-sm mt-1">{speakers.length} speaker{speakers.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 text-sm flex items-center"><Plus size={16} /> Add Speaker</button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-card p-4 mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Search speakers..." />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">{editing ? "Edit Speaker" : "Add Speaker"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Dr. Jane Smith" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Job Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. CEO" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Organisation *</label>
                  <input value={form.organisation} onChange={e => setForm({...form, organisation: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. AfriRe Group" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Country</label>
                  <input value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Zimbabwe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Speaker Type</label>
                  <select value={form.speakerType} onChange={e => setForm({...form, speakerType: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Photo URL</label>
                  <input value={form.photoUrl} onChange={e => setForm({...form, photoUrl: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">LinkedIn URL</label>
                  <input value={form.linkedinUrl} onChange={e => setForm({...form, linkedinUrl: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Biography</label>
                  <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Speaker biography..." />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded text-primary" />
                    <span className="text-sm font-medium">Feature this speaker on the homepage</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving..." : "Save Speaker"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 size={24} className="animate-spin mr-2" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-medium">{search ? "No speakers match your search" : "No speakers added yet"}</p>
            {!search && <p className="text-sm mt-1">Click "Add Speaker" to get started</p>}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Speaker</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden md:table-cell">Organisation</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden lg:table-cell">Country</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden lg:table-cell">Type</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Featured</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((speaker) => {
                const initials = speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2);
                return (
                  <tr key={speaker.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {speaker.photoUrl ? (
                          <img src={speaker.photoUrl} alt={speaker.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{initials}</div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{speaker.name}</p>
                          <p className="text-muted-foreground text-xs">{speaker.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{speaker.organisation}</td>
                    <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">{speaker.country}</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{speaker.speakerType}</span>
                    </td>
                    <td className="px-6 py-4">{speaker.featured && <Star size={16} className="fill-secondary text-secondary" />}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(speaker)} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(speaker.id)} disabled={deleting === speaker.id} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                          {deleting === speaker.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
