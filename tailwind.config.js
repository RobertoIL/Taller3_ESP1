/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('/public/images/bg_login.jpg')",
        home_background: "url('/public/images/bg_home.jpg')",
      },
    },
  },
  plugins: [],
};
