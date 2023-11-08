/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "base-bg-1": "radial-gradient(50% 50% at 50% 50%, #363062 0%, rgba(40, 29, 122, 0.21) 100%)",
                "base-bg": "#363062",
            },
            colors: {
                "input-1": "rgba(54, 48, 98, 0.20)",
                "input-2": "rgba(54, 48, 98, 0.50)",
                "base-1": "#363062",
                "base-2": "#4D4C7D",
                "base-3": "#F99417",
                "base-4": "#F5F5F5",
            },
            boxShadow: {
                high: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                low: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                base: "0px 6px 8px 0px rgba(0, 0, 0, 0.25)",
            },
        },
    },
    plugins: [],
};
