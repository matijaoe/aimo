const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				primary: ['Poppins', 'ui-sans-serif'],
				logo: ['Fascinate', 'Poppins'],
			},
			colors: {
				gray: colors.blueGray,
				coolGray: colors.coolGray,
				orange: colors.orange,
				yellow: colors.yellow,
				amber: colors.amber,
				green: colors.green,
				emerald: colors.emerald,
				teal: colors.teal,
				blue: colors.blue,
				lightBlue: colors.lightBlue,
			},
		},
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
