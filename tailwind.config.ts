import { log } from 'console';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				bgblue: '#081cf4',
				cardblue: '#0d2b6b',
				cardbg: '#282828',
				cardborder: '#040e8d',
				bgellipsis: '#03346E',
				indexcolor: '#FFF1DB',
			},
			borderWidth: {
				sm: '1px',
				md: '2px',
				lg: '3px',
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
