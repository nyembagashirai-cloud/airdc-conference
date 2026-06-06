import { Star, ExternalLink, MapPin, ChevronDown } from "lucide-react";

type Rate = { roomType: string; single?: number; double?: number; note?: string };

type Hotel = {
  name: string;
  stars: number;
  rooms: number;
  address: string;
  description: string;
  website: string;
  featured?: boolean;
  badge?: string;
  amenities: string[];
  rates: Rate[];
  rateNote?: string;
};

const hotels: Hotel[] = [
  {
    name: "Hyatt Regency Harare — The Meikles",
    stars: 5,
    rooms: 40,
    address: "Jason Moyo Avenue, Harare",
    description: "Harare's most prestigious luxury hotel. Delegate rates include 20% discount. Bed & Breakfast basis.",
    website: "https://www.hyatt.com/hyatt-regency/en-US/hrerh-hyatt-regency-harare-the-meikles",
    featured: true,
    badge: "Official Partner Hotel — 20% Delegate Discount",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Fitness Centre", "Business Centre"],
    rateNote: "20% AIRDC discount applied. Bed & Breakfast. Quote 'AIRDC 2026' when booking.",
    rates: [
      { roomType: "1 King Bed", single: 228, double: 253 },
      { roomType: "1 King Bed Park View", single: 244, double: 269 },
      { roomType: "1 King Bed High Floor", single: 280, double: 305 },
      { roomType: "1 King Bed Park High Floor", single: 296, double: 321 },
      { roomType: "1 King Bed with Club Access", single: 324, double: 349 },
      { roomType: "1 King Bed Park View with Club Access", single: 340, double: 365 },
      { roomType: "Regency Executive Suite", single: 416, double: 312 },
      { roomType: "Regency Executive Corner Suite", single: 462, double: 347 },
    ],
  },
  {
    name: "Rainbow Towers Hotel",
    stars: 4,
    rooms: 150,
    address: "Pennefather Avenue, Harare",
    description: "Modern hotel adjacent to the Zimbabwe International Exhibition Centre with excellent facilities and easy conference access. Bed & Breakfast basis.",
    website: "https://rtgafrica.com/rainbow-towers-hotel/",
    amenities: ["Free WiFi", "Parking", "Restaurant", "Conference Facilities"],
    rateNote: "Bed & Breakfast. Quote 'AIRDC 2026' for delegate rate.",
    rates: [
      { roomType: "Single Standard / Twin", single: 130, note: "B&B" },
    ],
  },
  {
    name: "Holiday Inn Harare",
    stars: 4,
    rooms: 150,
    address: "Samora Machel Avenue, Harare",
    description: "International-standard hotel centrally located with modern amenities, ideal for business travellers. Bed & Breakfast basis.",
    website: "https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-ZW-_-HARSF",
    amenities: ["Free WiFi", "Parking", "Restaurant", "Pool"],
    rateNote: "Bed & Breakfast. Quote 'AIRDC 2026' for delegate rate.",
    rates: [
      { roomType: "Single Standard / Twin", single: 130, note: "B&B" },
      { roomType: "Executive Room Double", double: 325 },
    ],
  },
  {
    name: "Cresta Jameson Hotel",
    stars: 4,
    rooms: 50,
    address: "Stanley Avenue & Samora Machel, Harare",
    description: "Well-located hotel offering comfortable rooms with a range of amenities in the heart of Harare. Bed & Breakfast basis.",
    website: "https://www.crestahotels.com",
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rateNote: "Bed & Breakfast. Quote 'AIRDC 2026' for delegate rate.",
    rates: [
      { roomType: "Single Standard / Twin", single: 90, note: "B&B" },
      { roomType: "Deluxe Room", single: 110 },
      { roomType: "Superior Room", single: 150 },
      { roomType: "Executive Room Single", single: 180 },
    ],
  },
  {
    name: "N1 Hotels Harare",
    stars: 3,
    rooms: 75,
    address: "Harare",
    description: "Comfortable and affordable option for delegates. Bed only basis.",
    website: "https://www.n1hotels.co.zw",
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rateNote: "Bed only (no breakfast). Quote 'AIRDC 2026' for delegate rate.",
    rates: [
      { roomType: "Single Standard / Twin", single: 70, note: "Bed only" },
      { roomType: "Deluxe Room", single: 80 },
      { roomType: "Superior Room", single: 90 },
      { roomType: "Executive Room Single", single: 100 },
    ],
  },
  {
    name: "Cresta Lodge",
    stars: 3,
    rooms: 100,
    address: "Harare",
    description: "Relaxed lodge-style accommodation offering a comfortable stay for conference delegates.",
    website: "https://www.crestahotels.com",
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rateNote: "Contact hotel for delegate rates. Quote 'AIRDC 2026'.",
    rates: [],
  },
  {
    name: "Cresta Oasis Hotel",
    stars: 3,
    rooms: 50,
    address: "Harare",
    description: "Comfortable hotel offering good value accommodation for conference delegates.",
    website: "https://www.crestahotels.com",
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rateNote: "Contact hotel for delegate rates. Quote 'AIRDC 2026'.",
    rates: [],
  },
  {
    name: "Purpose International Hotel",
    stars: 3,
    rooms: 70,
    address: "Harare",
    description: "Modern hotel offering comfortable accommodation for business travellers attending the conference.",
    website: "https://www.purposeinternational.co.zw",
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rateNote: "Contact hotel for delegate rates. Quote 'AIRDC 2026'.",
    rates: [],
  },
  {
    name: "Grays Apartments",
    stars: 3,
    rooms: 25,
    address: "Harare",
    description: "Self-catering serviced apartments offering a home-away-from-home experience for delegates seeking more space.",
    website: "https://www.graysapartments.co.zw",
    amenities: ["Free WiFi", "Parking", "Kitchenette", "Laundry"],
    rateNote: "Contact for delegate rates. Quote 'AIRDC 2026'.",
    rates: [],
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

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-card border ${hotel.featured ? "border-secondary border-2" : "border-border"}`}>
      {hotel.featured && (
        <div className="bg-secondary text-primary font-bold text-xs px-4 py-2 flex items-center gap-2">
          <Star size={11} className="fill-primary" />
          {hotel.badge}
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="font-heading font-bold text-primary text-lg leading-tight">{hotel.name}</h3>
              <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-2 py-1 rounded-full">{hotel.rooms} rooms</span>
            </div>
            <StarRating count={hotel.stars} />
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-2 mb-3">
              <MapPin size={12} />
              <span>{hotel.address}</span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">{hotel.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {hotel.amenities.map((a) => (
                <span key={a} className="text-xs bg-primary/5 text-primary border border-primary/10 px-2.5 py-0.5 rounded-full">{a}</span>
              ))}
            </div>
          </div>

          {/* Right: rates */}
          <div className="lg:w-72 bg-muted rounded-xl p-4">
            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Delegate Rates (USD/night)</p>

            {hotel.rates.length > 0 ? (
              <>
                {/* Header row */}
                <div className="grid grid-cols-3 gap-1 mb-1">
                  <p className="text-xs text-muted-foreground col-span-1">Room Type</p>
                  <p className="text-xs text-muted-foreground text-center">Single</p>
                  <p className="text-xs text-muted-foreground text-center">Double</p>
                </div>
                <div className="space-y-1 mb-4">
                  {hotel.rates.map((rate) => (
                    <div key={rate.roomType} className="grid grid-cols-3 gap-1 py-1.5 border-b border-border last:border-0 items-center">
                      <p className="text-xs text-foreground col-span-1 leading-tight">{rate.roomType}{rate.note ? <span className="block text-muted-foreground">{rate.note}</span> : null}</p>
                      <p className="text-center font-bold text-primary text-sm">{rate.single ? `$${rate.single}` : "—"}</p>
                      <p className="text-center font-bold text-primary text-sm">{rate.double ? `$${rate.double}` : "—"}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg p-3 mb-4 text-center">
                <p className="text-sm text-muted-foreground">Contact hotel for delegate rates</p>
              </div>
            )}

            {hotel.rateNote && (
              <p className="text-xs text-muted-foreground italic mb-3">{hotel.rateNote}</p>
            )}

            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full bg-primary text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book on Hotel Website <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
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
            Special delegate rates have been negotiated at all hotels below. Book directly and quote <strong>"AIRDC 2026"</strong> to access delegate pricing.
          </p>
        </div>

        <div className="space-y-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.name} hotel={hotel} />
          ))}
        </div>

        <div className="mt-8 bg-primary/5 border border-primary/10 rounded-xl p-5 text-center">
          <p className="text-sm text-foreground/70">
            All rates are per room per night in USD. Rates are subject to availability and may change.
            For group bookings of 5+ rooms, contact <a href="mailto:info@airdczim.co.zw" className="text-primary font-semibold hover:underline">info@airdczim.co.zw</a>
          </p>
        </div>
      </div>
    </section>
  );
}
