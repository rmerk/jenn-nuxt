// @ts-check
import antfu from '@antfu/eslint-config';
import tailwind from 'eslint-plugin-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu(
    {
      stylistic: {
        indent: 4,
        semi: true,
        quotes: 'single',
        overrides: {},
      },
      typescript: true,
      vue: true,
    },
    {
      files: ['**/*.vue'],
      rules: {
        'vue/max-attributes-per-line': ['error', {
          singleline: 2, // Allow up to 2 attributes on a single line
          multiline: { max: 1 }, // Allow only 1 attribute per line when multiline
        }],
        'vue/singleline-html-element-content-newline': ['error', {
          ignoreWhenNoAttributes: false,
          ignoreWhenEmpty: true,
          ignores: [],
          externalIgnores: [],
        }],
      },
    },
    {
      rules: {
        'array-bracket-newline': ['error', 'consistent'],
        'object-curly-newline': ['error', { multiline: true }],
        'object-curly-spacing': ['error', 'always'],
      },
    },
    ...[tailwind.configs['flat/recommended']],
  ),
);
