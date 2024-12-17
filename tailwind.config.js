/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tolkien: ["Tolkien", "serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#252f6a",
        highlight: "#f3bc62",
        arrow: "#C9C9C9",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.54) 58%, rgba(243, 188, 98, 0.50) 92%)",
      },
    },
  },
  plugins: [],
};
