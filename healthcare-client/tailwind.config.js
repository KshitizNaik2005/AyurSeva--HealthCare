/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.8s ease-out both',
        'slide-in-left': 'slideInLeft 0.8s ease-out both',
        'pulseGlow': 'pulseGlow 2s infinite',
        'fade-in': 'fadeIn 1s ease-out both',
         // ✅ Fade-in animation
         //'fade-in': 'fadeIn 0.8s ease-in-out forwards',

      },
      keyframes: {
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0px rgba(34,197,94, 0.4)',
          },
          '50%': {
            opacity: '0.7',
            boxShadow: '0 0 12px rgba(34,197,94, 0.6)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
