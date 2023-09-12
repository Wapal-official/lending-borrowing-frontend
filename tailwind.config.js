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
        "dark-0": "#C1C2C5",
        "dark-1": "#A6A7AB",
        "dark-2": "#909296",
        "dark-3": "#5D5F65",
        "dark-4": "#383A3F",
        "dark-5": "#2C2E33",
        "dark-6": "#25262B",
        "dark-7": "#1A1B1E",
        "dark-8": "#141517",
        "dark-9": "#101113",
        primary: "#8759FF",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
