const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
