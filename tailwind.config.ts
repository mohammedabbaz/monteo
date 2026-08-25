import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        line: "var(--line)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-dark)",
          light: "var(--accent-light)",
        },
        navy: {
          DEFAULT: "var(--blue)",
          dark: "var(--blue-dark)",
        },
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
        "card-sm": "var(--radius-card-sm)",
        control: "var(--radius-control)",
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
      fontFamily: {
        sans: ["var(--font-onest)", "Onest", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

