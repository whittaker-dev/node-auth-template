module.exports = [
  {
    //* "off" or 0 - turn the rule off
    //* "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    //* "error" or 2 - turn the rule on as an error (exit code will be 1)
    parser: "@typescript-eslint/parser",
    languageOptions: {
      parser: "@typescript-eslint/parser"
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    // 0 = off, 1 = warn, 2 = error
    rules: {
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-parameter-properties": 0,
      "@typescript-eslint/interface-name-prefix": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/ban-types": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-empty-function": 1,
    },
  },
];
