/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: "'Inter',sans-serif",
        Lora: "'Lora',serif",
        monospace: "'Inconsolata',monospace",
      },
      colors: {
        dark: "#050505",
        "div-grey": "#E9E9E9",
      },
      backgroundColor: {
        "gray-200": "#F4F4F4",
        dark: "#050505",
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
