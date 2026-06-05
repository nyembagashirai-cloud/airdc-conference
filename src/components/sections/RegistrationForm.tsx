"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  organisation: z.string().min(2, "Organisation required"),
  jobTitle: z.string().min(2, "Job title required"),
  country: z.string().min(2, "Country required"),
  delegateType: z.enum(["DELEGATE", "SPEAKER", "SPONSOR", "PRESS", "ORGANISER", "VIP"]),
  workshopChoice: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
  terms: z.boolean().refine(v => v === true, "You must accept the terms"),
});

type FormData = z.infer<typeof schema>;

const delegateTypes = [
  { value: "DELEGATE", label: "Conference Delegate" },
  { value: "SPEAKER", label: "Speaker" },
  { value: "SPONSOR", label: "Sponsor Representative" },
  { value: "PRESS", label: "Press / Media" },
  { value: "VIP", label: "VIP / Government Official" },
];

const workshops = [
  "InsurTech & Digital Transformation",
  "Microinsurance & Financial Inclusion",
  "Climate Risk & Parametric Insurance",
  "AI in Underwriting & Claims",
  "Regulatory Frameworks for Innovation",
];

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (e) {
      setError("Something went wrong. Please try again or email us at registration@airdc2026.org");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-premium p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-accent" />
        </div>
        <h2 className="font-heading font-bold text-primary text-2xl mb-3">Registration Received!</h2>
        <p className="text-foreground/70 mb-4">
          Thank you for registering for the 23rd AIRDC Conference. A confirmation email has been sent to your inbox.
        </p>
        <p className="text-sm text-muted-foreground">
          Our team will contact you with payment instructions and further details within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="card-premium p-8">
      <h2 className="font-heading font-bold text-primary text-2xl mb-6">Delegate Registration Form</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Personal Info */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">First Name *</label>
              <input {...register("firstName")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="First name" />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Last Name *</label>
              <input {...register("lastName")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Last name" />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
              <input {...register("email")} type="email"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="email@company.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
              <input {...register("phone")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="+1 234 567 8900" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Professional */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">Professional Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Organisation *</label>
              <input {...register("organisation")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Your organisation" />
              {errors.organisation && <p className="text-red-500 text-xs mt-1">{errors.organisation.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Job Title *</label>
              <input {...register("jobTitle")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Your role" />
              {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Country *</label>
              <input {...register("country")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Country of residence" />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Delegate Type *</label>
              <select {...register("delegateType")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                <option value="">Select type...</option>
                {delegateTypes.map(dt => <option key={dt.value} value={dt.value}>{dt.label}</option>)}
              </select>
              {errors.delegateType && <p className="text-red-500 text-xs mt-1">{errors.delegateType.message}</p>}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">Conference Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Workshop</label>
              <select {...register("workshopChoice")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                <option value="">Select workshop...</option>
                {workshops.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Dietary Requirements</label>
              <input {...register("dietaryRequirements")}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. Vegetarian, Halal, Gluten-free" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Special Requirements / Accessibility Needs</label>
              <textarea {...register("specialNeeds")} rows={2}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Please let us know any special requirements" />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
          <input {...register("terms")} type="checkbox" id="terms"
            className="mt-0.5 w-4 h-4 accent-primary" />
          <label htmlFor="terms" className="text-sm text-foreground/70 leading-relaxed">
            I agree to the <a href="/terms" className="text-primary underline">Terms & Conditions</a> and <a href="/privacy" className="text-primary underline">Privacy Policy</a>. I consent to AIRDC processing my data for conference administration purposes. *
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

        <button type="submit" disabled={submitting}
          className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
          {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Registration"}
        </button>
        
        <p className="text-xs text-muted-foreground text-center">
          After submission, our team will send payment instructions within 48 hours.
        </p>
      </form>
    </div>
  );
}
