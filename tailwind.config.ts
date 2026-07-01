import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1B3C", light: "#16224A" },
        gold: { DEFAULT: "#D4AF37", light: "#F0C75E" },
        primary: { DEFAULT: "#2F6FED", light: "#EEF3FF", dark: "#1E52C8" },
        purple: { DEFAULT: "#7C6FF0", light: "#F1EEFF" },
        success: { DEFAULT: "#16A34A", light: "#EAFBF0" },
        warning: { DEFAULT: "#F5A524" },
        bg: "#F6F7FB",
        border: "#ECEEF3",
      },
    },
  },
  plugins: [],
};

export default config;
