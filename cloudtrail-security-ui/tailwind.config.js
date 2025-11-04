/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2196F3',
          dark: '#1976D2',
          light: '#64B5F6',
        },
        navy: {
          DEFAULT: '#0D1B2A',
          light: '#1B263B',
          dark: '#000814',
        },
        neon: {
          green: '#39FF14',
          blue: '#00F0FF',
        },
        purple: {
          DEFAULT: '#9C27B0',
          light: '#BA68C8',
          dark: '#7B1FA2',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#6D28D9',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
