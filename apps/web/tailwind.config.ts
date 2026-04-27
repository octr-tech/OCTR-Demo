import type { Config } from "tailwindcss";

/** Mirrors tokens in `src/app/globals.css` (:root + @theme) so utilities work under Tailwind v3. */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0f0d",
        surface: {
          DEFAULT: "#111b16",
          hover: "#1a2b22",
        },
        primary: {
          DEFAULT: "#2d6a4f",
          strong: "#1b4332",
          bright: "#52b788",
          soft: "#40916c",
        },
        foreground: {
          DEFAULT: "#e8f5e9",
          muted: "#a7c4b5",
          faint: "#6f8578",
        },
        danger: "#e57373",
        warning: "#f6c344",
        info: "#6cb2ff",
      },
    },
  },
  plugins: [],
};

export default config;
