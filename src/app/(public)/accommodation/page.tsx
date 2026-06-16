import type { Metadata } from "next";
import Image from "next/image";
import { Star, ExternalLink, MapPin, Mail, Info, CheckCircle2, Phone, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Accommodation",
  description: "Official conference hotels for AIRDC 2026 in Harare, Zimbabwe. Special delegate rates at Rainbow Towers, Holiday Inn, Cresta Jameson, N1 Hotel and Cresta Lodge.",
};

const hotels = [
  {
    name: "Rainbow Towers Hotel & Conference Centre",
    stars: 4,
    address: "Pennefather Avenue, Harare",
    badge: "Conference Venue",
    featured: true,
    image: "/images/rainbow-hotel.webp",
    website: "https://rtgafrica.com/rainbow-towers-hotel/",
    singleRate: "$130",
    rateType: "B&B",
    description: "The official conference venue — home to the Harare International Conference Centre (HICC). Delegates staying here will be steps from all plenary sessions and networking events. The hotel offers stunning city views and on-site facilities including an adventure park.",
    features: ["Official conference venue (HICC)", "City views", "On-site adventure park", "Wi-Fi"],
    contact: { name: "Fadzai Dube", phone: "+263 777 305 932", email: "fadzai@africansun.com" },
  },
  {
    name: "Holiday Inn Harare",
    stars: 4,
    address: "Samora Machel Avenue, Harare",
    badge: null,
    featured: false,
    image: "/images/holiday-inn-harare.jpg",
    website: "https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-ZW-_-HARSF",
    singleRate: "$130",
    rateType: "B&B",
    description: "An internationally recognised 4-star hotel in central Harare. Visit the hotel website for full details on rooms and facilities.",
    features: null,
    contact: { name: "Fadzai Dube", phone: "+263 777 305 932", email: "fadzaidu@africansun.com" },
  },
  {
    name: "Cresta Lodge Harare",
    stars: 3,
    address: "Near Mukuvisi Woodlands, Harare",
    badge: null,
    featured: false,
    image: "/images/cresta-lodge-harare-exterior.jpg",
    website: "https://www.crestahotels.com/hotels/zimbabwe/cresta-lodge-harare",
    singleRate: "$110",
    rateType: "B&B",
    description: "Set in tranquil garden surroundings on the outskirts of Harare, near Mukuvisi Woodlands. Recently refurbished to modern standards. Rooms feature Wi-Fi, air conditioning, mini bar, satellite TV, and safe.",
    features: ["Garden setting", "Recently refurbished", "Wi-Fi", "Air conditioning", "Mini bar", "Satellite TV", "In-room safe"],
    contact: { name: "Clifford Kudubya", phone: "+263 777 651 097", email: "fom@lodge.cresta.co.zw" },
  },
  {
    name: "Cresta Jameson Hotel",
    stars: 4,
    address: "Stanley Avenue, Harare CBD",
    badge: null,
    featured: false,
    image: "/images/cresta-jameson.avif",
    website: "https://www.crestahotels.com/hotels/zimbabwe/cresta-jameson",
    singleRate: "$90",
    rateType: "B&B",
    description: "Harare's first four-star hotel (opened 1958), set in the heart of the central business district. Features a rooftop pool with city views, a gym, and an Activities Desk for arranging local excursions. Near the National Gallery of Zimbabwe.",
    features: ["Rooftop pool", "Gym", "Wi-Fi", "Mini bar", "Air conditioning", "Satellite TV", "Activities Desk"],
    contact: { name: "Anyway", phone: "+263 773 920 404", email: "fom@jameson.cresta.co.zw" },
  },
  {
    name: "N1 Hotel Harare",
    stars: 3,
    address: "Rotten Row, Harare",
    badge: "Budget-Friendly",
    featured: false,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    website: "https://www.n1hotel.co.zw/samoramachel/",
    singleRate: "$70",
    rateType: "Bed only",
    description: "A practical, affordable option with two Harare locations (Samora Machel Avenue and Rotten Row). All rooms include en-suite bathroom, room safe, satellite TV, Wi-Fi, work area, and tea & coffee station. Note: standard rooms have ceiling fans; superior and executive rooms are air-conditioned.",
    features: ["En-suite bathroom", "Room safe", "Satellite TV", "Wi-Fi", "Work area", "Tea & coffee", "AC in superior/executive rooms"],
    contact: { name: "Reservations", phone: "+263 777 604 291", email: "rottenrow@n1hotel.co.zw" },
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-secondary text-secondary" />
      ))}
    </div>
  );
}

