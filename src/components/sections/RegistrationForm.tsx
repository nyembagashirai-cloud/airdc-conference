"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
    "MEDIA_SPEAKER_ORGANISER",
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

const dialCodes = [
  { flag: "🇿🇼", name: "Zimbabwe", code: "+263" },
  { flag: "🇿🇦", name: "South Africa", code: "+27" },
  { flag: "🇿🇲", name: "Zambia", code: "+260" },
  { flag: "🇧🇼", name: "Botswana", code: "+267" },
  { flag: "🇳🇦", name: "Namibia", code: "+264" },
  { flag: "🇲🇿", name: "Mozambique", code: "+258" },
  { flag: "🇲🇼", name: "Malawi", code: "+265" },
  { flag: "🇹🇿", name: "Tanzania", code: "+255" },
  { flag: "🇰🇪", name: "Kenya", code: "+254" },
  { flag: "🇺🇬", name: "Uganda", code: "+256" },
  { flag: "🇷🇼", name: "Rwanda", code: "+250" },
  { flag: "🇳🇬", name: "Nigeria", code: "+234" },
  { flag: "🇬🇭", name: "Ghana", code: "+233" },
  { flag: "🇸🇳", name: "Senegal", code: "+221" },
  { flag: "🇨🇮", name: "Ivory Coast", code: "+225" },
  { flag: "🇨🇲", name: "Cameroon", code: "+237" },
  { flag: "🇪🇹", name: "Ethiopia", code: "+251" },
  { flag: "🇦🇴", name: "Angola", code: "+244" },
  { flag: "🇩🇿", name: "Algeria", code: "+213" },
  { flag: "🇲🇦", name: "Morocco", code: "+212" },
  { flag: "🇹🇳", name: "Tunisia", code: "+216" },
  { flag: "🇱🇾", name: "Libya", code: "+218" },
  { flag: "🇪🇬", name: "Egypt", code: "+20" },
  { flag: "🇲🇺", name: "Mauritius", code: "+230" },
  { flag: "🇸🇨", name: "Seychelles", code: "+248" },
  { flag: "🇲🇬", name: "Madagascar", code: "+261" },
  { flag: "🇨🇩", name: "Congo (DRC)", code: "+243" },
  { flag: "🇨🇬", name: "Congo", code: "+242" },
  { flag: "🇬🇦", name: "Gabon", code: "+241" },
  { flag: "🇸🇩", name: "Sudan", code: "+249" },
  { flag: "🇸🇸", name: "South Sudan", code: "+211" },
  { flag: "🇿🇼", name: "──────────", code: "" },
  { flag: "🌍", name: "Afghanistan", code: "+93" },
  { flag: "🌍", name: "Albania", code: "+355" },
  { flag: "🌎", name: "Argentina", code: "+54" },
  { flag: "🌏", name: "Armenia", code: "+374" },
  { flag: "🌏", name: "Australia", code: "+61" },
  { flag: "🌍", name: "Austria", code: "+43" },
  { flag: "🌏", name: "Azerbaijan", code: "+994" },
  { flag: "🌎", name: "Bahamas", code: "+1242" },
  { flag: "🌏", name: "Bahrain", code: "+973" },
  { flag: "🌏", name: "Bangladesh", code: "+880" },
  { flag: "🌎", name: "Barbados", code: "+1246" },
  { flag: "🌍", name: "Belarus", code: "+375" },
  { flag: "🌍", name: "Belgium", code: "+32" },
  { flag: "🌎", name: "Belize", code: "+501" },
  { flag: "🌍", name: "Benin", code: "+229" },
  { flag: "🌏", name: "Bhutan", code: "+975" },
  { flag: "🌎", name: "Bolivia", code: "+591" },
  { flag: "🌍", name: "Bosnia and Herzegovina", code: "+387" },
  { flag: "🌍", name: "Bulgaria", code: "+359" },
  { flag: "🌍", name: "Burkina Faso", code: "+226" },
  { flag: "🌍", name: "Burundi", code: "+257" },
  { flag: "🌍", name: "Cabo Verde", code: "+238" },
  { flag: "🌏", name: "Cambodia", code: "+855" },
  { flag: "🌎", name: "Canada", code: "+1" },
  { flag: "🌎", name: "Chile", code: "+56" },
  { flag: "🌏", name: "China", code: "+86" },
  { flag: "🌎", name: "Colombia", code: "+57" },
  { flag: "🌍", name: "Comoros", code: "+269" },
  { flag: "🌎", name: "Costa Rica", code: "+506" },
  { flag: "🌍", name: "Croatia", code: "+385" },
  { flag: "🌎", name: "Cuba", code: "+53" },
  { flag: "🌍", name: "Cyprus", code: "+357" },
  { flag: "🌍", name: "Czech Republic", code: "+420" },
  { flag: "🌍", name: "Denmark", code: "+45" },
  { flag: "🌍", name: "Djibouti", code: "+253" },
  { flag: "🌎", name: "Dominican Republic", code: "+1809" },
  { flag: "🌎", name: "Ecuador", code: "+593" },
  { flag: "🌎", name: "El Salvador", code: "+503" },
  { flag: "🌍", name: "Equatorial Guinea", code: "+240" },
  { flag: "🌍", name: "Eritrea", code: "+291" },
  { flag: "🌍", name: "Estonia", code: "+372" },
  { flag: "🌍", name: "Eswatini", code: "+268" },
  { flag: "🌏", name: "Fiji", code: "+679" },
  { flag: "🌍", name: "Finland", code: "+358" },
  { flag: "🌍", name: "France", code: "+33" },
  { flag: "🌍", name: "Georgia", code: "+995" },
  { flag: "🌍", name: "Germany", code: "+49" },
  { flag: "🌍", name: "Greece", code: "+30" },
  { flag: "🌎", name: "Guatemala", code: "+502" },
  { flag: "🌍", name: "Guinea", code: "+224" },
  { flag: "🌎", name: "Guyana", code: "+592" },
  { flag: "🌎", name: "Haiti", code: "+509" },
  { flag: "🌎", name: "Honduras", code: "+504" },
  { flag: "🌍", name: "Hungary", code: "+36" },
  { flag: "🌍", name: "Iceland", code: "+354" },
  { flag: "🌏", name: "India", code: "+91" },
  { flag: "🌏", name: "Indonesia", code: "+62" },
  { flag: "🌏", name: "Iran", code: "+98" },
  { flag: "🌏", name: "Iraq", code: "+964" },
  { flag: "🌍", name: "Ireland", code: "+353" },
  { flag: "🌏", name: "Israel", code: "+972" },
  { flag: "🌍", name: "Italy", code: "+39" },
  { flag: "🌎", name: "Jamaica", code: "+1876" },
  { flag: "🌏", name: "Japan", code: "+81" },
  { flag: "🌏", name: "Jordan", code: "+962" },
  { flag: "🌏", name: "Kazakhstan", code: "+7" },
  { flag: "🌏", name: "Kuwait", code: "+965" },
  { flag: "🌏", name: "Kyrgyzstan", code: "+996" },
  { flag: "🌏", name: "Laos", code: "+856" },
  { flag: "🌍", name: "Latvia", code: "+371" },
  { flag: "🌏", name: "Lebanon", code: "+961" },
  { flag: "🌍", name: "Lesotho", code: "+266" },
  { flag: "🌍", name: "Liberia", code: "+231" },
  { flag: "🌍", name: "Lithuania", code: "+370" },
  { flag: "🌍", name: "Luxembourg", code: "+352" },
  { flag: "🌏", name: "Malaysia", code: "+60" },
  { flag: "🌏", name: "Maldives", code: "+960" },
  { flag: "🌍", name: "Mali", code: "+223" },
  { flag: "🌍", name: "Malta", code: "+356" },
  { flag: "🌍", name: "Mauritania", code: "+222" },
  { flag: "🌎", name: "Mexico", code: "+52" },
  { flag: "🌍", name: "Moldova", code: "+373" },
  { flag: "🌍", name: "Mongolia", code: "+976" },
  { flag: "🌎", name: "Nicaragua", code: "+505" },
  { flag: "🌍", name: "Niger", code: "+227" },
  { flag: "🌏", name: "North Korea", code: "+850" },
  { flag: "🌍", name: "North Macedonia", code: "+389" },
  { flag: "🌍", name: "Norway", code: "+47" },
  { flag: "🌏", name: "Oman", code: "+968" },
  { flag: "🌏", name: "Pakistan", code: "+92" },
  { flag: "🌏", name: "Palestine", code: "+970" },
  { flag: "🌎", name: "Panama", code: "+507" },
  { flag: "🌎", name: "Paraguay", code: "+595" },
  { flag: "🌎", name: "Peru", code: "+51" },
  { flag: "🌏", name: "Philippines", code: "+63" },
  { flag: "🌍", name: "Poland", code: "+48" },
  { flag: "🌍", name: "Portugal", code: "+351" },
  { flag: "🌏", name: "Qatar", code: "+974" },
  { flag: "🌍", name: "Romania", code: "+40" },
  { flag: "🌍", name: "Russia", code: "+7" },
  { flag: "🌏", name: "Saudi Arabia", code: "+966" },
  { flag: "🌍", name: "Sierra Leone", code: "+232" },
  { flag: "🌏", name: "Singapore", code: "+65" },
  { flag: "🌍", name: "Slovakia", code: "+421" },
  { flag: "🌍", name: "Slovenia", code: "+386" },
  { flag: "🌏", name: "South Korea", code: "+82" },
  { flag: "🌍", name: "Spain", code: "+34" },
  { flag: "🌏", name: "Sri Lanka", code: "+94" },
  { flag: "🌍", name: "Sweden", code: "+46" },
  { flag: "🌍", name: "Switzerland", code: "+41" },
  { flag: "🌏", name: "Syria", code: "+963" },
  { flag: "🌏", name: "Taiwan", code: "+886" },
  { flag: "🌏", name: "Tajikistan", code: "+992" },
  { flag: "🌏", name: "Thailand", code: "+66" },
  { flag: "🌍", name: "Togo", code: "+228" },
  { flag: "🌎", name: "Trinidad and Tobago", code: "+1868" },
  { flag: "🌍", name: "Turkey", code: "+90" },
  { flag: "🌏", name: "Turkmenistan", code: "+993" },
  { flag: "🌍", name: "Ukraine", code: "+380" },
  { flag: "🌏", name: "United Arab Emirates", code: "+971" },
  { flag: "🌍", name: "United Kingdom", code: "+44" },
  { flag: "🌎", name: "United States", code: "+1" },
  { flag: "🌎", name: "Uruguay", code: "+598" },
  { flag: "🌏", name: "Uzbekistan", code: "+998" },
  { flag: "🌎", name: "Venezuela", code: "+58" },
  { flag: "🌏", name: "Vietnam", code: "+84" },
  { flag: "🌏", name: "Yemen", code: "+967" },
];

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
  { value: "MEDIA_SPEAKER_ORGANISER", label: "Media / Speaker / Organiser" },
];

