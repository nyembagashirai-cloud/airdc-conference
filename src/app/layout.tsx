import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "24th AIRDC Conference 2026 | Zimbabwe",
    template: "%s | 24th AIRDC Conference 2026",
  },
  description:
    "The 24th Annual Conference of the Association of Insurers and Reinsurers of Developing Countries. Theme: Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions. Harare, Zimbabwe — 27–30 September 2026.",
  keywords: [
    "AIRDC",
    "insurance conference",
    "Zimbabwe",
    "reinsurance",
    "developing markets",
    "Harare 2026",
    "insurance resilience",
  ],
  authors: [{ name: "AIRDC" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.airdczim.co.zw",
    siteName: "24th AIRDC Conference 2026",
    title: "24th AIRDC Conference 2026 | Zimbabwe",
    description:
      "Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "24th AIRDC Conference 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24th AIRDC Conference 2026 | Zimbabwe",
    description: "Strengthening Insurance Resilience for Developing Countries — Harare, Zimbabwe",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
