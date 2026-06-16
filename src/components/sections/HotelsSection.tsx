import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const hotels = [
  {
    name: "Rainbow Towers Hotel",
    stars: 4,
    rooms: 150,
    address: "Pennefather Avenue, Harare",
    badge: "Conference Venue",
    featured: true,
    image: "/images/rainbow-hotel.webp",
    website: "https://rtgafrica.com/rainbow-towers-hotel/",
    fromRate: "$130",
    rateNote: "B&B · Single/Twin from",
    contact: { name: "Fadzai Dube", phone: "+263 777 305 932", email: "fadzai@africansun.com" },
  },
  {
    name: "Holiday Inn Harare",
    stars: 4,
    rooms: 150,
    address: "Samora Machel Avenue, Harare",
    badge: null,
    featured: false,
    image: "/images/holiday-inn-harare.jpg",
    website: "https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-ZW-_-HARSF",
    fromRate: "$130",
    rateNote: "B&B · Single/Twin from",
    contact: { name: "Fadzai Dube", phone: "+263 777 305 932", email: "fadzaidu@africansun.com" },
  },
  {
    name: "Cresta Lodge",
    stars: 3,
    rooms: 100,
    address: "Harare",
    badge: null,
    featured: false,
    image: "/images/cresta-lodge-harare-exterior.jpg",
    website: "https://www.crestahotels.com/hotels/zimbabwe/cresta-lodge-harare",
    fromRate: "$110",
    rateNote: "B&B · Single Standard from",
    contact: { name: "Clifford Kudubya", phone: "+263 777 651 097", email: "fom@lodge.cresta.co.zw" },
  },
  {
    name: "Cresta Jameson Hotel",
    stars: 4,
    rooms: 50,
    address: "Stanley Avenue, Harare",
    badge: null,
    featured: false,
    image: "/images/cresta-jameson.avif",
    website: "https://www.crestahotels.com/hotels/zimbabwe/cresta-jameson",
    fromRate: "$90",
    rateNote: "B&B · Single from",
    contact: { name: "Anyway", phone: "+263 773 920 404", email: "fom@jameson.cresta.co.zw" },
  },
  {
    name: "N1 Hotel Harare",
    stars: 3,
    rooms: 75,
    address: "Rotten Row, Harare",
    badge: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    website: "https://www.n1hotel.co.zw/",
    fromRate: "$70",
    rateNote: "Bed only · Single from",
    contact: { name: "Reservations", phone: "+263 777 604 291", email: "rottenrow@n1hotel.co.zw" },
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="fill-secondary text-secondary" />
      ))}
    </div>
  );
}

export function HotelsSection() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Accommodation</p>
          <h2 className="section-title">Official Conference Hotels</h2>
          <p className="section-subtitle mx-auto">
            Special delegate rates negotiated at all hotels below. Quote <strong>&quot;AIRDC 2026&quot;</strong> when booking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels.map((hotel) => (
            <div
              key={hotel.name}
              className={`group bg-white rounded-2xl overflow-hidden shadow-card border flex flex-col ${hotel.featured ? "border-secondary border-2" : "border-border"}`}
            >
              {/* Image */}
              <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {hotel.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-secondary text-primary text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} className="fill-primary" /> {hotel.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3">
                    {hotel.fromRate ? (
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-right">
                        <p className="text-xs text-gray-500 leading-none">{hotel.rateNote}</p>
                        <p className="font-black text-primary text-lg leading-tight">{hotel.fromRate}<span className="text-xs font-normal">/night</span></p>
                      </div>
                    ) : (
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <p className="text-xs text-gray-500">{hotel.rateNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              </a>

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading font-bold text-foreground text-base leading-snug">{hotel.name}</h3>
                  <StarRating count={hotel.stars} />
                </div>
                <p className="text-muted-foreground text-xs mb-3 flex items-center gap-1">
                  <MapPin size={10} /> {hotel.address}
                </p>

                {/* Contact details */}
                {hotel.contact && (
                  <div className="bg-muted rounded-lg px-3 py-2 mb-3 space-y-1">
                    <p className="text-xs font-semibold text-primary">{hotel.contact.name}</p>
                    <a href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs text-foreground/70 hover:text-primary transition-colors">
                      <Phone size={10} /> {hotel.contact.phone}
                    </a>
                    <a href={`mailto:${hotel.contact.email}`} className="flex items-center gap-1.5 text-xs text-foreground/70 hover:text-primary transition-colors truncate">
                      <Mail size={10} /> {hotel.contact.email}
                    </a>
                  </div>
                )}

                <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{hotel.rooms} rooms</span>
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                  >
                    Book Now <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            All accommodation costs are at the delegate&apos;s own expense. Early booking recommended — rooms are limited.
          </p>
          <Link
            href="/accommodation"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Full Accommodation Guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
