/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ef',
          100: '#e6efdd',
          200: '#cddfbc',
          300: '#afce96',
          400: '#8fb96b',
          500: '#689D4B',
          600: '#557f3e',
          700: '#436433',
          800: '#384f2d',
          900: '#304429'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(25, 40, 20, .06)'
      }
    }
  },
  plugins: [],
}