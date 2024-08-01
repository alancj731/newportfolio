import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				cardblue: '#081cf4',
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
