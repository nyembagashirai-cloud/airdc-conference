import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A4A2A",
          dark: "#0F3018",
          mid: "#2D6A40",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#C8941C",
          light: "#E8B832",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#C41230",
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        foreground: "#1F2937",
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6B7280",
        },
        border: "#E5E7EB",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        ring: "#2D6A40",
        input: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        premium: "0 4px 24px rgba(26, 74, 42, 0.12)",
        card: "0 2px 12px rgba(26, 74, 42, 0.08)",
        glow: "0 0 40px rgba(200, 148, 28, 0.25)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0F3018 0%, #1A4A2A 50%, #2D6A40 100%)",
        "gold-gradient": "linear-gradient(135deg, #C8941C 0%, #E8B832 100%)",
        "pattern-zimbabwe": "url('/images/zimbabwe-pattern.svg')",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "count-up": "countUp 2s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
