/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
const colors = require('tailwindcss/colors');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors:{
        gray: colors.gray,
      }
    },
  },
  plugins: [forms,require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'),  
  
  require('tailwindcss/nesting')(require('postcss-nesting')),],
}

