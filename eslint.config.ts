import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginSecurity from "eslint-plugin-security";

export default [
    {
        ignores: ["**/dist/", "**/test/"]
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    pluginSecurity.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ]
        }
    }
];
