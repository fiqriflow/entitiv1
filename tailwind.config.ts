import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tosca: {
          DEFAULT: "#13B98F",
          dark: "#0D8A6B",
          darker: "#096650",
          light: "#E5F9F3",
        },
        ink: {
          DEFAULT: "#252525",
          soft: "#4A4A4A",
        },
        court: "#FAFAF8",
        accent: "#FF7A3D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "diagonal-tosca":
          "linear-gradient(135deg, #13B98F 0%, #0D8A6B 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
