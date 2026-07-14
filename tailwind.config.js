/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#60a5fa',
        },
        secondary: {
          DEFAULT: '#eff6ff',
          dark: '#dbeafe',
        },
        accent: {
          DEFAULT: '#10b981',
          dark: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Thai', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
