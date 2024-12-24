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
        "custom-gradient_howtoappoint":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.20) 58%, rgba(243, 188, 98, 0.30) 92%)",
        "custom-gradient_about":
          "linear-gradient(180deg, rgba(22, 31, 85, 0.20) 50%, rgba(243, 188, 98, 0.30) 100%)",
        "custom-gradient_home":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.30) 58%, rgba(243, 188, 98, 0.50) 92%)",
      },
    },
  },
  plugins: [],
};
