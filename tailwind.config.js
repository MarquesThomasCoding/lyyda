/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(14, 18, 23)",
        notSoDark: "rgb(28, 31, 38)",
        gray: "rgb(146, 156, 181)",
      }
    }
  },
  plugins: [],
}