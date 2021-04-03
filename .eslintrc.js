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
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto',
			},
		],
		'no-unused-vars': 'warn',
	},
};
