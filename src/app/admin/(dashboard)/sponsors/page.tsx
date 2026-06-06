"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ExternalLink, X, Loader2 } from "lucide-react";

type Sponsor = { id: string; name: string; tier: string; website: string | null; description: string | null; logoUrl: string | null; contactName: string | null; contactEmail: string | null; active: boolean; };

const TIERS = ["PLATINUM", "GOLD", "SILVER", "SUPPORTING_PARTNER"];
const TIER_LABELS: Record<string, string> = { PLATINUM: "Platinum", GOLD: "Gold", SILVER: "Silver", SUPPORTING_PARTNER: "Supporting Partner" };
const TIER_COLORS: Record<string, string> = { PLATINUM: "bg-slate-100 text-slate-800", GOLD: "bg-yellow-100 text-yellow-800", SILVER: "bg-gray-100 text-gray-600", SUPPORTING_PARTNER: "bg-blue-100 text-blue-800" };
const empty = { name: "", tier: "GOLD", website: "", description: "", logoUrl: "", contactName: "", contactEmail: "", active: true };

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/sponsors");
    const data = await res.json();
    setSponsors(data.sponsors || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setError(""); setShowForm(true); };
  const openEdit = (s: Sponsor) => {
    setEditing(s);
    setForm({ name: s.name, tier: s.tier, website: s.website || "", description: s.description || "", logoUrl: s.logoUrl || "", contactName: s.contactName || "", contactEmail: s.contactEmail || "", active: s.active });
    setError(""); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError("Company name is required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch(editing ? `/api/sponsors/${editing.id}` : "/api/sponsors", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setShowForm(false); await load();
    } catch { setError("Failed to save. Please try again."); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sponsor?")) return;
    setDeleting(id);
    await fetch(`/api/sponsors/${id}`, { method: "DELETE" });
    await load(); setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">Sponsors & Partners</h1>
          <p className="text-muted-foreground text-sm mt-1">{sponsors.length} sponsor{sponsors.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 text-sm flex items-center"><Plus size={16} /> Add Sponsor</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">{editing ? "Edit Sponsor" : "Add Sponsor"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Company Name *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Sponsor Tier</label>
                  <select value={form.tier} onChange={e => setForm({...form, tier: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    {TIERS.map(t => <option key={t} value={t}>{TIER_LABELS[t]}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Website URL</label>
                  <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Logo URL</label>
                  <input value={form.logoUrl} onChange={e => setForm({...form, logoUrl: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://res.cloudinary.com/..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Brief company description..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Contact Name</label>
                  <input value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Contact person" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Contact Email</label>
                  <input value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="contact@company.com" />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 rounded text-primary" />
                    <span className="text-sm font-medium">Active (visible on website)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving..." : "Save Sponsor"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 size={24} className="animate-spin mr-2" /> Loading...</div>
      ) : sponsors.length === 0 ? (
        <div className="bg-white rounded-xl border border-border shadow-card text-center py-16 text-muted-foreground">
          <p className="font-medium">No sponsors added yet</p>
          <p className="text-sm mt-1">Click "Add Sponsor" to get started</p>
        </div>
      ) : (
        TIERS.map(tier => {
          const tierSponsors = sponsors.filter(s => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <div key={tier} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${TIER_COLORS[tier]}`}>{TIER_LABELS[tier]}</span>
                <span className="text-xs text-muted-foreground">{tierSponsors.length} sponsor{tierSponsors.length > 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-2">
                {tierSponsors.map(s => (
                  <div key={s.id} className="bg-white border border-border rounded-xl px-5 py-4 flex items-center gap-4 shadow-card">
                    {s.logoUrl ? (
                      <img src={s.logoUrl} alt={s.name} className="w-12 h-12 object-contain rounded-lg flex-shrink-0 border border-border p-1" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold text-muted-foreground">{s.name.charAt(0)}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground text-sm">{s.name}</p>
                        {!s.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                      </div>
                      {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">{s.website} <ExternalLink size={10} /></a>}
                      {s.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(s.id)} disabled={deleting === s.id} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                        {deleting === s.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
