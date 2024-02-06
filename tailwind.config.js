/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        nanumgothic: ['nanumgothic'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
