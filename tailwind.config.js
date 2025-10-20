/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000957',
        secondary: "#FF2DD1",
        accent: "#9400FF",
        light: "#E4F1FF"
      }
    },
  },
  plugins: [],
}

