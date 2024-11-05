/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      aqua: '#00FFFF',
      'aqua-light': '#66FFFF',
    },},
  },
  plugins: [],
}