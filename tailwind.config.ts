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
        sans: ["Figtree", "sans-serif"],
        display: ["Figtree", "sans-serif"],
        mono: ["SF Mono", "Menlo", "monospace"],
      },
      colors: {
        bg: "#f5f4f0",
        dark: "#1a1a1a",
        accent: "#e03c1e",
        blue: "#2563eb",
        gray: "#999999",
        muted: "#ebebeb",
        border: "#e2e0db",
        card: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
