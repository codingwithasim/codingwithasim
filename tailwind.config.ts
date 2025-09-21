/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: ['class'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
          mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
        },
        colors: {
          primary: {
            DEFAULT: '#22C55E',
            dark: '#16A34A',
          },
          secondary: {
            DEFAULT: '#14B8A6',
            dark: '#0D9488',
          },
          accent: {
            DEFAULT: '#8B5CF6',
            dark: '#7C3AED',
          }
        },
        animation: {
          'marquee': 'marquee 40s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          }
        }
      },
    },
    plugins: [
      
    ],
    safelist: [
      'group-hover:text-yellow-400',
      'group-hover:text-blue-600',
      'group-hover:text-sky-400',
      'group-hover:text-gray-200',
      'group-hover:text-green-500',
      'group-hover:text-teal-400',
      'group-hover:text-teal-500',
    ],
  };
  