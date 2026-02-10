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
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1'}
        },
        fadeOut: {
          '0%': { opacity: '1'},
          '100%': { opacity: '0'}
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.0s ease-in',
        fadeOut: 'fadeOut 1.5 ease-out'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

