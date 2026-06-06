"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Globe, X, Loader2 } from "lucide-react";

type Article = { id: string; title: string; slug: string; excerpt: string | null; content: string; category: string; published: boolean; publishedAt: string | null; authorName: string | null; authorTitle: string | null; tags: string[]; coverImage: string | null; };

const CATEGORIES = ["NEWS", "ANNOUNCEMENT", "UPDATE", "PRESS_RELEASE", "INSIGHT"];
const CAT_COLORS: Record<string, string> = { NEWS: "bg-blue-100 text-blue-800", ANNOUNCEMENT: "bg-green-100 text-green-800", UPDATE: "bg-yellow-100 text-yellow-800", PRESS_RELEASE: "bg-purple-100 text-purple-800", INSIGHT: "bg-teal-100 text-teal-800" };
const empty = { title: "", excerpt: "", content: "", coverImage: "", category: "NEWS", published: false, authorName: "", authorTitle: "", tags: "" };

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    // Admin needs all articles (including drafts), so call with admin flag
    const res = await fetch("/api/news?all=true");
    const data = await res.json();
    setArticles(data.articles || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setError(""); setShowForm(true); };
  const openEdit = (a: Article) => {
    setEditing(a);
    setForm({ title: a.title, excerpt: a.excerpt || "", content: a.content, coverImage: a.coverImage || "", category: a.category, published: a.published, authorName: a.authorName || "", authorTitle: a.authorTitle || "", tags: a.tags.join(", ") });
    setError(""); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true); setError("");
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [] };
      const res = await fetch(editing ? `/api/news/${editing.id}` : "/api/news", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      setShowForm(false); await load();
    } catch { setError("Failed to save. Please try again."); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    setDeleting(id);
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    await load(); setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">News & Updates</h1>
          <p className="text-muted-foreground text-sm mt-1">{articles.length} article{articles.length !== 1 ? "s" : ""} · {articles.filter(a => a.published).length} published</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 text-sm flex items-center"><Plus size={16} /> New Article</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">{editing ? "Edit Article" : "New Article"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Article Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Article title..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Cover Image URL</label>
                  <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Author Name</label>
                  <input value={form.authorName} onChange={e => setForm({...form, authorName: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. AIRDC Secretariat" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Author Title</label>
                  <input value={form.authorTitle} onChange={e => setForm({...form, authorTitle: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Communications Officer" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Excerpt / Summary</label>
                  <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Brief summary shown in article listings..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Content</label>
                  <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10} className="w-full border border-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Full article content (supports plain text or Markdown)..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="insurance, conference, Zimbabwe" />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 rounded text-primary" />
                    <span className="text-sm font-medium">Publish immediately (visible on website)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving..." : form.published ? "Publish Article" : "Save Draft"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 size={24} className="animate-spin mr-2" /> Loading...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-medium">No articles yet</p>
            <p className="text-sm mt-1">Click "New Article" to create your first post</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden lg:table-cell">Author</th>
                <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map(a => (
                <tr key={a.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground line-clamp-1">{a.title}</p>
                    {a.excerpt && <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">{a.excerpt}</p>}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CAT_COLORS[a.category] || "bg-gray-100 text-gray-600"}`}>{a.category.replace("_", " ")}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell text-xs">{a.authorName || "—"}</td>
                  <td className="px-6 py-4">
                    {a.published ? (
                      <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full w-fit"><Globe size={10} />Published</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full w-fit"><Eye size={10} />Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(a)} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                        {deleting === a.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
