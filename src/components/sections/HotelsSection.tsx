import { Star, ExternalLink, MapPin, Phone, Wifi, Car, Utensils } from "lucide-react";

const hotels = [
  {
    name: "Hyatt Regency Harare — The Meikles",
    stars: 5,
    address: "Jason Moyo Avenue, Harare",
    description: "Harare's most prestigious luxury hotel, offering world-class hospitality in the heart of the city. Official conference partner hotel.",
    phone: "+263 4 707 721",
    website: "https://www.hyatt.com/hyatt-regency/en-US/hrerh-hyatt-regency-harare-the-meikles",
    bookingUrl: "https://www.hyatt.com/hyatt-regency/en-US/hrerh-hyatt-regency-harare-the-meikles",
    imageUrl: null,
    featured: true,
    amenities: ["Free WiFi", "Parking", "Restaurant", "Pool"],
    rates: [
      { roomType: "Standard Room", rateUSD: 220, includes: "Breakfast included" },
      { roomType: "Superior Room", rateUSD: 280, includes: "Breakfast included" },
      { roomType: "Executive Suite", rateUSD: 450, includes: "Full board available" },
    ],
  },
  {
    name: "Rainbow Towers Hotel",
    stars: 4,
    address: "Pennefather Avenue, Harare",
    description: "Modern hotel adjacent to the Zimbabwe International Exhibition Centre, offering excellent facilities and easy conference access.",
    phone: "+263 4 791 511",
    website: "https://rtgafrica.com/rainbow-towers-hotel/",
    bookingUrl: "https://rtgafrica.com/rainbow-towers-hotel/",
    imageUrl: null,
    featured: false,
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rates: [
      { roomType: "Standard Room", rateUSD: 160, includes: "Breakfast included" },
      { roomType: "Deluxe Room", rateUSD: 200, includes: "Breakfast included" },
      { roomType: "Junior Suite", rateUSD: 320, includes: "Breakfast included" },
    ],
  },
  {
    name: "Holiday Inn Harare",
    stars: 4,
    address: "Samora Machel Avenue, Harare",
    description: "Comfortable international-standard hotel centrally located with modern amenities, ideal for business travellers.",
    phone: "+263 4 795 611",
    website: "https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-ZW-_-HARSF",
    bookingUrl: "https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-ZW-_-HARSF",
    imageUrl: null,
    featured: false,
    amenities: ["Free WiFi", "Parking", "Restaurant"],
    rates: [
      { roomType: "Standard Room", rateUSD: 140, includes: "Room only" },
      { roomType: "Executive Room", rateUSD: 185, includes: "Breakfast included" },
      { roomType: "Suite", rateUSD: 280, includes: "Breakfast included" },
    ],
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-secondary text-secondary" />
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
            Special delegate rates have been negotiated at the following hotels. 
            Book directly using the links below and mention the AIRDC Conference.
          </p>
        </div>

        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div key={hotel.name}
              className={`card-premium overflow-hidden ${hotel.featured ? "border-secondary border-2" : ""}`}>
              {hotel.featured && (
                <div className="bg-secondary text-primary-dark text-xs font-bold px-4 py-1.5 flex items-center gap-2">
                  <Star size={12} className="fill-primary-dark" />
                  Official Partner Hotel — Priority Booking Recommended
                </div>
              )}
              <div className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-primary text-xl">{hotel.name}</h3>
                        <StarRating count={hotel.stars} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <MapPin size={14} />
                      <span>{hotel.address}</span>
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((a) => (
                        <span key={a} className="text-xs bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-full">{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Rates */}
                  <div className="lg:w-80 bg-muted rounded-xl p-5">
                    <h4 className="font-heading font-bold text-primary mb-4 text-sm uppercase tracking-wide">Delegate Rates (per night)</h4>
                    <div className="space-y-3 mb-5">
                      {hotel.rates.map((rate) => (
                        <div key={rate.roomType} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div>
                            <p className="font-medium text-sm text-foreground">{rate.roomType}</p>
                            <p className="text-xs text-muted-foreground">{rate.includes}</p>
                          </div>
                          <span className="font-heading font-bold text-primary text-lg">
                            ${rate.rateUSD}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center text-sm group"
                    >
                      Book on Hotel Website
                      <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Quote "AIRDC 2026" for delegate rate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
