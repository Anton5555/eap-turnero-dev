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
        green: '#009D7D',
        orange: '#FC5859',
        cream: '#FEF7F7',
        black: '#1C1C1C',
        blackAlt: '#070707',
        gray40: '#999999',
        gray20: '#00000033',
        gray10: '#0000001A',
        gray5: '#F2F2F2',
        grayBg: '#F9F9F9',
        white40: '#FFFFFF66',
        white20: '#FFFFFF33',
        white10: '#FFFFFF1A',
        white5: '#FFFFFF0D',
        green10: '#7CA8831A'
      },
      backgroundImage: theme => ({
        'gradient-linear': 'linear-gradient(180.81deg, rgba(217, 217, 217, 0) 24.75%, #009D7D 123.9%)',
      }),
    },
  },
  plugins: [ 
    require('@tailwindcss/forms'),  
  ],
} satisfies Config;
