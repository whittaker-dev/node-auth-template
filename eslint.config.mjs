import js from "@eslint/js";
export default [
  js.configs.recommended,

  {
    //* "off" or 0 - turn the rule off
    //* "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    //* "error" or 2 - turn the rule on as an error (exit code will be 1)
    rules: {
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-parameter-properties": 0,
      "@typescript-eslint/interface-name-prefix": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/ban-types": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-empty-function": 0,
    },
    parser: "@typescript-eslint/parser",
    extends: ["prettier", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
];
