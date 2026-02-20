import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  globalIgnores([
    'node_modules/**',
    'build/**',
    'dist/**',
    'src/generated/**',
    '*.config.js',
    '*.config.mjs',
    'coverage/**',
  ]),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-console': 'off',
      'no-debugger': 'warn',
    },
  },
  eslintConfigPrettier,
]);
