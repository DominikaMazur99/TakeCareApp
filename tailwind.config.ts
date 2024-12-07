import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",

                customGrey: "#E4E5E7",
                customBlue: "#0068FA",
                customRed: "#FF3414",
                customWhite: "#FEFEFE",
            },
        },
    },
    plugins: [],
} satisfies Config;
