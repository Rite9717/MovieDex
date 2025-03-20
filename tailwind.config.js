/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],  // Added jsx extension for React files
  darkMode: 'class',  // This is the missing setting
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
}