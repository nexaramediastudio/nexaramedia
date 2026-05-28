import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        sans: ["Instrument Sans", "sans-serif"],
      },
      colors: {
        gold: "#C9A96E",
        "gold-soft": "#B8965A",
        "bg-primary": "#080808",
        "bg-secondary": "#0F0F0F",
        "bg-card": "#141414",
        "bg-card-hover": "#1A1A1A",
        "text-primary": "#F0EDE6",
        "text-secondary": "#9A9590",
        "text-muted": "#5A5652",
        emerald: "#0F3D2E",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
