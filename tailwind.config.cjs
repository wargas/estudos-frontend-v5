const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: defaultTheme.screens.sm,
        tablet: defaultTheme.screens.md,
        laptop: defaultTheme.screens.xl,
        desktop: defaultTheme.screens["2xl"],
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ["0.65rem", { lineHeight: "0.75rem" }],
        sm: ["0.75rem", { lineHeight: "1rem" }],
        base: ["0.875rem", { lineHeight: "1.25rem" }],
        lg: ["1rem", { lineHeight: "1.5rem" }],
        xl: ["1.125rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "3xl": ["1.5rem", { lineHeight: "2rem" }],
        "4xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "5xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "6xl": ["3rem", { lineHeight: "1" }],
        "7xl": ["3.75rem", { lineHeight: "1" }],
        "8xl": ["4.5rem", { lineHeight: "1" }],
        "9xl": ["6rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
