/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#191825',
        secondary: "#4300FF",
        accent: "#9400FF",
        light: "#E4F1FF"
      }
    },
  },
  plugins: [],
}

