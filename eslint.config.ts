import js from "@eslint/js";
module.exports = [
  js.configs.recommended,
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
    },
  },
];
