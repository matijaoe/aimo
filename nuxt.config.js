import { resolve } from 'path';

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'AIMO',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			// { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Fascinate&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/css/styles.css',
		'~/assets/css/v-tooltip.css',
		'boxicons/css/boxicons.min.css',
		'vuesax/dist/vuesax.css',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		// https://github.com/Akryum/v-tooltip
		'~/plugins/v-tooltip',
		// https://github.com/vue-bulma/click-outside#readme
		'~/plugins/v-click-outside.js',
		// https://github.com/Leecason/vue-rough-notation
		'~/plugins/rough-notation.js',
		'@/plugins/vuesax.js',
		'~/plugins/getUsers.js',
		'~/plugins/getCountries.js',
		'@/plugins/getCategories.js',
		'@/plugins/getSocials.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https: //github.com/nuxt-community/tailwindcss-module
		'@nuxtjs/tailwindcss',
	],

	router: {
		middleware: ['auth'],
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		[
			'@nuxtjs/firebase',
			{
				config: {
					apiKey: 'AIzaSyCod4bOC35WfbE0Y8BzgnaJsyp8pPqFkX8',
					authDomain: 'aimo-test.firebaseapp.com',
					projectId: 'aimo-test',
					storageBucket: 'aimo-test.appspot.com',
					messagingSenderId: '909261717167',
					appId: '1:909261717167:web:08b261d06c01fe11e79e5a',
					measurementId: 'G-3CMS8T5E94',
				},
				services: {
					auth: {
						persistence: 'local', // default
						initialize: {
							onAuthStateChangedAction:
								'onAuthStateChangedAction',
							subscribeManually: false,
						},
						ssr: false,
					},
				},
			},
		],
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// TailwindCSS module configuration (https://github.com/nuxt-community/tailwindcss-module)
	tailwindcss: {
		jit: true,
	},

	autoprefixer: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	alias: {
		icons: resolve(__dirname, './components/app_icons'),
		UI: resolve(__dirname, './components/UI'),
		logo: resolve(__dirname, './components/logo'),
		layout: resolve(__dirname, './components/layout'),
		menus: resolve(__dirname, './components/menus'),
		profile: resolve(__dirname, './components/user_profile'),
		todos: resolve(__dirname, './components/todos'),
		reviews: resolve(__dirname, './components/reviews'),
	},

	pageTransition: 'fade-in-right',
	// layoutTransition: 'fade-in-right',

	// Customize the loading indicator (https://nuxtjs.org/api/configuration-loading-indicator)
	loadingIndicator: {
		name: 'chasing-dots',
	},
};
