/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [forms,require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'),],
}

