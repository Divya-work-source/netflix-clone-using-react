// eslint.config.js
import js from '@eslint/js';
import { eslintPluginReact } from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      'react-hooks/exhaustive-deps': 'warn',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
