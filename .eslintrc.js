// @flow
module.exports = {
  parser: "babel-eslint",
  plugins: ["react"],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    camelcase: ["error", { properties: "never", allow: ["^_unused_.*"] }],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_$|^_unused_",
        varsIgnorePattern: "^_$|^_unused_",
        caughtErrorsIgnorePattern: "^_$|^_unused_"
      }
    ],
    "no-constant-condition": ["warn", { checkLoops: false }],
    "no-use-before-define": ["off"],
    "no-useless-constructor": ["off"],
    "no-case-declarations": ["off"],
    "react/prop-types": ["off"],
    "react/react-in-jsx-scope": ["off"]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
