/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      custom: {
        primary: "#003b36",
        cta: "#e98a15",
        bg: "#ece5f0",
        discount: "#eb0a0a",
        attention: "#59114d",
        text: "#012622",
        hbg: "#003b36",
        helement: "#ece5f0"
      }
    },
  },
  plugins: [],
}

