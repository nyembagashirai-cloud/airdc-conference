/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "canvas"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.hyatt.com" },
      { protocol: "https", hostname: "rtgafrica.com" },
      { protocol: "https", hostname: "images.crestahotels.com" },
      { protocol: "https", hostname: "thegray.co.zw" },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "@prisma/client"];
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — only allow same origin to frame the site
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer info sent to other sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + Vercel analytics + Cloudflare Turnstile
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com",
              // Styles: self + inline (needed for Tailwind/Next.js)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + all image CDNs used by hotels/cloudinary
              "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://assets.hyatt.com https://rtgafrica.com https://images.crestahotels.com https://thegray.co.zw",
              // Frames: Cloudflare Turnstile widget
              "frame-src 'self' https://challenges.cloudflare.com",
              // API calls: self + Resend + Cloudflare Turnstile verify
              "connect-src 'self' https://api.resend.com https://challenges.cloudflare.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              // Block all object/embed
              "object-src 'none'",
              // Upgrade insecure requests
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Cross-Origin headers (upcoming standard — good to add now)
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
        ],
      },
    ];
  },
};

export default nextConfig;
