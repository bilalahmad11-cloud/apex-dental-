import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061325",
          900: "#0a1f38",
          850: "#0f2847",
          800: "#14335a",
          700: "#1e477a",
          600: "#275b9b",
          100: "#e8eff7",
          50: "#f3f7fb",
        },
        dental: {
          teal: "#0d9488",
          "teal-dark": "#0f766e",
          "teal-light": "#14b8a6",
          "teal-subtle": "#f0fdfa",
          blue: "#0284c7",
          "blue-dark": "#0369a1",
          "blue-soft": "#e0f2fe",
          "blue-ice": "#f0f9ff",
          slate: "#334155",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(10, 31, 56, 0.04)",
        card: "0 10px 30px -5px rgba(10, 31, 56, 0.06)",
        "card-hover": "0 20px 40px -10px rgba(10, 31, 56, 0.12)",
        glow: "0 0 25px rgba(13, 148, 136, 0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
