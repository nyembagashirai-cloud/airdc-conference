export interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  jobTitle: string;
  organisation: string;
  country: string;
  bio: string;
  photoUrl?: string;
  featured: boolean;
  order: number;
  linkedin?: string;
  twitter?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "PLATINUM" | "GOLD" | "SILVER" | "SUPPORTING" | "MEDIA";
  logoUrl?: string;
  website?: string;
  description?: string;
  order: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category: "NEWS" | "ANNOUNCEMENT" | "PRESS_RELEASE" | "UPDATE";
  published: boolean;
  publishedAt?: Date;
  tags: string[];
  authorName?: string;
  authorTitle?: string;
  createdAt: Date;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  address: string;
  phone?: string;
  website?: string;
  bookingUrl?: string;
  imageUrl?: string;
  description?: string;
  featured: boolean;
  rates: HotelRate[];
}

export interface HotelRate {
  id: string;
  roomType: string;
  rateUSD: number;
  ratePer: string;
  includes?: string;
  available: boolean;
}
