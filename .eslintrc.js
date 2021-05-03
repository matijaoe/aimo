module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		'@nuxtjs',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended',
	],
	plugins: [],
	// add your custom rules here
	rules: {
		'prettier/prettier': [
			'error',
			{ endOfLine: 'auto' },
			{ usePrettierrc: true },
		],
		'no-unused-vars': 'warn',
		'no-unused-components': 'warn',
		'no-sequences': 0,
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'vue/no-multiple-template-root': 0,
		'vue/require-prop-types': 0,
		'vue/require-default-prop': 0,
		'vue/no-side-effects-in-computed-properties': 0,
	},
};
