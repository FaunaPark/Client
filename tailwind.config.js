/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/**/*.{html,js}",
    "./frontend/src/pages/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'fauna': {
          'green': {
            50: '#f0f9f4',
            100: '#dbf0e3',
            200: '#b9e1c9',
            300: '#8ccaa7',
            400: '#5bab81',
            500: '#3a8a64',
            600: '#2a6e4e',
            700: '#22573f',
            800: '#1d4534',
            900: '#19382b',
          },
          'orange': {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          }
        }
      },
    },
  },
  plugins: [],
}