/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          50: '#f5f0f0',
          100: '#e8d8d8',
          200: '#ccb0b0',
          300: '#aa8888',
          400: '#886060',
          500: '#603c3c',
          600: '#402828',
          700: '#2e1a1a',
          800: '#1e0f0f',
          900: '#0f0707',
          950: '#080303',
        },
        cyber: {
          blue: '#00d4ff',
          purple: '#b060ff',
          pink: '#ff0080',
          red: '#ff0040',
          green: '#00ff94',
        },
        accent: {
          DEFAULT: '#ff0080',
          dim: 'rgba(255,0,128,0.12)',
          glow: 'rgba(255,0,128,0.35)',
        },
      },
      fontFamily: {
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'ribbon-ltr': 'ribbon-ltr 40s linear infinite',
        'ribbon-rtl': 'ribbon-rtl 45s linear infinite',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.7s ease forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'ribbon-ltr': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ribbon-rtl': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
