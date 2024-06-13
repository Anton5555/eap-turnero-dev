import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        inter: ["var(--font-inter)"],
        openSans: ["var(--font-open-sans)"],
      },
      colors: {
        green: "#009D7D",
        orange: "#FC5859",
        black: "#1C1C1C",
        "ultra-dark-gray": "#4F4F4F",
        "dark-gray": "#999999",
        "light-gray": "#F3F2F5",
        "ultra-light-gray": "#F8F7FA",
        "light-grayish-blue": "#CBD5E1",
        "gray-bg": "#F9F9F9",
        "very-dark-blue": "#1F384C",
        "red-600": "#E02424",
        "dark-blue": "#64748B",
        yellow: "#FBBF24",
        purple: "#8C67DC",
        blue: "#2563EB",
        pink: "#FF6B81",
      },
      boxShadow: {
        "custom-light": "-4px 5px 10px 0px #4A4A4A0D",
      },
      backgroundImage: (theme) => ({
        "gradient-linear":
          "linear-gradient(180.81deg, rgba(217, 217, 217, 0) 24.75%, #009D7D 123.9%)",
      }),
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
