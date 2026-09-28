"use client";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2, Download, ExternalLink, Camera } from "lucide-react";
import { GALLERY_ALBUMS } from "@/data/gallery";

type GalleryImage = { id: string; url: string; thumb?: string | null; caption: string | null; altText: string | null };
type Album = {
  id: string;
  title: string;
  description?: string | null;
  year: number;
  driveUrl?: string | null;
  coverImage: string | null;
  images: GalleryImage[];
};

export function GalleryGrid() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .catch(() => ({ albums: [] }))
      .then((data) => {
        const dbAlbums: Album[] = (data.albums || []).filter((a: Album) => a.images?.length > 0);
        // Admin albums win when any exist, otherwise use the published static albums.
        const list: Album[] = dbAlbums.length > 0 ? dbAlbums : GALLERY_ALBUMS;
        setAlbums(list);
        setSelectedAlbum(list[0] || null);
      })
      .finally(() => setLoading(false));
  }, []);

  const count = selectedAlbum?.images.length ?? 0;
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && count ? (i - 1 + count) % count : null)), [count]);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && count ? (i + 1) % count : null)), [count]);

  // keyboard navigation and scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = overflow;
    };
  }, [lightboxIndex, prev, next, closeLightbox]);

  // simple swipe support on phones
  const [touchX, setTouchX] = useState<number | null>(null);

  if (loading) {
    return (
      <section className="section-padding bg-muted">
        <div className="container flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 size={28} className="animate-spin mr-3" /> Loading gallery...
        </div>
      </section>
    );
  }

  const current = lightboxIndex !== null && selectedAlbum ? selectedAlbum.images[lightboxIndex] : null;

  return (
    <section className="section-padding bg-muted">
      <div className="container">
        {albums.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-card">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Camera size={32} className="text-primary" />
            </div>
            <h2 className="font-heading font-bold text-primary text-2xl mb-3">Gallery Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Photos from AIRDC 2026 will be published here during and after the conference.
            </p>
          </div>
        ) : (
          <>
            {/* Album tabs */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => {
                    setSelectedAlbum(album);
                    setLightboxIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    selectedAlbum?.id === album.id
                      ? "bg-primary text-white shadow-premium"
                      : "bg-white text-foreground border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {album.title}
                  <span className="ml-2 text-xs opacity-60">({album.images.length})</span>
                </button>
              ))}
            </div>

            {selectedAlbum && (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-heading font-bold text-primary text-xl">{selectedAlbum.title}</h2>
                    {selectedAlbum.description && (
                      <p className="text-muted-foreground text-sm mt-1">{selectedAlbum.description}</p>
                    )}
                  </div>
                  {selectedAlbum.driveUrl && (
                    <a
                      href={selectedAlbum.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-primary font-semibold text-sm hover:bg-secondary/90 transition-all flex-shrink-0"
                    >
                      <Download size={16} /> Full-resolution photos
                      <ExternalLink size={14} className="opacity-70" />
                    </a>
                  )}
                </div>

                {selectedAlbum.images.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-border">
                    <p className="text-muted-foreground">No photos in this album yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {selectedAlbum.images.map((image, i) => (
                      <button
                        key={image.id}
                        onClick={() => setLightboxIndex(i)}
                        aria-label={`Open photo ${i + 1} of ${selectedAlbum.images.length}`}
                        className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer hover:ring-2 hover:ring-secondary transition-all bg-border"
                      >
                        <img
                          src={image.thumb || image.url}
                          alt={image.altText || image.caption || ""}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
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
                <p className="text-xs text-muted-foreground mt-6">Photos by Profound Photography.</p>
              </>
            )}

            {/* Lightbox */}
            {current && lightboxIndex !== null && selectedAlbum && (
              <div
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                onClick={closeLightbox}
                onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchX === null) return;
                  const dx = e.changedTouches[0].clientX - touchX;
                  if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
                  setTouchX(null);
                }}
              >
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <a
                    href={current.url}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="text-white hover:text-secondary p-2"
                    aria-label="Download this photo"
                  >
                    <Download size={24} />
                  </a>
                  <button onClick={closeLightbox} className="text-white hover:text-secondary p-2" aria-label="Close">
                    <X size={28} />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 md:left-4 text-white hover:text-secondary p-2 z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={36} />
                </button>
                <div className="max-w-6xl max-h-[85vh] flex items-center justify-center px-12 py-8" onClick={(e) => e.stopPropagation()}>
                  <img
                    key={current.id}
                    src={current.url}
                    alt={current.altText || ""}
                    className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 md:right-4 text-white hover:text-secondary p-2 z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight size={36} />
                </button>
                <div className="absolute bottom-6 text-white text-center px-4">
                  {current.caption && <p className="font-medium mb-1">{current.caption}</p>}
                  <p className="text-white/50 text-sm">
                    {lightboxIndex + 1} / {selectedAlbum.images.length}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
