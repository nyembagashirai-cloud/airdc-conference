"use client";
import { useState, useEffect } from "react";
import { FolderPlus, Trash2, X, Loader2, ImageIcon, Plus, Pencil } from "lucide-react";

type GalleryImage = { id: string; url: string; caption: string | null; altText: string | null; order: number; };
type Album = { id: string; title: string; description: string | null; coverImage: string | null; year: number; order: number; images: GalleryImage[]; };

const emptyAlbum = { title: "", description: "", coverImage: "", year: 2026, order: 0 };
const emptyImage = { albumId: "", url: "", caption: "", altText: "", order: 0 };

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [albumForm, setAlbumForm] = useState(emptyAlbum);
  const [imageForm, setImageForm] = useState(emptyImage);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    const albumList: Album[] = data.albums || [];
    setAlbums(albumList);
    if (activeAlbum) {
      const updated = albumList.find(a => a.id === activeAlbum.id);
      setActiveAlbum(updated || albumList[0] || null);
    } else {
      setActiveAlbum(albumList[0] || null);
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAddAlbum = () => { setEditingAlbum(null); setAlbumForm(emptyAlbum); setError(""); setShowAlbumForm(true); };
  const openEditAlbum = (a: Album) => { setEditingAlbum(a); setAlbumForm({ title: a.title, description: a.description || "", coverImage: a.coverImage || "", year: a.year, order: a.order }); setError(""); setShowAlbumForm(true); };

  const handleSaveAlbum = async () => {
    if (!albumForm.title.trim()) { setError("Album title is required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch(editingAlbum ? `/api/gallery/${editingAlbum.id}` : "/api/gallery", { method: editingAlbum ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(albumForm) });
      if (!res.ok) throw new Error();
      setShowAlbumForm(false); await load();
    } catch { setError("Failed to save album."); }
    setSaving(false);
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm("Delete this album and all its images?")) return;
    setDeleting(id);
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (activeAlbum?.id === id) setActiveAlbum(null);
    await load(); setDeleting(null);
  };

  const openAddImage = () => {
    if (!activeAlbum) return;
    setImageForm({ ...emptyImage, albumId: activeAlbum.id });
    setError(""); setShowImageForm(true);
  };

  const handleSaveImage = async () => {
    if (!imageForm.url.trim()) { setError("Image URL is required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...imageForm, type: "image" }) });
      if (!res.ok) throw new Error();
      setShowImageForm(false); await load();
    } catch { setError("Failed to add image."); }
    setSaving(false);
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Remove this image?")) return;
    setDeleting(id);
    await fetch(`/api/gallery/${id}?type=image`, { method: "DELETE" });
    await load(); setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">Gallery</h1>
          <p className="text-muted-foreground text-sm mt-1">{albums.length} album{albums.length !== 1 ? "s" : ""} · {albums.reduce((sum, a) => sum + a.images.length, 0)} images</p>
        </div>
        <button onClick={openAddAlbum} className="btn-primary gap-2 text-sm flex items-center"><FolderPlus size={16} /> New Album</button>
      </div>

      {/* Album Form Modal */}
      {showAlbumForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">{editingAlbum ? "Edit Album" : "New Album"}</h2>
              <button onClick={() => setShowAlbumForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Album Title *</label>
                <input value={albumForm.title} onChange={e => setAlbumForm({...albumForm, title: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Conference Day 1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Description</label>
                <input value={albumForm.description} onChange={e => setAlbumForm({...albumForm, description: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Brief description..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Cover Image URL</label>
                <input value={albumForm.coverImage} onChange={e => setAlbumForm({...albumForm, coverImage: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Year</label>
                  <input type="number" value={albumForm.year} onChange={e => setAlbumForm({...albumForm, year: parseInt(e.target.value) || 2026})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Display Order</label>
                  <input type="number" value={albumForm.order} onChange={e => setAlbumForm({...albumForm, order: parseInt(e.target.value) || 0})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={handleSaveAlbum} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving..." : "Save Album"}
              </button>
              <button onClick={() => setShowAlbumForm(false)} className="px-4 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Form Modal */}
      {showImageForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">Add Image</h2>
              <button onClick={() => setShowImageForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Image URL *</label>
                <input value={imageForm.url} onChange={e => setImageForm({...imageForm, url: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://res.cloudinary.com/..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Caption</label>
                <input value={imageForm.caption} onChange={e => setImageForm({...imageForm, caption: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Image caption..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Alt Text</label>
                <input value={imageForm.altText} onChange={e => setImageForm({...imageForm, altText: e.target.value})} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Descriptive text for accessibility..." />
              </div>
              {imageForm.url && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img src={imageForm.url} alt="Preview" className="w-full h-40 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={handleSaveImage} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving..." : "Add Image"}
              </button>
              <button onClick={() => setShowImageForm(false)} className="px-4 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 size={24} className="animate-spin mr-2" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {/* Albums sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted">
                <p className="text-xs font-semibold text-muted-foreground">ALBUMS</p>
              </div>
              {albums.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  <FolderPlus size={24} className="mx-auto mb-2 opacity-40" />
                  <p>No albums yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {albums.map(a => (
                    <button key={a.id} onClick={() => setActiveAlbum(a)}
                      className={`w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors flex items-center justify-between gap-2 ${activeAlbum?.id === a.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.images.length} image{a.images.length !== 1 ? "s" : ""}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Images area */}
          <div className="col-span-3">
            {activeAlbum ? (
              <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <div>
                    <h2 className="font-semibold text-foreground">{activeAlbum.title}</h2>
                    <p className="text-xs text-muted-foreground">{activeAlbum.images.length} image{activeAlbum.images.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditAlbum(activeAlbum)} className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Pencil size={15} /></button>
                    <button onClick={() => handleDeleteAlbum(activeAlbum.id)} disabled={deleting === activeAlbum.id} className="p-2 hover:bg-red-50 rounded-lg text-red-500">
                      {deleting === activeAlbum.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    </button>
                    <button onClick={openAddImage} className="btn-primary gap-1 text-xs flex items-center px-3 py-1.5"><Plus size={14} /> Add Image</button>
                  </div>
                </div>
                {activeAlbum.images.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No images in this album</p>
                    <p className="text-sm mt-1">Click "Add Image" to add photos</p>
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-3 gap-4">
                    {activeAlbum.images.map(img => (
                      <div key={img.id} className="group relative rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                        <img src={img.url} alt={img.altText || img.caption || ""} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button onClick={() => handleDeleteImage(img.id)} disabled={deleting === img.id} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                            {deleting === img.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                        {img.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">{img.caption}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-border shadow-card flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <FolderPlus size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Select an album or create one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
