import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#1F1F1F",
        blue: "#0D71C9",
        lightGray:"#ECF1F5",
        gray:"#D0D7DC",
        borderGray:"#D9DFE4",
        darkBlue:"#276EC4",
        darkGray:"#415763"
      },
      screens: {
        phone: "370px",
        xs: "400px",
        smallerTablet: "834px",
        phoneLarge: "450px",
        phoneS: "505px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        tablet: "1194px",
        xl: "1280px",
        xlSpecial: "1430px",
      },
    },
  },
  plugins: [],
} satisfies Config;
