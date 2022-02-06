module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import', 
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

  },
  settings: {
    "import/resolver": {
        typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
        }
    }
},
};
