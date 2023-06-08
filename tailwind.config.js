/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                bagel: ["Bagel Fat One", "cursive"],
            },
        },
    },
    darkMode: "data-theme",
    daisyui: {
        themes: ["light", "dark", "emerald"],
    },
    plugins: [require("daisyui")],
};
