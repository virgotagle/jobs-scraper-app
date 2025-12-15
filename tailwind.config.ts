import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Tokens
        primary: {
          DEFAULT: "#db2777", // pink-600
          foreground: "#ffffff",
          50: "#fdf2f8", // pink-50
          100: "#fce7f3", // pink-100
          200: "#fbcfe8", // pink-200
          600: "#db2777", // pink-600
          700: "#be185d", // pink-700
          800: "#9f1239", // pink-800
        },
        secondary: {
          DEFAULT: "#475569", // slate-500
          foreground: "#ffffff",
        },
        background: {
          DEFAULT: "#f5f7fa", // slate-50
          paper: "#ffffff",
        },
        surface: {
          DEFAULT: "#ffffff"
        },
        error: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#10b981", // emerald-500
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b", // amber-500
          foreground: "#ffffff",
        },
        info: {
          DEFAULT: "#3b82f6", // blue-500
          foreground: "#ffffff",
        },

        // Keep existing slate as neutral palette
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      spacing: {
        // Extend default spacing if needed, e.g. layout containers
        "128": "32rem",
        "144": "36rem",
      },
    },
  },
  plugins: [],
};

export default config;
