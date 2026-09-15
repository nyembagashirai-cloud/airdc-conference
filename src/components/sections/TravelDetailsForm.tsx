"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertTriangle, Loader2, Plane } from "lucide-react";

const HOTEL_OPTIONS = [
  "Rainbow Towers Hotel & Conference Centre (Conference Venue)",
  "Holiday Inn Harare",
  "Cresta Lodge Harare",
  "Cresta Jameson Hotel",
  "N1 Hotel Harare",
];

const inputClass =
  "w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white";
const labelClass = "block text-sm font-medium text-foreground mb-1.5";
const sectionHeadingClass = "font-semibold text-foreground mb-4 pb-2 border-b-2 border-secondary text-base";

type Delegate = {
  name: string;
  firstName: string;
  email: string;
  organisation: string;
  country: string;
  confirmationCode: string;
  arrivalDate: string;
  arrivalTime: string;
  airlineCompany: string;
  flightNumber: string;
  departureDate: string;
  departureTime: string;
  departureAirline: string;
  departureFlightNumber: string;
  accommodation: string;
  airportPickup: string;
  specialNeeds: string;
  travelUpdatedAt: string | null;
};

type Form = {
  arrivalDate: string;
  arrivalTime: string;
  airlineCompany: string;
  flightNumber: string;
  departureDate: string;
  departureTime: string;
  departureAirline: string;
  departureFlightNumber: string;
  accommodation: string;
  accommodationOther: string;
  airportPickup: string;
  specialNeeds: string;
};

const EMPTY: Form = {
  arrivalDate: "", arrivalTime: "", airlineCompany: "", flightNumber: "",
  departureDate: "", departureTime: "", departureAirline: "", departureFlightNumber: "",
  accommodation: "", accommodationOther: "", airportPickup: "", specialNeeds: "",
};

