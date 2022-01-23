const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [require('@tailwindcss/line-clamp')],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Lato', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: '#61C7B5',
        secondary: '#3E8CB9',
        secondaryHover: '#539cc5',
        muted: '#6B7588',
      },
    },
  },
}
