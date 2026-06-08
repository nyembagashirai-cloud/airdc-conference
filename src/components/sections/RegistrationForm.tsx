"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

const schema = z.object({
  civility: z.enum(["Mr.", "Mrs.", "Ms."]),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  passportId: z.string().min(3, "Passport or ID number required"),
  email: z.string().email("Valid email required"),
  country: z.string().min(2, "Country required"),
  jobTitle: z.string().min(2, "Job title required"),
  organisation: z.string().min(2, "Company name required"),
  companyAddress: z.string().min(5, "Company address required"),
  phone: z.string().min(7, "Phone number required"),
  delegateType: z.enum([
    "AIRDC_MEMBER",
    "NON_MEMBER",
    "SUPERVISORY_AUTHORITY_MEMBER",
    "SUPERVISORY_AUTHORITY_NON_MEMBER",
    "NATIONAL_ASSOCIATION",
    "SPONSOR",
    "SPEAKER",
    "ORGANISER",
    "MEDIA",
  ]),
  branchOfActivity: z.enum([
    "Insurance",
    "Reinsurance",
    "Insurance Broker",
    "Reinsurance Broker",
    "Association",
    "Supervisory Authority",
    "Public Institution",
    "Other",
  ]),
  visaInvitation: z.enum(["YES", "NO"]),
  arrivalDate: z.string().optional(),
  arrivalTime: z.string().optional(),
  departureDate: z.string().optional(),
  departureTime: z.string().optional(),
  airlineCompany: z.string().optional(),
  flightNumber: z.string().optional(),
  terms: z.boolean().refine(v => v === true, "You must accept the terms"),
});

type FormData = z.infer<typeof schema>;

const countries = [
  "Afghanistan","Albania","Algeria","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina",
  "Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Chile","China",
  "Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Denmark","Djibouti","Dominica","East Timor","Ecuador",
  "Egypt","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
  "Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania",
  "Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe",
];

const delegateTypes = [
  { value: "AIRDC_MEMBER", label: "AIRDC Member" },
  { value: "NON_MEMBER", label: "Non Member" },
  { value: "SUPERVISORY_AUTHORITY_MEMBER", label: "Supervisory Authority / AIRDC Member" },
  { value: "SUPERVISORY_AUTHORITY_NON_MEMBER", label: "Supervisory Authority / Non Member" },
  { value: "NATIONAL_ASSOCIATION", label: "National Association / Training Institution" },
  { value: "SPONSOR", label: "Sponsor" },
  { value: "SPEAKER", label: "Speaker" },
  { value: "ORGANISER", label: "Organiser" },
  { value: "MEDIA", label: "Media (approved by AIRDC)" },
];

const branches = [
  "Insurance","Reinsurance","Insurance Broker","Reinsurance Broker",
  "Association","Supervisory Authority","Public Institution","Other",
];

