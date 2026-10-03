import js from '@eslint/js'
import type { Linter } from 'eslint'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { createNodeResolver, importX } from 'eslint-plugin-import-x'
import jsdoc from 'eslint-plugin-jsdoc'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import {
  ALL_FILES,
  ALLOWED_ABBREVIATIONS,
  MAX_LINES_PER_FILE,
} from '../constants.js'
import { plugin } from '../plugin/index.js'

/**
 * Rules that apply to every JavaScript and TypeScript file. The TypeScript
 * layer swaps a few core rules for their type-aware equivalents.
 */
const javascript: Linter.Config[] = [
  {
    ...js.configs.recommended,
    name: 'quickcasa/javascript/eslint-recommended',
    files: ALL_FILES,
  },
  {
    ...unicorn.configs.recommended,
    name: 'quickcasa/javascript/unicorn-recommended',
    files: ALL_FILES,
  },
  {
    name: 'quickcasa/javascript/rules',
    files: ALL_FILES,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      'import-x': importX,
      jsdoc,
      quickcasa: plugin,
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
      jsdoc: {
        mode: 'typescript',
      },
    },
    rules: {
      'accessor-pairs': 'error',
      'array-callback-return': 'error',
      'default-case': 'error',
      'default-param-last': 'error',
      'func-names': ['error', 'as-needed'],
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      'no-caller': 'error',
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
      'no-constructor-return': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: true },
      ],
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'prefer-object-has-own': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'require-await': 'error',
      'symbol-description': 'error',

      'arrow-body-style': ['error', 'as-needed'],
      camelcase: ['error', { properties: 'never' }],
      'dot-notation': 'error',
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-implicit-coercion': 'error',
      'no-lonely-if': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-warning-comments': 'warn',
      'object-shorthand': ['error', 'always'],
      'operator-assignment': 'error',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'prefer-const': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      yoda: 'error',

      'max-depth': ['error', 5],
      'max-lines': ['error', { max: MAX_LINES_PER_FILE }],
      'max-nested-callbacks': ['error', 4],
      'max-params': ['error', 6],

      curly: ['error', 'all'],
      'id-length': [
        'error',
        {
          min: 2,
          properties: 'never',
          exceptions: ['_', 'a', 'b', 'i', 'j', 'x', 'y'],
        },
      ],
      'no-inline-comments': 'error',
      'no-nested-ternary': 'error',
      'require-unicode-regexp': 'error',
      'quickcasa/no-shadowed-globals': 'error',
      'unicorn/name-replacements': [
        'error',
        { allowList: ALLOWED_ABBREVIATIONS },
      ],

      'unicorn/consistent-boolean-name': 'off',
      'unicorn/dom-node-dataset': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
      'unicorn/no-for-each': 'off',
      'unicorn/no-named-default': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-simple-condition-first': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/prefer-ternary': 'off',

      'import-x/exports-last': 'error',
      'import-x/export': 'error',
      'import-x/first': 'error',
      'import-x/group-exports': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/order': 'error',

      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/no-multi-asterisks': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/valid-types': 'error',
    },
  },
]

export { javascript }
