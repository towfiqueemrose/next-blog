import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg:"#1d2532",
        lightBg:"#f7f1e9",
        exDark: "#111828",
        exLight: "#fce7c7",
        logo: "#f5ab35",
        logoLight:"#f5c882"

      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
