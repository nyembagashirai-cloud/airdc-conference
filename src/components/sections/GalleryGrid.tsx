"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const albums = [
  {
    id: "1",
    title: "22nd AIRDC Conference 2024",
    year: 2024,
    images: [
      { id: "1", url: "/images/gallery/placeholder-1.jpg", caption: "Opening Ceremony" },
      { id: "2", url: "/images/gallery/placeholder-2.jpg", caption: "Keynote Session" },
      { id: "3", url: "/images/gallery/placeholder-3.jpg", caption: "Networking Reception" },
      { id: "4", url: "/images/gallery/placeholder-4.jpg", caption: "Panel Discussion" },
      { id: "5", url: "/images/gallery/placeholder-5.jpg", caption: "Gala Dinner" },
      { id: "6", url: "/images/gallery/placeholder-6.jpg", caption: "Exhibition Hall" },
    ],
  },
  {
    id: "2",
    title: "21st AIRDC Conference 2023",
    year: 2023,
    images: [
      { id: "7", url: "/images/gallery/placeholder-7.jpg", caption: "Welcome Address" },
      { id: "8", url: "/images/gallery/placeholder-8.jpg", caption: "Workshop Sessions" },
      { id: "9", url: "/images/gallery/placeholder-9.jpg", caption: "Awards Ceremony" },
    ],
  },
];

// Placeholder colors for demo
const placeholderColors = ["#0D3B66", "#1D4E89", "#2A9D8F", "#D4AF37", "#0D3B66", "#1D4E89", "#2A9D8F", "#D4AF37", "#0D3B66"];

export function GalleryGrid() {
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + selectedAlbum.images.length) % selectedAlbum.images.length : null);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % selectedAlbum.images.length : null);

  return (
    <section className="section-padding bg-muted">
      <div className="container">
        {/* Album tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                selectedAlbum.id === album.id
                  ? "bg-primary text-white shadow-premium"
                  : "bg-white text-foreground border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedAlbum.images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => openLightbox(i)}
              className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer hover:ring-2 hover:ring-secondary transition-all"
              style={{ backgroundColor: placeholderColors[i % placeholderColors.length] }}
            >
              <div className="w-full h-full flex items-center justify-center opacity-30">
                <span className="text-white font-bold text-2xl">{i + 1}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white text-xs font-medium">{image.caption}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-secondary p-2">
              <X size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white hover:text-secondary p-2">
              <ChevronLeft size={36} />
            </button>
            <div className="max-w-4xl max-h-[80vh] flex items-center justify-center p-8" onClick={e => e.stopPropagation()}>
              <div
                className="w-96 h-64 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: placeholderColors[lightboxIndex % placeholderColors.length] }}
              >
                <span className="text-white text-opacity-30 font-bold text-4xl opacity-30">{lightboxIndex + 1}</span>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white hover:text-secondary p-2">
              <ChevronRight size={36} />
            </button>
            <div className="absolute bottom-8 text-white text-center">
              <p className="font-medium">{selectedAlbum.images[lightboxIndex]?.caption}</p>
              <p className="text-white/50 text-sm">{lightboxIndex + 1} / {selectedAlbum.images.length}</p>
            </div>
          </div>
        )}

        <div className="mt-10 text-center p-6 bg-white rounded-2xl border border-border">
          <p className="text-foreground font-semibold mb-2">📸 Photos from AIRDC 2026 will be added during and after the conference</p>
          <p className="text-muted-foreground text-sm">Check back in September 2026 for live conference photography</p>
        </div>
      </div>
    </section>
  );
}
