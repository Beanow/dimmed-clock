import js from "@eslint/js";
import css from "@eslint/css";
import globals from "globals";
import react from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_$",
          varsIgnorePattern: "^_$",
          caughtErrorsIgnorePattern: "^_$",
        },
      ],
      // We have several constant arrays to walk.
      "@eslint-react/no-array-index-key": ["off"]
    },
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
