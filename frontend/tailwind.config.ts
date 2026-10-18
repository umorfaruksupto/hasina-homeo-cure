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
        primary: {
          DEFAULT: "#047857",
          hover: "#065f46",
          dark: "#022c22",
          light: "#ecfdf5",
        },
        wa: {
          DEFAULT: "#25d366",
          hover: "#20ba5a",
        },
        apple: {
          bg: "#f5f5f7",
          surface: "#ffffff",
          text: "#1d1d1f",
          secondary: "#6e6e73",
          border: "rgba(0, 0, 0, 0.08)",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "var(--font-hind)",
          "Inter",
          "sans-serif"
        ],
      },
    },
  },
  plugins: [],
};
export default config;
