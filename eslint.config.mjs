import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'coverage/**'],
  },
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
