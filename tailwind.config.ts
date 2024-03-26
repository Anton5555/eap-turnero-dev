import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        green: '#009D7D',
        orange: '#FC5859',
        cream: '#FEF7F7',
        black: '#1C1C1C',
        grey40: '#999999',
        grey20: '#00000033',
        grey10: '#0000001A',
        grey5: '#F2F2F2',
        white40: '#FFFFFF66',
        white20: '#FFFFFF33',
        white10: '#FFFFFF1A',
        white5: '#FFFFFF0D'
      }
    },
  },
  plugins: [],
} satisfies Config;
