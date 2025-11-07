export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(215, 85%, 45%)',
          dark: 'hsl(215, 85%, 35%)',
        },
        accent: {
          DEFAULT: 'hsl(30, 95%, 55%)',
          dark: 'hsl(30, 95%, 45%)',
        }
      }
    },
  },
  plugins: [],
}