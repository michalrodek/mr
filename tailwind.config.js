const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#edf3fd",
          200: "#e4ecf8",
          300: "#dde7f5",
          400: "#ccd8e8",
          500: "#b1c0d5",
          600: "#668bbf",
          700: "#3469b4",
          800: "#0f3468",
          900: "#041a39",
          950: "#0a2143",
          1000: "#020f21",
        },
        accent: {
          100: "#ffedea",
          200: "#ffc3b9",
          300: "#ffa091",
          400: "#ff7d68",
          500: "#ff583d",
          550: "#e52000",
          600: "#d01d00",
          700: "#a61700",
          800: "#771100",
          900: "#3e0900",
        },
      },
      fontFamily: {
        poppins: "poppins",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
