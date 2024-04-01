/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xx: "385px",
        xs: "530px",
      },
    },
  },
  plugins:  [require('tailwindcss'), require('autoprefixer')],
};
