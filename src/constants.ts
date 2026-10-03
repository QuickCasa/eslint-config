const JAVASCRIPT_FILES = ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx']

const TYPESCRIPT_FILES = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx']

const ALL_FILES = [...JAVASCRIPT_FILES, ...TYPESCRIPT_FILES]

/**
 * Files that exist to hold many small declarations, where one export statement
 * per file would only force everything into a single unreadable block.
 */
const DECLARATION_FILES = [
  '**/types.ts',
  '**/*.types.ts',
  '**/types/**/*.ts',
  '**/_types/**/*.ts',
  '**/*.d.ts',
  '**/styled.ts',
  '**/styled.tsx',
]

const SCRIPT_FILES = ['**/scripts/**', '**/bin/**']

const TEST_FILES = [
  '**/*.test.*',
  '**/*.spec.*',
  '**/test/**',
  '**/tests/**',
  '**/__tests__/**',
]

/**
 * Browser globals that cause real bugs when a local name hides them. `event`
 * is the classic: a handler that forgets its parameter silently reads the
 * deprecated `window.event` instead of failing.
 */
const DEFAULT_SHADOWED_GLOBAL_NAMES = [
  'event',
  'document',
  'window',
  'location',
  'history',
  'navigator',
]

/**
 * Short forms that read as full words in their context and are allowed
 * everywhere. Everything else in unicorn's replacement list stays banned.
 */
const ALLOWED_ABBREVIATIONS = {
  Props: true,
  props: true,
  Params: true,
  params: true,
}

const MAX_LINES_PER_FILE = 800

const RULE_DOCS_URL =
  'https://github.com/QuickCasa/eslint-config/blob/main/docs/rules'

export {
  ALL_FILES,
  ALLOWED_ABBREVIATIONS,
  DECLARATION_FILES,
  DEFAULT_SHADOWED_GLOBAL_NAMES,
  JAVASCRIPT_FILES,
  MAX_LINES_PER_FILE,
  RULE_DOCS_URL,
  SCRIPT_FILES,
  TEST_FILES,
  TYPESCRIPT_FILES,
}
