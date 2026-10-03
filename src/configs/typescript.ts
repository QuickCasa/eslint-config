import type { Linter } from 'eslint'
import tseslint from 'typescript-eslint'
import { ALL_FILES, TYPESCRIPT_FILES } from '../constants.js'

/**
 * typescript-eslint's recommended set without type information, so the config
 * works with no tsconfig wiring. The parser is registered for every file so
 * JavaScript and TypeScript share one AST and one set of custom rules.
 */
const recommended = tseslint.configs.recommended.map(
  (config, index): Linter.Config => ({
    ...config,
    name: `quickcasa/typescript/recommended-${index}`,
    files: index === 0 ? ALL_FILES : TYPESCRIPT_FILES,
  }),
)

const typescript: Linter.Config[] = [
  ...recommended,
  {
    name: 'quickcasa/typescript/rules',
    files: TYPESCRIPT_FILES,
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: true },
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'quickcasa/no-unknown-type': 'error',
    },
  },
]

export { typescript }
