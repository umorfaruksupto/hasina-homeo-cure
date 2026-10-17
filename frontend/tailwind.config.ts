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
          DEFAULT: "#0d7a57",
          hover: "#085a40",
          dark: "#053b2a",
          light: "#e8f7f0",
        },
        wa: {
          DEFAULT: "#25d366",
          hover: "#1ebc57",
        }
      },
      fontFamily: {
        sans: ["var(--font-hind)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
