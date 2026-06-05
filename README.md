# 23rd AIRDC Conference 2026 — Official Website

**Association of Insurers and Reinsurers of Developing Countries**  
**Theme:** Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets  
**Location:** Harare, Zimbabwe | **Date:** September 2026

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth v5 |
| Storage | Cloudinary |
| Forms | React Hook Form + Zod |
| Hosting | Vercel |

---

## Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your values

# 3. Set up database
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# 4. Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Home
│   │   ├── about/         # About the conference
│   │   ├── programme/     # Conference programme
│   │   ├── speakers/      # Speaker profiles
│   │   ├── sponsors/      # Sponsors & packages
│   │   ├── gallery/       # Photo gallery
│   │   ├── news/          # News & updates
│   │   ├── contact/       # Contact form
│   │   └── register/      # Delegate registration
│   ├── admin/             # Admin dashboard (protected)
│   │   ├── page.tsx       # Dashboard overview
│   │   ├── speakers/      # Speaker management
│   │   ├── sponsors/      # Sponsor management
│   │   ├── news/          # Article management
│   │   ├── gallery/       # Gallery management
│   │   ├── registrations/ # Registrations
│   │   └── contacts/      # Contact messages
│   └── api/               # API routes
│       ├── contact/       # Contact form endpoint
│       ├── register/      # Registration endpoint
│       ├── track/         # Analytics tracking
│       └── auth/          # NextAuth
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Page sections
│   └── admin/             # Admin UI components
├── lib/
│   ├── prisma.ts          # DB client
│   └── utils.ts           # Utilities
└── types/                 # TypeScript types
```

---

## Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` — Neon/Supabase PostgreSQL connection string
   - `NEXTAUTH_SECRET` — Random 32-char string
   - `NEXTAUTH_URL` — Your production domain
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
4. Run `prisma db push` against production DB
5. Seed production DB: `npx tsx prisma/seed.ts`

**Recommended hosting stack:**
- Database: Neon.tech (free tier available) or Supabase
- File storage: Cloudinary (free tier: 25GB)
- Hosting: Vercel (free tier available)
- Domain: Register `airdc2026.org` via Namecheap/GoDaddy

---

## Admin Access

Default admin credentials (change immediately!):
- Email: `admin@airdc2026.org`
- Password: `airdc2026!`

---

## Key Pages

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about` |
| Programme | `/programme` |
| Speakers | `/speakers` |
| Sponsors | `/sponsors` |
| Gallery | `/gallery` |
| News | `/news` |
| Contact | `/contact` |
| Register | `/register` |
| Admin | `/admin` |

---

## Colour Palette

| Colour | Hex | Usage |
|--------|-----|-------|
| Primary Dark | `#0D3B66` | Main brand, headers |
| Primary Mid | `#1D4E89` | Buttons, accents |
| Gold | `#D4AF37` | Highlights, CTAs |
| Gold Light | `#F4C542` | Hover states |
| Teal Accent | `#2A9D8F` | Secondary accents |

---

## Content Management

All content can be managed via the Admin Dashboard at `/admin`. 
For bulk updates, use the Prisma Studio: `npm run db:studio`

---

*Built for AIRDC by [Your Agency Name]. Contact: dev@yoursite.com*
