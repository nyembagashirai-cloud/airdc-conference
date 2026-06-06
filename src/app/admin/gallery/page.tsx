"use client";
import { useState } from "react";
import { Upload, Trash2, FolderPlus, Image as ImageIcon } from "lucide-react";

const albums = [
  { id: 1, name: "Conference Day 1", count: 0 },
  { id: 2, name: "Conference Day 2", count: 0 },
  { id: 3, name: "Gala Dinner", count: 0 },
  { id: 4, name: "Speakers", count: 0 },
];

export default function AdminGalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState(albums[0]);
  const [newAlbum, setNewAlbum] = useState("");
  const [albumList, setAlbumList] = useState(albums);

  const addAlbum = () => {
    if (!newAlbum.trim()) return;
    setAlbumList([...albumList, { id: Date.now(), name: newAlbum.trim(), count: 0 }]);
    setNewAlbum("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage conference photo albums</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Albums sidebar */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Albums</h3>
          <div className="space-y-1 mb-4">
            {albumList.map(a => (
              <button key={a.id} onClick={() => setActiveAlbum(a)} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${activeAlbum.id === a.id ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                <span className="block truncate">{a.name}</span>
                <span className="text-xs text-gray-400">{a.count} photos</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newAlbum} onChange={e => setNewAlbum(e.target.value)} placeholder="New album..." className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs" onKeyDown={e => e.key === "Enter" && addAlbum()} />
            <button onClick={addAlbum} className="p-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800"><FolderPlus size={14} /></button>
          </div>
        </div>

        {/* Upload area */}
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{activeAlbum.name}</h3>
          </div>

          {/* Upload zone */}
          <label className="block border-2 border-dashed border-gray-200 rounded-xl p-12 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors mb-4">
            <input type="file" multiple accept="image/*" className="hidden" />
            <Upload size={32} className="mx-auto text-gray-400 mb-3" />
            <p className="font-medium text-gray-700">Click to upload photos</p>
            <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP up to 10MB each</p>
          </label>

          {/* Empty state */}
          <div className="text-center py-8 text-gray-400">
            <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No photos in this album yet</p>
            <p className="text-xs mt-1">Upload photos above to add them to this album</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-amber-800 text-sm font-medium">📸 Conference photos</p>
            <p className="text-amber-700 text-xs mt-1">Upload photos during and after the conference. They will appear automatically in the public gallery on the website.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
