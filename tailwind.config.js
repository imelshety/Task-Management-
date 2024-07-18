/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'primary': {
        '50': '#eeeffa', //default
        '100': '#e7e8f8',
        '200': '#d4d6f1',
        '300': '#b9bae8',
        '400': '#a09cdd',
        '500': '#8d83d1',
        '600': '#7c6ac1',
        '700': '#6b59a9',
        '800': '#584a89',
        '900': '#4a416e',
        '950': '#2c2640',
    },
    'secondary': {
        '50': '#f1f5fd',
        '100': '#e0e9f9',
        '200': '#c8d8f5',
        '300': '#a2c0ee',
        '400': '#769ee4',
        '500': '#567ddb',
        '600': '#3e5fce', //default
        '700': '#3850bd',
        '800': '#33429a',
        '900': '#2d3a7b',
        '950': '#20264b',
    },
    
  }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

