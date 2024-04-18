import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        inter: ["var(--font-inter)"],
      },
      colors: {
        green: "#009D7D",
        orange: "#FC5859",
        black: "#1C1C1C",
        blackAlt: "#070707",
        gray40: "#999999",
        lightGray: "#F3F2F5",
        ultralightGray: "#F8F7FA",
        grayBg: "#F9F9F9",
        darkBlue: "#1F384C",
      },
      boxShadow: {
        "custom-light": "-4px 5px 10px 0px #4A4A4A0D",
      },
      backgroundImage: (theme) => ({
        "gradient-linear":
          "linear-gradient(180.81deg, rgba(217, 217, 217, 0) 24.75%, #009D7D 123.9%)",
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
