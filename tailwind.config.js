/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: {
              color: theme('colors.gray.900'),
            },
            h2: {
              color: theme('colors.gray.900'),
            },
            h3: {
              color: theme('colors.gray.900'),
            },
            h4: {
              color: theme('colors.gray.900'),
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.800'),
              },
            },
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 