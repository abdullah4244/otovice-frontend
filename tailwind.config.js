/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E74BC",
        secondary: "#59595B",
        text: "#101733",
        grey: "#828282",
        cardBackground: "#F7F8FA",
        tagBackground: "#DAE8FF",
      },
      fontFamily: {
        on: ["Onest", "sans-serif"],
      },
      height: {
        'screen-minus-74': 'calc(100vh - 74px)',
      },
    },
  },
  plugins: [],
};
