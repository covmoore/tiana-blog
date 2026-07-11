/** @type {import('tailwindcss').Config} */

const colorClasses = [
  'categoryColor1',
  'categoryColor2',
  'categoryColor3',
  'categoryColor4',
  'categoryColor5',
  'categoryColor6',
  'categoryColor7'
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
      blogPreviewOrange: '#fdab64',
      //postHoverColor: '#FFA970',
      buttonHoverColor: '#ffae23',
      buttonSelectedColor: '#ffae23',
      postBorderColor: '#fa6429',
      background: '#ffedfd',
      white: '#fff',
      categoryColor1: '#f79eed',
      categoryColor2: '#fa5943',
      categoryColor3: '#fa5943',
      categoryColor4: '#58c4fc',
      categoryColor5: '#fcd858',
      categoryColor6: '#58fcb8',
      categoryColor7: '#c458fc',
      rose: '#f64a8a',
      draftGray: '#4b5563',
      draftGrayHover: '#374151',
      progressBannerPink: '#ff5fa2',
      progressBannerPinkHover: '#e84f8f',
      linkBlue: '#0000ee'
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
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.5)',
      },
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