const inputClass = "w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white";
const labelClass = "block text-sm font-medium text-foreground mb-1.5";
const sectionHeadingClass = "font-semibold text-foreground mb-4 pb-2 border-b-2 border-secondary text-base";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { visaInvitation: "NO" },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          workshopChoice: undefined,
          dietaryRequirements: undefined,
          specialNeeds: undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error("Submission failed");
      setConfirmationCode(json.confirmationCode ?? "");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us at info@airdczim.co.zw");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-premium p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-primary" />
        </div>
        <h2 className="font-heading font-bold text-primary text-2xl mb-3">Registration Successful!</h2>
        {confirmationCode && (
          <div className="bg-muted border-l-4 border-secondary rounded-r-lg px-6 py-4 mb-4 inline-block text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Your Confirmation Code</p>
            <p className="font-black text-primary text-3xl tracking-widest">{confirmationCode}</p>
            <p className="text-xs text-muted-foreground mt-1">Keep this — you will need it at registration</p>
          </div>
        )}
        <p className="text-foreground/70 mb-2 mt-4">
          A confirmation email has been sent to your inbox with full details.
        </p>
        <p className="text-sm text-muted-foreground">
          Our team will contact you with payment instructions within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="card-premium p-8">
      <h2 className="font-heading font-bold text-primary text-2xl mb-2">Delegate Registration</h2>
      <p className="text-muted-foreground text-sm mb-8">24th AIRDC Annual Conference · 27–30 September 2026 · Harare, Zimbabwe</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>

        {/* Personal Information */}
        <div>
          <h3 className={sectionHeadingClass}>Personal Information</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClass}>Civility *</label>
              <select {...register("civility")} className={inputClass}>
                <option value="">Select...</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
              {errors.civility && <p className="text-red-500 text-xs mt-1">{errors.civility.message}</p>}
            </div>
            <div>
              <label className={labelClass}>First Name *</label>
              <input {...register("firstName")} className={inputClass} placeholder="First name" />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input {...register("lastName")} className={inputClass} placeholder="Last name" />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Passport or Identity Card Number *</label>
              <input {...register("passportId")} className={inputClass} placeholder="Passport / ID number" />
              {errors.passportId && <p className="text-red-500 text-xs mt-1">{errors.passportId.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Email Address *</label>
              <input {...register("email")} type="email" className={inputClass} placeholder="email@company.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Country *</label>
              <select {...register("country")} className={inputClass}>
                <option value="">Select country...</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input {...register("phone")} className={inputClass} placeholder="+263 77 000 0000" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div>
          <h3 className={sectionHeadingClass}>Professional Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Job Title *</label>
              <input {...register("jobTitle")} className={inputClass} placeholder="Your role" />
              {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
            </div>
            <div>
                   <label className={labelClass}>Company / Organisation *</label>
              <input {...register("organisation")} className={inputClass} placeholder="Company name" />
              {errors.organisation && <p className="text-red-500 text-xs mt-1">{errors.organisation.message}</p>}
            </div>
          </div>
          <div>
            <label className={labelClass}>Company Address *</label>
            <input {...register("companyAddress")} className={inputClass} placeholder="Full company address" />
            {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Branch of Activity *</label>
            <select {...register("branchOfActivity")} className={inputClass}>
              <option value="">Select branch...</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.branchOfActivity && <p className="text-red-500 text-xs mt-1">{errors.branchOfActivity.message}</p>}
          </div>
        </div>

        {/* Delegate Category */}
        <div>
          <h3 className={sectionHeadingClass}>Delegate Category</h3>
          <div>
            <label className={labelClass}>Category *</label>
            <select {...register("delegateType")} className={inputClass}>
              <option value="">Select category...</option>
              {delegateTypes.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
            {errors.delegateType && <p className="text-red-500 text-xs mt-1">{errors.delegateType.message}</p>}
          </div>
        </div>

        {/* Visa & Travel */}
        <div>
          <h3 className={sectionHeadingClass}>Visa & Travel Information</h3>
          <div className="mb-4">
            <label className={labelClass}>Do you require a visa invitation letter? *</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" {...register("visaInvitation")} value="YES" className="accent-primary" />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" {...register("visaInvitation")} value="NO" className="accent-primary" />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Arrival Date</label>
              <input type="date" {...register("arrivalDate")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Arrival Time</label>
              <input type="time" {...register("arrivalTime")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Departure Date</label>
              <input type="date" {...register("departureDate")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Departure Time</label>
              <input type="time" {...register("departureTime")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Airline Company</label>
              <input {...register("airlineCompany")} className={inputClass} placeholder="e.g. Ethiopian Airlines" />
            </div>
            <div>
              <label className={labelClass}>Flight Number</label>
              <input {...register("flightNumber")} className={inputClass} placeholder="e.g. ET301" />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" {...register("terms")} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
            <span className="text-sm text-foreground/80">
              I confirm that the information provided is accurate and I agree to the{" "}
              <a href="/contact" className="text-primary underline">terms and conditions</a> of the 24th AIRDC Annual Conference.
            </span>
          </label>
          {errors.terms && <p className="text-red-500 text-xs mt-2">{errors.terms.message}</p>}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-primary py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
