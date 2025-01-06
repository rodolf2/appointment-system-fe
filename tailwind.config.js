/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "custom-gradient_howtoappoint":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.20) 58%, rgba(243, 188, 98, 0.30) 92%)",
        "custom-gradient_about":
          "linear-gradient(180deg, rgba(22, 31, 85, 0.20) 50%, rgba(243, 188, 98, 0.30) 100%)",
        "custom-gradient_announcement":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.30) 58%, rgba(243, 188, 98, 0.50) 92%)",
        "custom-gradient_guidelines":
          "linear-gradient(180deg, rgba(37, 47, 106, 0.40) 76%, rgba(243, 188, 98, 0.50) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