const feeMap: Record<string, string> = {
  AIRDC_MEMBER: "$350 USD",
  SUPERVISORY_AUTHORITY_MEMBER: "$350 USD",
  NON_MEMBER: "$500 USD",
  SUPERVISORY_AUTHORITY_NON_MEMBER: "$500 USD",
  MEDIA_SPEAKER_ORGANISER: "$0.00",
};

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
  const [turnstileToken, setTurnstileToken] = useState("");
  const [phoneCode, setPhoneCode] = useState("+263");
  const turnstileRef = useRef<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { visaInvitation: "NO" },
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const onTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  useEffect(() => {
    if (!siteKey) return;
    // Expose callback globally for Turnstile
    (window as unknown as Record<string, unknown>)["_turnstileCb"] = onTurnstileSuccess;
    if (document.querySelector("#turnstile-script")) return;
    const script = document.createElement("script");
    script.id = "turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => { delete (window as unknown as Record<string, unknown>)["_turnstileCb"]; };
  }, [siteKey, onTurnstileSuccess]);

  const selectedDelegateType = watch("delegateType");
  const displayFee = selectedDelegateType ? feeMap[selectedDelegateType] : null;

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: `${phoneCode} ${data.phone}`,
          workshopChoice: undefined,
          dietaryRequirements: undefined,
          specialNeeds: undefined,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error("Submission failed");
      setConfirmationCode(json.confirmationCode ?? "");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          A confirmation email with your proforma invoice has been sent to your inbox.
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
              <div className="flex gap-2">
                <select
                  value={phoneCode}
                  onChange={e => setPhoneCode(e.target.value)}
                  className="border border-border rounded-lg px-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white w-36 flex-shrink-0"
                >
                  {dialCodes.map((d, i) =>
                    d.code === "" ? (
                      <option key={i} value="" disabled>──────────</option>
                    ) : (
                      <option key={`${d.code}-${d.name}`} value={d.code}>
                        {d.flag} {d.code} {d.name}
                      </option>
                    )
                  )}
                </select>
                <input
                  {...register("phone")}
                  className={`${inputClass} flex-1`}
                  placeholder="77 000 0000"
                />
              </div>
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
          {displayFee && (
            <div className="mt-4 flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Registration Fee</p>
                <p className="font-heading font-black text-primary text-2xl">{displayFee}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-secondary" />
              </div>
            </div>
          )}
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

        {/* Cloudflare Turnstile CAPTCHA */}
        {siteKey && (
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-callback="_turnstileCb"
            data-theme="light"
          />
        )}

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