export function TravelDetailsForm() {
  const params = useSearchParams();
  const code = params.get("code") || "";
  const token = params.get("t") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [delegate, setDelegate] = useState<Delegate | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!code || !token) {
      setError("This link is incomplete. Please open the link exactly as it appears in your email.");
      setLoading(false);
      return;
    }
    fetch(`/api/travel-details?code=${encodeURIComponent(code)}&t=${encodeURIComponent(token)}`)
      .then(async r => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Could not load your registration.");
        const del: Delegate = d.delegate;
        setDelegate(del);
        const known = HOTEL_OPTIONS.includes(del.accommodation) || del.accommodation === "Not yet decided";
        setForm({
          arrivalDate: del.arrivalDate,
          arrivalTime: del.arrivalTime,
          airlineCompany: del.airlineCompany,
          flightNumber: del.flightNumber,
          departureDate: del.departureDate,
          departureTime: del.departureTime,
          departureAirline: del.departureAirline,
          departureFlightNumber: del.departureFlightNumber,
          accommodation: del.accommodation ? (known ? del.accommodation : "OTHER") : "",
          accommodationOther: del.accommodation && !known ? del.accommodation : "",
          airportPickup: del.airportPickup,
          specialNeeds: del.specialNeeds,
        });
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [code, token]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/travel-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          token,
          ...form,
          accommodation:
            form.accommodation === "OTHER" ? form.accommodationOther.trim() : form.accommodation,
          accommodationOther: undefined,
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(typeof d.error === "string" ? d.error : "Could not save your details.");
      setSaved(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="card-premium p-10 text-center">
        <Loader2 size={28} className="animate-spin text-primary mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">Loading your registration…</p>
      </div>
    );
  }

  if (error && !delegate) {
    return (
      <div className="card-premium p-8 text-center">
        <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
        <h2 className="font-heading font-bold text-primary text-xl mb-2">We could not open your form</h2>
        <p className="text-foreground/70 text-sm mb-4">{error}</p>
        <a href="mailto:info@airdczim.co.zw" className="btn-primary inline-flex">Email the organisers</a>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="card-premium p-10 text-center">
        <CheckCircle2 size={44} className="text-accent mx-auto mb-4" />
        <h2 className="font-heading font-black text-primary text-2xl mb-3">Thank you, {delegate?.firstName}</h2>
        <p className="text-foreground/70 text-sm max-w-md mx-auto mb-6">
          Your travel and accommodation details have been received. Our team will be in touch with transfer
          arrangements closer to the conference.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/programme" className="btn-primary">View the programme</a>
          <button onClick={() => setSaved(false)} className="text-primary text-sm font-semibold underline">
            Edit my details again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-premium p-6 sm:p-8 space-y-8">
      {/* Who this form belongs to */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
            <Plane size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-heading font-bold text-primary">{delegate?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {delegate?.organisation} · {delegate?.country} · Code {delegate?.confirmationCode}
            </p>
            {delegate?.travelUpdatedAt && (
              <p className="text-xs text-accent mt-1">
                You last updated these details on {new Date(delegate.travelUpdatedAt).toLocaleDateString()}.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Arrival */}
      <div>
        <h3 className={sectionHeadingClass}>Arrival in Harare</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Arrival date</label>
            <input type="date" value={form.arrivalDate} onChange={set("arrivalDate")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Arrival time</label>
            <input type="time" value={form.arrivalTime} onChange={set("arrivalTime")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Airline</label>
            <input value={form.airlineCompany} onChange={set("airlineCompany")} className={inputClass} placeholder="e.g. Ethiopian Airlines" />
          </div>
          <div>
            <label className={labelClass}>Flight number</label>
            <input value={form.flightNumber} onChange={set("flightNumber")} className={inputClass} placeholder="e.g. ET301" />
          </div>
        </div>
      </div>

      {/* Departure */}
      <div>
        <h3 className={sectionHeadingClass}>Departure from Harare</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Departure date</label>
            <input type="date" value={form.departureDate} onChange={set("departureDate")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Departure time</label>
            <input type="time" value={form.departureTime} onChange={set("departureTime")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Airline</label>
            <input value={form.departureAirline} onChange={set("departureAirline")} className={inputClass} placeholder="e.g. Ethiopian Airlines" />
          </div>
          <div>
            <label className={labelClass}>Flight number</label>
            <input value={form.departureFlightNumber} onChange={set("departureFlightNumber")} className={inputClass} placeholder="e.g. ET302" />
          </div>
        </div>
      </div>

      {/* Accommodation */}
      <div>
        <h3 className={sectionHeadingClass}>Accommodation</h3>
        <label className={labelClass}>Where are you staying?</label>
        <select value={form.accommodation} onChange={set("accommodation")} className={inputClass}>
          <option value="">Select your hotel...</option>
          {HOTEL_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
          <option value="OTHER">Other hotel (not listed)</option>
          <option value="Not yet decided">Not yet decided</option>
        </select>
        <p className="text-xs text-muted-foreground mt-1.5">
          Delegates book and pay for their own accommodation directly with the hotel. Official rates are on the{" "}
          <a href="/accommodation" className="text-primary underline">accommodation page</a> — quote &quot;AIRDC 2026&quot;.
        </p>
        {form.accommodation === "OTHER" && (
          <div className="mt-4">
            <label className={labelClass}>Name of your hotel</label>
            <input
              value={form.accommodationOther}
              onChange={set("accommodationOther")}
              className={inputClass}
              placeholder="Enter the name of the hotel you will be staying at"
            />
          </div>
        )}
      </div>

      {/* Transfers */}
      <div>
        <h3 className={sectionHeadingClass}>Airport Transfer</h3>
        <label className={labelClass}>Would you like an airport pick-up on arrival?</label>
        <div className="flex gap-6">
          {["YES", "NO"].map(v => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="airportPickup"
                value={v}
                checked={form.airportPickup === v}
                onChange={set("airportPickup")}
                className="accent-primary"
              />
              <span className="text-sm">{v === "YES" ? "Yes, please" : "No, I have my own arrangements"}</span>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label className={labelClass}>Anything else we should know? (optional)</label>
          <textarea
            value={form.specialNeeds}
            onChange={set("specialNeeds")}
            rows={3}
            className={inputClass}
            placeholder="Travelling with a colleague, mobility assistance, late arrival, etc."
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full btn-primary py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
        {saving ? "Saving…" : "Submit my travel details"}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        You can reopen this link and update your details at any time before the conference.
      </p>
    </form>
  );
}
