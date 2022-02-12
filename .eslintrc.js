module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'prettier/prettier': 'error',
  },
};
