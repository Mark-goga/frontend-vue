/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{vue,js,jsx,ts,tsx}',
    './components/**/*.{vue,js,jsx,ts,tsx}',
    './App.vue',
    './screens/**/*.{vue,js,jsx,ts,tsx}',
    './src/**/*.{vue,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
        modalOpen: {
          '0%': { opacity: 0, marginTop: '-5px' },
          '100%': { opacity: 1, marginTop: '0' },
        },
        modalClose: {
          '0%': { opacity: 1, marginTop: '0' },
          '100%': { opacity: 0, marginTop: '-5px' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        fadeOut: 'fadeOut 0.3s ease-out',
        modalOpen: 'modalOpen 0.1s ease-out',
        modalClose: 'modalClose 0.1s ease-out',
      },
      shadows: {
        headerMenu: '#1F1F28',
        card: '0 4px 6px rgba(0, 0, 0, 0.3)',
        button: '0 3px 6px rgba(100, 41, 163, 0.4)',
        purple: '0 3px 6px rgba(100, 41, 163, 0.5)',
        accent: '0 3px 6px rgba(114, 201, 133, 0.4)',
      },
      colors: {
        accent: {
          50: '#E8F7EC',
          100: '#D2EFD9',
          200: '#A4DEB4',
          300: '#77CD8E',
          400: '#59C277',
          500: '#3CB760',
          600: '#329C51',
          700: '#298243',
          800: '#206834',
          900: '#174D26',
          950: '#0E331A',
        },
        primary: {
          50: '#F5EAFF',
          100: '#EBDAFF',
          200: '#D7B5FF',
          300: '#C390FF',
          400: '#AF6BFF',
          600: '#8429F0',
          700: '#6D12D9',
          800: '#5A00B3',
          900: '#46008C',
          950: '#33006F',
        },
        background: {
          DEFAULT: '#0D0D15',
          light: '#14141F',
          medium: '#0F0F1A',
          dark: '#090912',
          card: '#12121C',
          elevated: '#1A1A26',
        },
        text: {
          DEFAULT: '#F5F5FF',
          muted: '#B3B3CC',
          bright: '#FFFFFF',
          dark: '#6E6E89',
        },
        secondary: {
          50: '#E8F7EC',
          100: '#D2EFD9',
          200: '#A4DEB4',
          300: '#77CD8E',
          400: '#59C277',
          600: '#329C51',
          700: '#298243',
          800: '#206834',
          900: '#174D26',
          950: '#0E331A',
        },
        status: {
          warning: '#FFB800',
          error: '#FF4D6A',
        },
        scrollbar: '#1A1A26',
        scrollbarHover: '#27273D',
        border: {
          DEFAULT: '#1E1E2E',
          light: '#27273D',
        },
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};
