/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-1": "#5D5F65",
        "dark-2": "#909296",
        "dark-4": "#383A3F",
        "dark-6": "#25262B",
        "dark-9": "#141517",
        primary: "#9D80FF",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
