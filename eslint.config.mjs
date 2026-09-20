// @ts-check
import eslint from "@eslint/js";
import configPrettier from "eslint-config-prettier/flat";
import pluginAstro from "eslint-plugin-astro";
import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const GLOB_TS = "**/*.?([cm])ts";
const GLOB_TSX = "**/*.tsx";
const GLOB_DTS = "**/*.d.ts";
const GLOB_ASTRO = "**/*.astro";
const GLOB_VUE = "**/*.vue";

export default defineConfig(
  globalIgnores(
    ["**/dist", "**/node_modules", "**/.astro", "**/.github", "**/.vercel"],
    "blog/global-ignores",
  ),

  {
    name: "blog/javascript",
    extends: [eslint.configs.recommended],
  },

  {
    name: "blog/typescript",
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    name: "blog/typescript/dts-rules",
    files: [GLOB_DTS],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  {
    name: "blog/astro",
    extends: [pluginAstro.configs["flat/recommended"]],
  },
  {
    name: "blog/astro/a11y",
    files: [GLOB_ASTRO],
    extends: [pluginAstro.configs["flat/jsx-a11y-recommended"]],
  },

  {
    name: "blog/vue",
    files: [GLOB_VUE],
    extends: [
      pluginVue.configs["flat/recommended"],
      pluginVueA11y.configs["flat/recommended"],
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },

  // TypeScript already checks undefined variables.
  {
    name: "blog/disables/no-undef",
    files: [GLOB_TS, GLOB_TSX, GLOB_ASTRO, GLOB_VUE],
    rules: {
      "no-undef": "off",
    },
  },

  // Must be last to turn off rules conflicting with Prettier.
  {
    name: "blog/prettier",
    extends: [configPrettier],
  },
);
