/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#f8a771',
      secondary: '#ffae23',
      accent: '#fa6429',
      background: '#FEF3E2'
    },
    theme: {
      extend: {
        fontFamily: {
          tangerine: ['Tangerine', 'serif'],
          nunito: ['Nunito', 'sans-serif'],
          caveat: ['Caveat']
        },

      }
    },
    extend: {},
  },
  plugins: [],
}

