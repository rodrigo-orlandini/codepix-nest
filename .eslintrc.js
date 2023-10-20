module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': 'off',
		"arrow-spacing": "error",
		"comma-dangle": "error",
		"comma-style": "error",
		"consistent-this": "error",
		"curly": "error",
		"eqeqeq": "error",
		"func-names": "error",
		"key-spacing": [ "error", { "beforeColon": false, "afterColon": true } ],
		"new-parens": "error",
		"newline-before-return": "error",
		"no-else-return": "error",
		"object-curly-spacing": [ "error", "always" ],
		"prefer-arrow-callback": "error",
		"prefer-const": "error",
		"prefer-template": "error",
		"quotes": [ "error", "double" ],
		"semi": [ "error", "always" ],
		"sort-imports": [ "error", { 
			"ignoreCase": true, 
			"ignoreDeclarationSort": true 
		}],
		"space-before-blocks": ["error", "always"]
  },
};
