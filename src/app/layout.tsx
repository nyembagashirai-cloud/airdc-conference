import type { Metadata } from "next";
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
    default: "23rd AIRDC Conference 2026 | Zimbabwe",
    template: "%s | 23rd AIRDC Conference 2026",
  },
  description:
    "The 23rd Annual Conference of the Association of Insurers and Reinsurers of Developing Countries. Theme: Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets. Harare, Zimbabwe — September 2026.",
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
    url: "https://airdc2026.org",
    siteName: "23rd AIRDC Conference 2026",
    title: "23rd AIRDC Conference 2026 | Zimbabwe",
    description:
      "Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "23rd AIRDC Conference 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "23rd AIRDC Conference 2026 | Zimbabwe",
    description: "Insurance Resilience in Developing Markets — Harare, Zimbabwe",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      </body>
    </html>
  );
}
