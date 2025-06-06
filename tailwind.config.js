/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
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
          950: '#172554',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
            fontSize: '1rem',
            '[class~="lead"]': {
              fontSize: '1.25em',
              lineHeight: '1.6',
              marginTop: '1.2em',
              marginBottom: '1.2em',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
              },
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            'h1, h2, h3, h4': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h1: {
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
            },
            h2: {
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
            },
            h3: {
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
            },
            h4: {
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-code-bg)',
              borderRadius: '0.375rem',
              paddingLeft: '0.25em',
              paddingRight: '0.25em',
              paddingTop: '0.125em',
              paddingBottom: '0.125em',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              color: 'var(--tw-prose-pre-code)',
              borderRadius: '0.5rem',
              padding: '1em',
              overflow: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              padding: '0',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': 'var(--tw-prose-invert-body)',
            '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
            '--tw-prose-links': 'var(--tw-prose-invert-links)',
            '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
            '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
            '--tw-prose-code': 'var(--tw-prose-invert-code)',
            '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
            '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
            '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
          },
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        '8xl': '96rem',
        '9xl': '128rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 