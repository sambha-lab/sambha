// tailwind.config.ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ONLY EXTENDING - no modifications to existing colors
      // Your existing colors remain UNTOUCHED below
      colors: {
        // PRESERVING all original color definitions exactly as they were
        primary: {
          light: "#FFFFFF",
          main: "#2B2BCF",
          darkPurple: "#2A1D52",
          violet: "#C96FFF",
          dark: "#2A1D52",
        },
        blue: {
          400: "#162844",
        },
        gray: {
          base: "#6B7280",
          light: "#F3F4F6",
          dark: "#667185",
          200: "#E4E7EC",
        },
        error: {
          base: "#DC2626",
          dark: "#940803",
        },
        grey: {
          base: "#98A2B3",
        },
        dark: {
          base: "#090A0A",
        },
        neutral: {
          base: "#070D17",
          700: "#F0F2F5",
          100: "#EBECEE",
          300: "#F2F2F2",
          600: "#F9F9F9",
          violet: "#C96FFF",
          black: "#000000",
          deepBlue: "#2B2BCF",
        },
        white: {
          base: "#F3F4F6",
          80: "#F9F9F9",
          90: "#EBECEE",
        },
        green: {
          base: "#30D158",
          900: "#0F2501",
        },
        purple: {
          base: "#6E48E3",
          10: "#6E48E312",
        },
        sidebar: "#2A1D52",

        red: {
          base: "#DD524D",
          10: "#FBEAE9",
        },
      },
      fontFamily: {
        fractul: ["Fractul", "sans-serif"],
      },
      screens: {
        mdlg: { raw: "(max-width: 1026px)" },
      },

      animation: {
        fadeIn: "fadeIn 150ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        dropdown: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      borderImage: {
        "gradient-primary": "linear-gradient(to right, #C96FFF, #2B2BCF)",
      },
    },
  },
  plugins: [],
};

export default config;
