import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["build/**"] },
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Security
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      // Quality
      "no-var": "error",
      "eqeqeq": "error",
      "no-unused-vars": ["error", { args: "none", varsIgnorePattern: "^h$" }],
    },
  },
];