export default function AccommodationPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">AIRDC 2026</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Accommodation Guide</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Official conference hotels with special delegate rates. Quote <strong className="text-secondary">&quot;AIRDC 2026&quot;</strong> when making your booking.
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-secondary/10 border-y-2 border-secondary">
        <div className="container py-5">
          <div className="flex gap-3 items-start">
            <Info size={20} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-foreground/80 text-sm leading-relaxed">
              <strong>Booking Note:</strong> All accommodation costs are at the delegate&apos;s own expense. Rooms are allocated on a first-come, first-served basis and are limited. We strongly recommend booking early. Always quote <strong>&quot;AIRDC 2026&quot;</strong> when contacting hotels.
            </p>
          </div>
        </div>
      </div>

      {/* Hotels */}
      <section className="section-padding bg-muted">
        <div className="container space-y-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.name}
              className={`bg-white rounded-2xl overflow-hidden shadow-card border ${hotel.featured ? "border-secondary border-2" : "border-border"}`}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image */}
                <div className="relative h-56 md:h-auto md:col-span-2 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
                  {hotel.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star size={11} className="fill-primary" /> {hotel.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:col-span-3 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h2 className="font-heading font-black text-primary text-xl leading-tight">{hotel.name}</h2>
                      <StarRating count={hotel.stars} />
                    </div>
                    {hotel.singleRate ? (
                      <div className="text-right flex-shrink-0 bg-primary/5 rounded-xl px-4 py-3 border border-primary/10">
                        <p className="text-xs text-muted-foreground">{hotel.rateType}</p>
                        <p className="font-black text-primary text-xl leading-tight">
                          {hotel.singleRate}<span className="text-xs font-normal">/night</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Single rate</p>
                      </div>
                    ) : (
                      <div className="text-right flex-shrink-0 bg-muted rounded-xl px-4 py-3 border border-border">
                        <p className="text-xs text-muted-foreground font-medium">Contact for</p>
                        <p className="font-bold text-foreground text-sm">delegate rates</p>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-xs flex items-center gap-1 mb-3">
                    <MapPin size={11} /> {hotel.address}
                  </p>

                  <p className="text-foreground/75 text-sm leading-relaxed mb-4">{hotel.description}</p>

                  {hotel.features && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.features.map((f) => (
                        <span key={f} className="flex items-center gap-1 text-xs bg-muted text-foreground/70 px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={10} className="text-primary" /> {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact details */}
                  {hotel.contact && (
                    <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 mb-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Direct Contact — Quote &quot;AIRDC 2026&quot;</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                        <span className="flex items-center gap-1.5 text-sm text-foreground/80">
                          <User size={13} className="text-primary flex-shrink-0" />
                          <span className="font-medium">{hotel.contact.name}</span>
                        </span>
                        <a href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary transition-colors">
                          <Phone size={13} className="text-primary flex-shrink-0" />
                          {hotel.contact.phone}
                        </a>
                        <a href={`mailto:${hotel.contact.email}`} className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary transition-colors">
                          <Mail size={13} className="text-primary flex-shrink-0" />
                          {hotel.contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn-primary text-sm"
                    >
                      Book Directly <ExternalLink size={14} />
                    </a>
                    <p className="text-xs text-muted-foreground mt-2">
                      Remember to quote <strong>&quot;AIRDC 2026&quot;</strong> to receive the delegate rate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rates Summary Table */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-primary text-2xl mb-6 text-center">Delegate Rate Summary</h2>
          <div className="rounded-2xl border border-border overflow-hidden shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-5 py-3 font-semibold">Hotel</th>
                  <th className="text-center px-4 py-3 font-semibold">Stars</th>
                  <th className="text-right px-4 py-3 font-semibold">Rate / Night</th>
                  <th className="text-left px-5 py-3 font-semibold">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {hotels.map((hotel, i) => (
                  <tr key={hotel.name} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                    <td className="px-5 py-3 font-medium text-foreground">{hotel.name}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-0.5">
                        {Array.from({ length: hotel.stars }).map((_, j) => (
                          <Star key={j} size={10} className="fill-secondary text-secondary" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {hotel.singleRate ? (
                        <span className="font-bold text-primary">
                          {hotel.singleRate} <span className="text-xs font-normal text-muted-foreground">({hotel.rateType})</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">On request</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {hotel.contact ? (
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-foreground">{hotel.contact.name}</p>
                          <a href={`mailto:${hotel.contact.email}`} className="text-xs text-primary hover:underline block">{hotel.contact.email}</a>
                          <a href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`} className="text-xs text-muted-foreground hover:text-primary block">{hotel.contact.phone}</a>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">See hotel website</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-muted-foreground text-xs mt-4">
            Rates are per room per night in USD. B&B = Bed and Breakfast included. All rates subject to availability and confirmation by hotels.
          </p>
        </div>
      </section>

      {/* Contact / Help */}
      <section className="section-padding bg-muted">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-primary text-2xl mb-3">Need Help with Accommodation?</h2>
          <p className="text-muted-foreground mb-6">
            If you have difficulty booking or require assistance with special accommodation arrangements, please contact the AIRDC 2026 secretariat.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            <Mail size={16} /> Contact the Secretariat
          </a>
        </div>
      </section>
    </div>
  );
}
