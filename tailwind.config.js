/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#8ED8F8',
          'blue-dark': '#6BBFE6',
          'blue-darker': '#3F9DCB',
          black: '#080808',
          'gray-900': '#121212',
          'gray-800': '#1C1C1C',
          'gray-700': '#262626',
          'gray-600': '#3A3A3A',
          'gray-500': '#6B6B6B',
          'gray-400': '#9A9A9A',
          'gray-300': '#C4C4C4',
          'gray-200': '#E4E4E4',
          'gray-100': '#F4F4F4',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-3': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'page': '1400px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
