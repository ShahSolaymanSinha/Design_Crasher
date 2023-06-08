/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    darkMode: "class",
    daisyui: {
        themes: ["light", "dark"],
    },
    plugins: [require("daisyui")],
};
