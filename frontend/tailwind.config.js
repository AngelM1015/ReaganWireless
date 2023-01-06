export default {
  theme: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `composables/**/*.{js,ts}`,
      `plugins/**/*.{js,ts}`,
      `App.{js,ts,vue}`,
      `app.{js,ts,vue}`,
    ],
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "red-primary": "#E12126",
        "blue-primary": "#0067B0",
        "black-700": "#505050",
        "black-900": "#282828",
      },
      height: {
        90: "24rem",
        100: "28rem",
      },
      opacity: {
        full: "1",
      },
    },
  },
  plugins: [],
};
