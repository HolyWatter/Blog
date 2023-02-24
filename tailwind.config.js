/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        origin: '#2F436E',
        bg: '#f1f5f9',
        modalbg: 'black/70',
      },
    },
    screens: {
      '2xl-m': { max: '1535px' },
      'xl-m': { max: '1279px' },
      'lg-m': { max: '1023px' },
      'md-m': { max: '699px' },
      'sm-m': { max: '449' },
      sm: '450px',
      md: '700px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}
