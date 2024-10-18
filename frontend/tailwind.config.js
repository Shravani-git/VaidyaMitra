/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#383C93",
        yellowColor: "#FE8502",
        purpleColor: "#E344FF",
        irisBlueColor: "#89CDCE",
        headingColor: "#030504",
        textColor: "#636468",
      },
    },
  },
  plugins: [],
}
