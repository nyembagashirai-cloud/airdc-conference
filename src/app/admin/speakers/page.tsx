"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";

const mockSpeakers = [
  { id: "1", name: "Dr. Amara Diallo", title: "Commissioner of Insurance", org: "Insurance Regulatory Authority", country: "Ghana", type: "Keynote Speaker", featured: true },
  { id: "2", name: "Ms. Priya Naidoo", title: "Group CEO", org: "AfriRe Group", country: "South Africa", type: "Keynote Speaker", featured: true },
  { id: "3", name: "Mr. Chen Wei", title: "Managing Director", org: "Asia Pacific Insurance Consortium", country: "Singapore", type: "Panel Speaker", featured: false },
  { id: "4", name: "Dr. Fatima Al-Hassan", title: "Head of Research", org: "IAIS", country: "Jordan", type: "Panel Speaker", featured: true },
  { id: "5", name: "Mr. Roberto Silva", title: "President", org: "Latin America Reinsurers Association", country: "Brazil", type: "Moderator", featured: false },
  { id: "6", name: "Prof. Akinwande Osei", title: "Chair, Insurance Innovation", org: "African Development Bank", country: "Côte d'Ivoire", type: "Workshop Facilitator", featured: true },
];

export default function AdminSpeakersPage() {
  const [search, setSearch] = useState("");
  const filtered = mockSpeakers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.org.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">Speakers</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockSpeakers.length} speakers configured</p>
        </div>
        <button className="btn-primary gap-2 text-sm">
          <Plus size={16} /> Add Speaker
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-border shadow-card p-4 mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Search speakers..." />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
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
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{speaker.name}</p>
                        <p className="text-muted-foreground text-xs">{speaker.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{speaker.org}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">{speaker.country}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{speaker.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    {speaker.featured && <Star size={16} className="fill-secondary text-secondary" />}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary">
                        <Pencil size={15} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
