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
      postForegroundColor: '#fc963d',
      //postHoverColor: '#FFA970',
      buttonHoverColor: '#ffae23',
      buttonSelectedColor: '#ffae23',
      postBorderColor: '#fa6429',
      background: '#ffedfd',
      white: '#fff'
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

