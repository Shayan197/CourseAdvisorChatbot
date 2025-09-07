/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customBlue: '#077EFF',
        customGray: '#1D1F22'
      }
    },
  },
  plugins: [],
}
