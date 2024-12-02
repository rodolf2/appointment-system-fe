/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Tolkien", "serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#252f6a",
        highlight: "#f3bc62",
      },
    },
  },
  plugins: [],
};
