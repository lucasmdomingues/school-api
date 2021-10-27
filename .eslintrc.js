module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
  },
};
