/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#003b36",
      cta: "#e98a15",
      ctah: "#fa9e2d",
      bg: "#ece5f0",
      bgh: "#dcb0f5",
      discount: "#eb0a0a",
      attention: "#59114d",
      text: "#012622",
      hbg: "#003b36",
      helement: "#ece5f0"
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

