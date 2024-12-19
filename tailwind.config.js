/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e9f02e',
        secondary: '#161616',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #ccc, #ededed00)',
      },
      backgroundColor: {
        primary: '#e9f02e',
        secondary: '#9da093',
      },
      fontFamily:{
        'nunito': ['Nunito']
      }
    },
  },
  plugins: [],
}
