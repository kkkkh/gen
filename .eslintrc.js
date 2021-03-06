module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		// '@vue/prettier',
		// '@vue/prettier/@typescript-eslint',
	],
	// plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// note you must disable the base rule as it can report incorrect errors
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'no-useless-escape':'off',
		'@typescript-eslint/no-unused-vars': ['off'],
		// 'prettier/prettier': ['error', {usePrettierrc: true}],
	},
}
