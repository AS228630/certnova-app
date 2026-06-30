import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1B3C", light: "#16224A" },
        gold: { DEFAULT: "#D4AF37", light: "#F0C75E" },
      },
    },
  },
  plugins: [],
};

export default config;
