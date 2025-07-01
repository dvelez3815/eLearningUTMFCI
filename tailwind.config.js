const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {    
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        // Define tus colores personalizados aquí
        yellowutm: '#ffcc33',
        greenutm: '#009933',
        greenutmbajo: '#00802b',
        greenutmsuperbajo: '#00bd3f',
      },
      //agregar el tamaño de altura a mayor de h-96
      height: {
        '96': '24rem',
        '100': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
