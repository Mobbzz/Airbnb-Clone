/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Aktiverar mörkt läge med en CSS-klass
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Håller koll på alla komponentfiler i src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};