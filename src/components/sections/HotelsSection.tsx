import Image from "next/image";
import { Star, ExternalLink, MapPin } from "lucide-react";

const hotels = [
  {
    name: "Hyatt Regency Harare — The Meikles",
    stars: 5,
    rooms: 40,
    address: "Jason Moyo Avenue, Harare",
    badge: "20% Delegate Discount",
    featured: true,
    image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2025/05/12/0511/HRERH-P0085-Daytime-Hotel-Exterior.jpg/HRERH-P0085-Daytime-Hotel-Exterior.16x9.jpg?imwidth=800",
    website: "https://www.hyatt.com/hyatt-regency/en-US/hrerh-hyatt-regency-harare-the-meikles",
    fromRate: "$228",
    rateNote: "B&B · Single from",
  },
  {
    name: "Rainbow Towers Hotel",
    stars: 4,
    rooms: 150,
    address: "Pennefather Avenue, Harare",
    badge: null,
    featured: false,
    image: "https://rtgafrica.com/wp-content/uploads/2021/08/Lobby-1.jpg",
    website: "https://rtgafrica.com/rainbow-towers-hotel/",
    fromRate: "$130",
    rateNote: "B&B · Single/Twin from",
  },
  {
    name: "Holiday Inn Harare",
    stars: 4,
    rooms: 150,
    address: "Samora Machel Avenue, Harare",
    badge: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    website: "https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-ZW-_-HARSF",
    fromRate: "$130",
    rateNote: "B&B · Single/Twin from",
  },
  {
    name: "Cresta Jameson Hotel",
    stars: 4,
    rooms: 50,
    address: "Stanley Avenue, Harare",
    badge: null,
    featured: false,
    image: "https://images.crestahotels.com/medium_focal_home_page_test_image_7_5bf3178aff.jpg?tr=w-800,q-90,f-auto",
    website: "https://www.crestahotels.com",
    fromRate: "$90",
    rateNote: "B&B · Single from",
  },
  {
    name: "N1 Hotel Harare",
    stars: 3,
    rooms: 75,
    address: "Harare",
    badge: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    website: "https://www.n1hotel.co.zw/",
    fromRate: "$70",
    rateNote: "Bed only · Single from",
  },
  {
    name: "Cresta Lodge",
    stars: 3,
    rooms: 100,
    address: "Harare",
    badge: null,
    featured: false,
    image: "https://images.crestahotels.com/medium_focal_home_page_test_image_7_5bf3178aff.jpg?tr=w-800,q-90,f-auto",
    website: "https://www.crestahotels.com",
    fromRate: null,
    rateNote: "Contact for delegate rates",
  },
  {
    name: "Cresta Oasis Hotel",
    stars: 3,
    rooms: 50,
    address: "Harare",
    badge: null,
    featured: false,
    image: "https://images.crestahotels.com/medium_focal_home_page_test_image_7_5bf3178aff.jpg?tr=w-800,q-90,f-auto",
    website: "https://www.crestahotels.com",
    fromRate: null,
    rateNote: "Contact for delegate rates",
  },
  {
    name: "Purpose International Hotel",
    stars: 3,
    rooms: 70,
    address: "Harare",
    badge: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1587213811864-46e59f653b75?w=800&q=80",
    website: "https://www.purposeinternationalhotel.com/",
    fromRate: null,
    rateNote: "Contact for delegate rates",
  },
  {
    name: "The Gray Luxury Apartments",
    stars: 4,
    rooms: 25,
    address: "Harare",
    badge: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    website: "https://thegray.co.zw/",
    fromRate: null,
    rateNote: "Contact for delegate rates",
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
            Special delegate rates negotiated at all hotels below. Quote <strong>"AIRDC 2026"</strong> when booking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels.map((hotel) => (
            <a
              key={hotel.name}
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white rounded-2xl overflow-hidden shadow-card border transition-all duration-200 hover:-translate-y-1 hover:shadow-premium flex flex-col ${hotel.featured ? "border-secondary border-2 sm:col-span-2 lg:col-span-1" : "border-border"}`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {hotel.featured && (
                    <span className="bg-secondary text-primary text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star size={10} className="fill-primary" /> Partner Hotel
                    </span>
                  )}
                  {hotel.badge && !hotel.featured && (
                    <span className="bg-secondary text-primary text-xs font-bold px-2.5 py-1 rounded-full">{hotel.badge}</span>
                  )}
                </div>

                {/* Rate pill */}
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

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading font-bold text-primary text-sm leading-tight">{hotel.name}</h3>
                  <ExternalLink size={13} className="text-gray-300 group-hover:text-secondary transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <StarRating count={hotel.stars} />
                <div className="flex items-center gap-1 text-muted-foreground text-xs mt-2">
                  <MapPin size={11} />
                  <span>{hotel.address}</span>
                  <span className="ml-auto bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">{hotel.rooms} rooms</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          All rates in USD per room per night. Click any hotel to book directly on their website.
          For group bookings contact <a href="mailto:info@airdczim.co.zw" className="text-primary font-semibold hover:underline">info@airdczim.co.zw</a>
        </p>
      </div>
    </section>
  );
}
