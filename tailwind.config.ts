//Puedes customizar TODO antes del preprocesamiento del CSS final, spacing, font-family, typografia etc
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'dynamic-w-mobile': 'clamp(375px - 2rem, 85%, 375px + 25% )',
      },

      minWidth: {
        half: '50%',
        '8': '4rem',
        '1/5': '20%',
        '375': '375px',
      },

      fontFamily: {
        ubuntu: ['var(--font-ubuntu)'],
        'hanken-grotesk': ['var(--font-hanken-grotesk)'],
        poppins: ['var(--font-poppins)'],
      },

      fontSize: {
        '5.5': [
          '3.5rem',
          {
            lineHeight: '4rem',
            letterSpacing: '-0.15rem',
          },
        ],
      },

      colors: {
        'light-red': {
          DEFAULT: 'hsl(0, 100%, 67%)',
          transparent: 'hsla(0, 100%, 67%, .075)',
        },
        'orangey-yellow': {
          DEFAULT: 'hsl(39, 100%, 56%)',
          transparent: 'hsla(39, 100%, 56%, .075)',
        },
        'green-teal': {
          DEFAULT: 'hsl(166, 100%, 37%)',
          transparent: 'hsla(166, 100%, 37%, .075)',
        },
        'cobalt-blue': {
          DEFAULT: 'hsl(234, 85%, 45%)',
          transparent: 'hsla(234, 85%, 45%, .075)',
        },
        'light-slate-blue': 'hsl(252, 100%, 67%)',
        'light-royal-blue': 'hsl(241, 81%, 54%)',
        'violet-blue': 'hsla(256, 72%, 46%, 1)',
        'persian-blue': 'hsla(241, 72%, 46%, 0)',
        'dark-gray-blue': 'hsl(224, 30%, 27%)',

        // age-calcultaor
        purple: 'hsl(259, 100%, 65%)',
        'deep-gray-purple': '#543c89',
        'light-red': 'hsl(0, 100%, 67%)',

        'off-white': 'hsl(0, 0%, 94%)',
        'light-grey': 'hsl(0, 0%, 86%)',
        'smokey-grey': 'hsl(0, 1%, 44%)',
        'off-lack': 'hsl(0, 0%, 8%)',
        'shadow-black': 'rgba(0, 0, 0, 0.25)',

        // multi-step-form
        'marine-blue': 'hsl(213, 96%, 18%)',
        'dark-blue': 'rgb(23,73,141)',
        'purplish-blue': 'hsl(243, 100%, 62%)',
        'pastel-blue': 'hsl(228, 100%, 84%)',
        'light-blue': 'hsl(206, 94%, 87%)',
        'strawberry-red': 'hsl(354, 84%, 57%)',

        'cool-gray': 'hsl(231, 11%, 63%)',
        'light-gray': 'hsl(229, 24%, 87%)',
        magnolia: 'hsl(217, 100%, 97%)',
        alabaster: 'hsl(231, 100%, 99%)',
      },

      borderRadius: {
        inherit: 'inherit',
      },

      screens: {
        xsm: { min: '320px', max: '640px' },
        sm: '640px',
        'sm-lg': { min: '320px', max: '1024px' },
        lg: '1024px',
      },
    },

    backgroundImage: {
      'multiStep-bg-desktop': "url('/bg-sidebar-desktop.svg')",
      'multiStep-bg-mobile': "url('/bg-sidebar-mobile.svg')",
    },
  },
  plugins: [],
};
