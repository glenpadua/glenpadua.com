import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const config = [
  {
    // Static design studies are source references, not application code.
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'coverage/**',
      'docs/mock/**',
      'docs/storyboard/**',
    ],
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
