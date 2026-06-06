"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react";

type GalleryImage = { id: string; url: string; caption: string | null; altText: string | null; };
type Album = { id: string; title: string; year: number; coverImage: string | null; images: GalleryImage[]; };

export function GalleryGrid() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then(r => r.json())
      .then(data => {
        const list: Album[] = data.albums || [];
        setAlbums(list);
        setSelectedAlbum(list[0] || null);
      })
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => { if (!selectedAlbum) return; setLightboxIndex(i => i !== null ? (i - 1 + selectedAlbum.images.length) % selectedAlbum.images.length : null); };
  const next = () => { if (!selectedAlbum) return; setLightboxIndex(i => i !== null ? (i + 1) % selectedAlbum.images.length : null); };

  // keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, selectedAlbum]);

  if (loading) {
    return (
      <section className="section-padding bg-muted">
        <div className="container flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 size={28} className="animate-spin mr-3" /> Loading gallery...
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted">
      <div className="container">
        {albums.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-card">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📸</span>
            </div>
            <h2 className="font-heading font-bold text-primary text-2xl mb-3">Gallery Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Photos from AIRDC 2026 will be published here during and after the conference in September 2026.
            </p>
          </div>
        ) : (
          <>
            {/* Album tabs */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {albums.map((album) => (
                <button key={album.id} onClick={() => { setSelectedAlbum(album); setLightboxIndex(null); }}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    selectedAlbum?.id === album.id
                      ? "bg-primary text-white shadow-premium"
                      : "bg-white text-foreground border border-border hover:border-primary hover:text-primary"
                  }`}>
                  {album.title}
                  <span className="ml-2 text-xs opacity-60">({album.images.length})</span>
                </button>
              ))}
            </div>

            {selectedAlbum && (
              <>
                {selectedAlbum.images.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-border">
                    <p className="text-muted-foreground">No photos in this album yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedAlbum.images.map((image, i) => (
                      <button key={image.id} onClick={() => openLightbox(i)}
                        className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer hover:ring-2 hover:ring-secondary transition-all bg-muted">
                        <img src={image.url} alt={image.altText || image.caption || ""}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                            <p className="text-white text-xs font-medium">{image.caption}</p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && selectedAlbum && (
              <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
                <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-secondary p-2 z-10">
                  <X size={28} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 text-white hover:text-secondary p-2 z-10">
                  <ChevronLeft size={36} />
                </button>
                <div className="max-w-5xl max-h-[85vh] flex items-center justify-center p-8" onClick={e => e.stopPropagation()}>
                  <img
                    src={selectedAlbum.images[lightboxIndex]?.url}
                    alt={selectedAlbum.images[lightboxIndex]?.altText || ""}
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>
                <button onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 text-white hover:text-secondary p-2 z-10">
                  <ChevronRight size={36} />
                </button>
                <div className="absolute bottom-8 text-white text-center">
                  {selectedAlbum.images[lightboxIndex]?.caption && (
                    <p className="font-medium mb-1">{selectedAlbum.images[lightboxIndex].caption}</p>
                  )}
                  <p className="text-white/50 text-sm">{lightboxIndex + 1} / {selectedAlbum.images.length}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
