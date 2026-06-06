"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

const tiers = ["Platinum", "Gold", "Silver", "Supporting Partner"];
const tierColors: Record<string, string> = {
  Platinum: "bg-slate-100 text-slate-800",
  Gold: "bg-yellow-100 text-yellow-800",
  Silver: "bg-gray-100 text-gray-600",
  "Supporting Partner": "bg-blue-100 text-blue-800",
};

const initialSponsors = [
  { id: 1, name: "Sponsor One", tier: "Platinum", website: "", description: "", logo: "" },
  { id: 2, name: "Sponsor Two", tier: "Gold", website: "", description: "", logo: "" },
];

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", tier: "Gold", website: "", description: "", logo: "" });

  const handleSave = () => {
    if (editing !== null) {
      setSponsors(sponsors.map(s => s.id === editing ? { ...s, ...form } : s));
      setEditing(null);
    } else {
      setSponsors([...sponsors, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setForm({ name: "", tier: "Gold", website: "", description: "", logo: "" });
  };

  const handleEdit = (s: typeof sponsors[0]) => {
    setForm({ name: s.name, tier: s.tier, website: s.website, description: s.description, logo: s.logo });
    setEditing(s.id);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sponsors & Partners</h1>
          <p className="text-gray-500 text-sm mt-1">Manage conference sponsors by tier</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus size={16} /> Add Sponsor
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">{editing ? "Edit Sponsor" : "Add Sponsor"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Company name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Sponsor Tier</label>
              <select value={form.tier} onChange={e => setForm({...form, tier: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {tiers.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Website URL</label>
              <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Brief company description" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Logo URL (from Cloudinary or web)</label>
              <input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="https://res.cloudinary.com/..." />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">Save</button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      {tiers.map(tier => {
        const tierSponsors = sponsors.filter(s => s.tier === tier);
        if (tierSponsors.length === 0) return null;
        return (
          <div key={tier} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tierColors[tier]}`}>{tier}</span>
              <span className="text-xs text-gray-400">{tierSponsors.length} sponsor{tierSponsors.length > 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-2">
              {tierSponsors.map(s => (
                <div key={s.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-500">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{s.name}</p>
                    {s.website && <a href={s.website} target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1">{s.website} <ExternalLink size={10} /></a>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(s)} className="p-1.5 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg"><Edit2 size={15} /></button>
                    <button onClick={() => setSponsors(sponsors.filter(x => x.id !== s.id))} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {sponsors.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="font-medium">No sponsors added yet</p>
          <p className="text-sm mt-1">Click "Add Sponsor" to get started</p>
        </div>
      )}
    </div>
  );
}
