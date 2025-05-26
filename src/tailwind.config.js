/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        // Global brand colors
        brand: {
          dark: '#0F172A',
          light: '#F8FAFC',
          gray: '#64748B'
        },
        // Persona-specific color schemes
        architect: {
          primary: '#0EA5E9',
          secondary: '#06B6D4',
          accent: '#67E8F9'
        },
        roxy: {
          primary: '#EC4899',
          secondary: '#F97316',
          accent: '#FBBF24'
        },
        sage: {
          primary: '#10B981',
          secondary: '#059669',
          accent: '#34D399'
        },
        rebel: {
          primary: '#EF4444',
          secondary: '#DC2626',
          accent: '#F87171'
        },
        mystic: {
          primary: '#8B5CF6',
          secondary: '#7C3AED',
          accent: '#A78BFA'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
