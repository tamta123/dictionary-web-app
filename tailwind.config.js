/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "div-grey": "#E9E9E9",
        "gray-200": "#F4F4F4",
        "dark-mode": "#050505",
        "dark-search-bar": "#1F1F1F",
        "dark-mode-font": "#FFFFFF",
        "dark-mode-example": "#757575",
        "dark-mode-line": "#3A3A3A",
      },
    },
  },

  darkMode: "class",
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [],
};
