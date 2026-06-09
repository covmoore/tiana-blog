/** @type {import('tailwindcss').Config} */

const colorClasses = [
  'bookColor',
  'movieColor',
  'musicColor'
];

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
      white: '#fff',
      bookColor: "#f79eed",
      musicColor: '#ad58fc',
      movieColor: '#fa5943',
      rose: '#f64a8a'
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
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.0s ease-in',
        fadeOut: 'fadeOut 1.5s ease-out'
      },
    },
  },
  purge: {
    //content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    // Map over the labels and add them to the safelist
    safelist: [
      ...colorClasses.map((color) => `bg-${color}`),
      ...colorClasses.map((color) => `border-${color}`)
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

