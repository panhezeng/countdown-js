module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {}
};
