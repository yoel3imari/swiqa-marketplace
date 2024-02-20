/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./apps/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FDB339ff",
        secondary: "#8D44D4ff",
        accent: "#c3b4cd",
        neutral: "#C697DBff",
        onPrimary: "#000000",
        onSecondary: "#fcfcfc",
        gray: "#d4d3d2",
      },
    },
  },
  plugins: [],
};
