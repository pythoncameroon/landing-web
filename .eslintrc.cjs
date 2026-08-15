module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // Composants shadcn vendorés (exportent aussi leurs variants cva) et
      // paires provider+hook : la règle ne concerne que la granularité du HMR.
      files: [
        'src/components/ui/**/*.tsx',
        'src/providers/theme-provider.tsx',
        'src/components/language.tsx',
      ],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
}
