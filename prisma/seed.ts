import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  await prisma.user.upsert({
    where: { email: "admin@airdc2026.org" },
    update: {},
    create: {
      name: "AIRDC Admin",
      email: "admin@airdc2026.org",
      password: "airdc2026!", // Change in production!
      role: "SUPER_ADMIN",
    },
  });

  // Create conference
  const conference = await prisma.conference.upsert({
    where: { id: "airdc-2026" },
    update: {},
    create: {
      id: "airdc-2026",
      edition: 23,
      title: "23rd AIRDC Annual Conference",
      theme: "Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets",
      tagline: "Building Resilient Insurance Markets for Tomorrow",
      startDate: new Date("2026-09-15"),
      endDate: new Date("2026-09-17"),
      venue: "Harare International Conference Centre",
      city: "Harare",
      country: "Zimbabwe",
      isActive: true,
    },
  });

  // Create hotels
  await prisma.hotel.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Meikles Hotel",
        stars: 5,
        address: "Jason Moyo Avenue, Harare",
        phone: "+263 4 707 721",
        website: "https://www.meikleshotel.com",
        bookingUrl: "https://www.meikleshotel.com",
        featured: true,
        order: 1,
      },
      {
        name: "Rainbow Towers Hotel",
        stars: 4,
        address: "Pennefather Avenue, Harare",
        phone: "+263 4 791 511",
        website: "https://www.rainbowtowershotel.com",
        bookingUrl: "https://www.rainbowtowershotel.com",
        featured: false,
        order: 2,
      },
    ],
  });

  console.log("✅ Seed complete");
}

main().catch(console.error).finally(() => prisma.$disconnect());
