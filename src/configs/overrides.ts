import type { Linter } from 'eslint'
import prettier from 'eslint-config-prettier'
import { DECLARATION_FILES, SCRIPT_FILES, TEST_FILES } from '../constants.js'

const overrides: Linter.Config[] = [
  {
    name: 'quickcasa/overrides/declaration-files',
    files: DECLARATION_FILES,
    rules: {
      'import-x/exports-last': 'off',
      'import-x/group-exports': 'off',
    },
  },
  {
    name: 'quickcasa/overrides/test-files',
    files: TEST_FILES,
    rules: {
      'max-nested-callbacks': 'off',
      'unicorn/consistent-function-scoping': 'off',
    },
  },
  {
    name: 'quickcasa/overrides/script-files',
    files: SCRIPT_FILES,
    rules: {
      'no-console': 'off',
      'unicorn/no-process-exit': 'off',
    },
  },
  {
    ...prettier,
    name: 'quickcasa/overrides/prettier',
  },
  {
    name: 'quickcasa/overrides/after-prettier',
    rules: {
      curly: ['error', 'all'],
    },
  },
]

export { overrides }
