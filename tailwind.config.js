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
        primary: {
          50: '#dffbf7',
          100: '#c0ede5',
          200: '#9ddfd3',
          300: '#79d0c1',
          400: '#56c3b0',
          500: '#3ca996',
          600: '#2c8475',
          700: '#1b5f53',
          800: '#093932',
          900: '#001611',
        },
        secondary: {
          50: '#e1f6ff',
          100: '#c0dff1',
          200: '#9dc8e1',
          300: '#77b2d3',
          400: '#539cc5',
          500: '#3a82ac',
          600: '#2a6587',
          700: '#1b4861',
          800: '#092c3d',
          900: '#00101a',
        },
        secondaryHover: '#539cc5',
        muted: '#6B7588',
      },
    },
  },
}
