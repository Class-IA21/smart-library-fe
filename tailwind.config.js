/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#470FF4",
      secondary: "#4056F4",
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#470FF4",
          "secondary": "#4056F4",
          "accent": "#272D2D",
          "neutral": "#ff00ff",
          "base-100": "#F8F7F9"
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};

