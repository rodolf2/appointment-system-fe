/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        regular: ["Regular"],
        LatoRegular: ["Lato-Regular"],
        LatoBold: ["Lato-Bold"],
        LatoSemiBold: ["Lato-Semibold, sans-serif"],
        LatoItalic: ["Lato-Italic"],
      },

      colors: {
        Fwhite: "#FEFEFE",
        Bbackground: "#EEF2F7",
        LBackground: "#152F6A",
        OBackground: "#0D1858",
        Footer: "#F3F3F3",
        Gold: "#F3BC62",
      },
      backgroundImage: {
        "custom-gradient_howtoappoint":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.20) 58%, rgba(243, 188, 98, 0.30) 92%)",
        "custom-gradient_about":
          "linear-gradient(180deg, rgba(22, 31, 85, 0.20) 50%, rgba(243, 188, 98, 0.30) 50%)",
        "custom-gradient_announcement":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.30) 58%, rgba(243, 188, 98, 0.50) 92%)",
        "custom-gradient_guidelines":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.40) 76%, rgba(243, 188, 98, 0.50) 100%)",
      },
    },
  },
  plugins: [],
};
