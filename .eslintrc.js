module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'standard',
  plugins: [commonjs],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'trailing-comma': 'on',
    'no-duplicate-imports': 'off'
  }
}
