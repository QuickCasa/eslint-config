import { ESLint } from 'eslint'
import { defineConfig } from 'eslint/config'
import { describe, expect, it } from 'vitest'
import quickcasa from '../src/index.js'

/**
 * Wrapping the config in `defineConfig` here is also a type test: it is the
 * call every consumer makes, so it has to typecheck against ESLint's own types.
 */
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: defineConfig([...quickcasa]),
})

/**
 * Lints a snippet as if it lived at the given path.
 * @param {string} code - The source to lint.
 * @param {string} filePath - Where the file would live, which picks the rules.
 * @returns {Promise<ESLint.LintResult>} The single lint result.
 */
const lint = async (
  code: string,
  filePath = 'src/example.ts',
): Promise<ESLint.LintResult> => {
  const [result] = await eslint.lintText(code, { filePath })

  if (!result) {
    throw new Error(`ESLint returned no result for ${filePath}`)
  }

  return result
}

/**
 * Lists the rules that reported a problem.
 * @param {string} code - The source to lint.
 * @param {string} filePath - Where the file would live.
 * @returns {Promise<string[]>} The rule ids, one per problem.
 */
const reportedRules = async (
  code: string,
  filePath?: string,
): Promise<string[]> => {
  const result = await lint(code, filePath)

  return result.messages.map(message => message.ruleId ?? 'fatal')
}

const CLEAN_TYPESCRIPT = String.raw`import { readFile } from 'node:fs/promises'
import type { Settings } from './types.js'

/**
 * Reads the settings file and returns its parsed contents.
 * @param {string} settingsPath - Where the settings file lives.
 * @returns {Promise<Settings>} The parsed settings.
 */
const readSettings = async (settingsPath: string): Promise<Settings> => {
  const contents = await readFile(settingsPath, 'utf8')

  return JSON.parse(contents) as Settings
}

const isDraft = (settings: Settings): boolean => {
  if (settings.status === 'draft') {
    return true
  }

  return /^draft-\d+$/u.test(settings.name)
}

export { isDraft, readSettings }
`

const CLEAN_JAVASCRIPT = `const DEFAULT_LIMIT = 50

/**
 * Keeps the first entries of a list, up to a limit.
 * @param {string[]} entries - The entries to trim.
 * @param {number} limit - How many entries to keep.
 * @returns {string[]} The trimmed list.
 */
const trimEntries = (entries, limit = DEFAULT_LIMIT) => entries.slice(0, limit)

export { trimEntries }
`

describe('clean code', () => {
  it('passes in a TypeScript file', async () => {
    expect(await reportedRules(CLEAN_TYPESCRIPT)).toEqual([])
  })

  it('passes in a JavaScript file', async () => {
    expect(await reportedRules(CLEAN_JAVASCRIPT, 'src/example.js')).toEqual([])
  })
})

describe('the house rules', () => {
  it.each([
    [
      'the any type',
      'const value: any = 1',
      '@typescript-eslint/no-explicit-any',
    ],
    [
      'the unknown type',
      'const value: unknown = 1',
      'quickcasa/no-unknown-type',
    ],
    [
      'a comment beside code',
      'const total = 1 // the total',
      'no-inline-comments',
    ],
    ['a short-form name', 'const btn = 1', 'unicorn/name-replacements'],
    [
      'two export statements',
      'const first = 1\nconst second = 2\nexport { first }\nexport { second }',
      'import-x/group-exports',
    ],
    ['an if without braces', 'if (ready) run()', 'curly'],
    [
      'a nested ternary',
      'const size = small ? 1 : large ? 3 : 2',
      'no-nested-ternary',
    ],
    [
      'a regex without the u flag',
      'const pattern = /abc/',
      'require-unicode-regexp',
    ],
    [
      'a name that hides a global',
      'const event = 1',
      'quickcasa/no-shadowed-globals',
    ],
    ['console.log', 'console.log(1)', 'no-console'],
    [
      'a JSDoc parameter with no type',
      '/**\n * Adds one.\n * @param count - The count.\n * @returns {number} The count plus one.\n */\nconst increment = (count: number): number => count + 1',
      'jsdoc/require-param-type',
    ],
  ])('flags %s', async (_description, code, ruleId) => {
    expect(await reportedRules(code)).toContain(ruleId)
  })

  it('flags a file longer than 800 lines', async () => {
    const code = Array.from(
      { length: 801 },
      (_entry, index) => `const line${index} = ${index}`,
    ).join('\n')

    expect(await reportedRules(code)).toContain('max-lines')
  })

  it('applies to JavaScript files too', async () => {
    expect(await reportedRules('const btn = 1', 'src/example.js')).toContain(
      'unicorn/name-replacements',
    )
  })
})

describe('the overrides', () => {
  it('lets a types file use several export statements', async () => {
    const code =
      'type Unit = { id: string }\nexport type { Unit }\ntype Bill = { total: number }\nexport type { Bill }'

    expect(await reportedRules(code, 'src/types.ts')).not.toContain(
      'import-x/group-exports',
    )
  })

  it('lets build scripts log', async () => {
    expect(
      await reportedRules('console.log("built")', 'scripts/build.js'),
    ).not.toContain('no-console')
  })
})

describe('the config itself', () => {
  it.each(['src/example.ts', 'src/example.js'])(
    'uses no deprecated rules in %s',
    async filePath => {
      const result = await lint('', filePath)

      expect(result.usedDeprecatedRules).toEqual([])
    },
  )
})
