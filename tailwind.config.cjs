/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        Lobster: ["Lobster", "cursive"],
        Times: ["Playfair Display", "serif"],
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
};

//https://fontsource.org/fonts/lobster
