/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#5c7f2f', // Natural leaf green
            deep: '#385629', // Deep green
            light: '#eef3e8', // Light soft green
          },
          brown: {
            DEFAULT: '#8b5a2b', // Soil brown
            warm: '#cd8a1d', // Warm earthy amber/brown
            soft: '#dfc29a', // Soft clay/sand brown
          },
          beige: {
            DEFAULT: '#f6edd8', // Warm earthy beige
            deep: '#e8dcb7', // Deep warm beige
            cream: '#fcfaf2', // Off-white/Light natural cream
            panel: '#fffbf2', // Light cream panel background
          },
          text: {
            DEFAULT: '#1f2f1b', // Dark green-black soil text
            muted: '#5a6852', // Muted olive-green-grey text
          },
          accent: {
            sunlight: '#f5c84c', // Soft yellow sunlight tone
            soft: 'rgba(205, 138, 29, 0.14)',
          }
        }
      },
      fontFamily: {
        sans: ['Trebuchet MS', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '30px',
        '2xl': '22px',
      },
      boxShadow: {
        'premium': '0 28px 70px rgba(47, 75, 37, 0.14)',
        'premium-hover': '0 32px 80px rgba(47, 75, 37, 0.20)',
      }
    },
  },
  plugins: [],
}
