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
          50: "#f0f7f4",
          100: "#d9ebe3",
          200: "#b6d7c9",
          300: "#87bca6",
          400: "#5a9d82",
          500: "#3d8268",
          600: "#2e6853",
          700: "#275444",
          800: "#224438",
          900: "#1e3a31",
        },
      },
    },
  },
  plugins: [],
};
export default config;
