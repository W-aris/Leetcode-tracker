/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'MyFont': ['"My Font"', 'serif']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
