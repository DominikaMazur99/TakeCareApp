import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		colors: {
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			customGrey: '#E4E5E7',
    			customBlue: '#0068FA',
    			customRed: '#FF3414',
    			customWhite: '#FEFEFE',
    			textBase: '#242628',
    			textHover: '#6D7178',
    			textLabel: '#112950'
    		},
    		fontSize: {
    			base: ["16px", "24px"],
    			header: ["18px", "27px"]
    		},
    		fontWeight: {
    			small: '400',
    			medium: '500',
    			hight: '700'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [],
} satisfies Config;
