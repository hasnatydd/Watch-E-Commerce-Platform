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
        charcoal: {
          DEFAULT: "#17191B",
          50: "#363A3F",
          100: "#2C3034",
          200: "#222426",
          surface: "#222426",
          dark: "#121415",
          deep: "#0B0C0D",
        },
        ivory: {
          DEFAULT: "#F5F0E7",
          50: "#FFFFFF",
          100: "#FAF8F5",
          200: "#F5F0E7",
          300: "#EAE2D3",
          400: "#DDD5C8",
          border: "#DDD5C8",
        },
        gold: {
          DEFAULT: "#B89A5E",
          light: "#D4B87C",
          dark: "#967A42",
          champagne: "#B89A5E",
          hover: "#A3864A",
          muted: "rgba(184, 154, 94, 0.15)",
        },
        rose: {
          muted: "#BD929A",
          soft: "#D2ACB3",
          dark: "#A3767F",
        },
        primaryText: "#292825",
        secondaryText: "#77736C",
        lightBorder: "#DDD5C8",
        darkSurface: "#222426",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
        "ultra-wide": "0.3em",
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        "gold-glow": "0 0 25px rgba(184, 154, 94, 0.25)",
        "card-soft": "0 4px 20px rgba(23, 25, 27, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
