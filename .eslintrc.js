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
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'vue/no-multiple-template-root': 'off',
		'vue/require-prop-types': 'off',
	},
};
