"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  subject: z.enum(["GENERAL", "SPONSORSHIP", "MEDIA", "LOGISTICS", "SPEAKER_INQUIRY", "FEEDBACK"]),
  message: z.string().min(20, "Please provide a detailed message (min. 20 characters)"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "GENERAL" },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Failed to send message. Please email us directly at info@airdc2026.org");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-premium p-10 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-accent" />
        </div>
        <h3 className="font-heading font-bold text-primary text-xl mb-2">Message Sent!</h3>
        <p className="text-foreground/70">We'll respond within 2 business days.</p>
      </div>
    );
  }

  return (
    <div className="card-premium p-8">
      <h2 className="font-heading font-bold text-primary text-2xl mb-6">Send us a Message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot */}
        <input {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
            <input {...register("name")} className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Your full name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
            <input {...register("email")} type="email" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
            <input {...register("phone")} className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Organisation</label>
            <input {...register("organisation")} className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Your organisation" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Enquiry Type *</label>
          <select {...register("subject")} className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
            <option value="GENERAL">General Enquiry</option>
            <option value="SPONSORSHIP">Sponsorship</option>
            <option value="MEDIA">Press & Media</option>
            <option value="LOGISTICS">Logistics & Accommodation</option>
            <option value="SPEAKER_INQUIRY">Speaker Inquiry</option>
            <option value="FEEDBACK">Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
          <textarea {...register("message")} rows={6}
            className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            placeholder="How can we help you?" />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

        <button type="submit" disabled={submitting} className="btn-primary w-full text-base py-4 disabled:opacity-60">
          {submitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : "Send Message"}
        </button>
      </form>
    </div>
  );
}
