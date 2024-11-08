import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": "var(--font-poppins), sans-serif",
        "ebGaramond": "var(--font-ebGaramond), sans-serif",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      spacing: {
        "tb-26": "1.625rem",
        "tb-14": "0.875rem",
      },
      colors: {
        gray: {
          "1": "#FCF9F6",
          "2": "#F5F1ED",
          "3": "#E3E0DE",
          "4": "#979188",
          "5": "#796E65",
        },
        green: {
          "1": "#E2E8DF",
          "2": "#669156",
          "3": "#484804",
        },
        toast: {
          error: "#B3261E",
          yellow: "#FF9800",
          blue: "#134775",
        },
        brown: {
          "1": "#43372D"
        }
      },
    },
  },
  plugins: [],
};
export default config;
