/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('/images/bg_login.jpg')",
        home_background: "url('/images/bg_home.jpg')",
      },
      fontFamily: {
        font_tittle: "Montserrat",
        "sans-serif": "Poppins",
      },
    },
  },
  plugins: [],
};
