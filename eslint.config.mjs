import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";

const TYPESCRIPT_FILES = ["**/*.{ts,tsx,mts}"];

const DOMAIN_FILES = ["src/domain/**"];
const DOMAIN_FORBIDDEN_IMPORTS = [
  "react",
  "react-dom",
  "next",
  "next/*",
  "dexie",
  "@/app/*",
  "@/components/*",
  "@/data/*",
  "@/features/*",
  "**/app/**",
  "**/components/**",
  "**/data/**",
  "**/features/**",
];
const DOMAIN_IMPORT_MESSAGE =
  "The domain layer must stay pure: no React, Next.js, UI or data-access imports.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: TYPESCRIPT_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    files: DOMAIN_FILES,
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: DOMAIN_FORBIDDEN_IMPORTS,
              message: DOMAIN_IMPORT_MESSAGE,
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
