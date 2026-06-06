"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, Globe } from "lucide-react";

const articles = [
  { id: "1", title: "AIRDC Announces 23rd Annual Conference in Harare, Zimbabwe", category: "ANNOUNCEMENT", published: true, date: "2026-01-15" },
  { id: "2", title: "Call for Papers: Share Your Research at AIRDC 2026", category: "ANNOUNCEMENT", published: true, date: "2026-01-20" },
  { id: "3", title: "2026 Sponsorship Packages Now Available", category: "NEWS", published: true, date: "2026-01-25" },
  { id: "4", title: "Early Bird Registration Now Open for AIRDC 2026", category: "ANNOUNCEMENT", published: true, date: "2026-02-01" },
  { id: "5", title: "Spotlight: Zimbabwe's Growing Insurance Market", category: "NEWS", published: true, date: "2026-02-10" },
  { id: "6", title: "First Keynote Speakers Confirmed for AIRDC 2026", category: "UPDATE", published: true, date: "2026-02-15" },
];

export default function AdminNewsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl">News & Updates</h1>
          <p className="text-muted-foreground text-sm mt-1">{articles.length} articles</p>
        </div>
        <button className="btn-primary gap-2 text-sm">
          <Plus size={16} /> New Article
        </button>
      </div>
      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Title</th>
              <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden md:table-cell">Category</th>
              <th className="text-left px-6 py-4 font-semibold text-muted-foreground hidden md:table-cell">Date</th>
              <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-medium text-foreground max-w-xs truncate">{article.title}</td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{article.category}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{article.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${article.published ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Eye size={15} /></button>
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Pencil size={15} /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
