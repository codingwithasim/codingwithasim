/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',     // App Router
      './pages/**/*.{js,ts,jsx,tsx}',   // Pages Router
      './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
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
  