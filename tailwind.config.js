/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e9f02e',
        secondary: '#161616',
        tetiary: '#b0e0e6',
        red: '#ff3b3b',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #ccc, #ededed00)',
      },
      backgroundColor: {
        primary: '#e9f02e',
        secondary: '#9da093',
        danger: '#c34242',
      },
      fontFamily:{
        'nunito': ['Nunito']
      }
    },
  },
  plugins: [],
}
