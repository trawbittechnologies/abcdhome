/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#233777',
        'brand-blue-dark': '#1a2959',
        'brand-blue-light': '#3a5299',
        'brand-red': '#EE2A24',
        'brand-red-dark': '#c41f1a',
        'brand-white': '#ffffff',
        'brand-gray-light': '#f0f4ff',
        'brand-gray': '#dde4f5',
        'brand-black': '#0d1117',
      },
      fontFamily: {
        sans: ['Manrope', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(35, 55, 119, 0.10)',
        'glass-lg': '0 16px 48px rgba(35, 55, 119, 0.14)',
        'glass-red': '0 8px 32px rgba(238, 42, 36, 0.15)',
      },
      screens: {
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
