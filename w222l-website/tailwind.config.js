/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pinkPalette: {
          0: '#F4E3EB',
          1: '#FACDE5',
          2: '#F7B9D7',
          3: '#F18DBC',
          4: '#ED5C9B',
          5: '#E0218A'
        }
      },
      fontFamily: {
        lily: [ '"Lily Script One"' ]
      }
    },
  },
  plugins: [],
}

