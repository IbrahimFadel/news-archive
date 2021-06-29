module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"google",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.dev.json"],
		sourceType: "module",
	},
	ignorePatterns: [
		"/lib/**/*", // Ignore built files.
	],
	plugins: [
		"@typescript-eslint",
		"import",
		"prettier",
	],
	rules: {
		"quotes": ["error", "double"],
		"object-curly-spacing": ["error", "always"],
		"indent": ["error", "tab"],
		"no-tabs": 0,
		"arrow-parens": ["error", "as-needed"],
		"max-len": ["error", { "code": 200 }],
	},
};
