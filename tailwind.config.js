/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
    extend: {
      colors: {
        light: "#F0F0F0",
        dark: "#121212",
      },
    },
  },
  plugins: [],
};
