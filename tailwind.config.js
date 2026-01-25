/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#3baff7",
        "background-dark": "#0f172a",
        "surface-dark": "#1e293b",
        "border-dark": "#334155",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(59, 175, 247, 0.3)',
      }
    },
  },
  plugins: [],
}
