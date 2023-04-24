/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#CDA274',
        secondary: '#292F36',
        light: '#F4F0EC',
      },
      fontFamily: {
        body: ['Jost', 'sans-serif'],
        headers: ['DM Serif Display', 'serif'],
      },
    },
  },
  plugins: [],
};
