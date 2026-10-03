# @quickcasa/eslint-config

[![CI](https://github.com/QuickCasa/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/QuickCasa/eslint-config/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

QuickCasa's ESLint config for JavaScript and TypeScript. It's the set of rules
we hold our own code to: no `any` or `unknown`, full-word names, one export
statement per file and braces on every `if`. It uses ESLint 10's flat config
and leaves formatting to Prettier.

## Install

```bash
npm install --save-dev eslint typescript@~6.0.3 @quickcasa/eslint-config
```

You need Node.js 22 or later, ESLint 10.4 or later and TypeScript 4.8.4 to
6.0. For TypeScript 7, see [TypeScript 7](#typescript-7) below.

## Usage

Create `eslint.config.js` in the root of your project:

```js
import { defineConfig } from 'eslint/config'
import quickcasa from '@quickcasa/eslint-config'

export default defineConfig([{ ignores: ['dist'] }, ...quickcasa])
```

Then run `npx eslint .`. Most problems it reports can be fixed with
`npx eslint . --fix`.

To change a rule, add your own config object after the spread:

```js
export default defineConfig([
  { ignores: ['dist'] },
  ...quickcasa,
  {
    rules: {
      'max-params': ['error', 4],
    },
  },
])
```

## What it enforces

| House rule                                                                              | Enforced by                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| No `any` type                                                                           | `@typescript-eslint/no-explicit-any`                                 |
| No `unknown` type                                                                       | [`quickcasa/no-unknown-type`](docs/rules/no-unknown-type.md)         |
| Full words in names, such as `button` rather than `btn`. `props` and `params` are fine. | `unicorn/name-replacements`                                          |
| One export statement per file, at the end                                               | `import-x/group-exports`, `import-x/exports-last`                    |
| Comments go on their own line, never beside code                                        | `no-inline-comments`                                                 |
| Braces on every `if`, `else` and loop                                                   | `curly`                                                              |
| No nested ternaries                                                                     | `no-nested-ternary`                                                  |
| Every regular expression has the `u` or `v` flag                                        | `require-unicode-regexp`                                             |
| No variables named after browser globals such as `event` or `document`                  | [`quickcasa/no-shadowed-globals`](docs/rules/no-shadowed-globals.md) |
| No file longer than 800 lines                                                           | `max-lines`                                                          |
| A JSDoc block, when there is one, types every parameter and the return value            | `jsdoc/require-param-type`, `jsdoc/require-returns-type` and others  |
| No `console.log`. `console.error`, `console.warn` and `console.info` are allowed.       | `no-console`                                                         |
| No circular imports                                                                     | `import-x/no-cycle`                                                  |

On top of those, it turns on ESLint's recommended rules, typescript-eslint's
recommended rules and most of eslint-plugin-unicorn's recommended rules.

### Built-in exceptions

- **Type and style files** (`types.ts`, `*.types.ts`, anything in a `types` or
  `_types` folder, `*.d.ts` and `styled.ts`) can use several export statements,
  because they exist to hold many small declarations.
- **Test files** can nest callbacks as deeply as they need and define helpers
  inside a test.
- **Scripts** in a `scripts` or `bin` folder can log to the console and call
  `process.exit()`.

### Unicorn rules we turn off

Unicorn's recommended set covers a lot of ground. These rules conflict with how
we write code, so they're off:

- `no-named-default` and `prefer-export-from`, which push exports into several
  statements and conflict with one export statement per file.
- `no-asterisk-prefix-in-documentation-comments`, which conflicts with
  standard JSDoc layout.
- `consistent-boolean-name`, which flags names such as `prefersReducedMotion`
  that come from web platform APIs.
- `no-top-level-assignment-in-function`, which flags the common pattern of a
  module-level value created on first use.
- `prefer-simple-condition-first`, whose own message says to check the change
  doesn't alter behaviour.
- `expiring-todo-comments`, which turns a dated TODO comment into a failing
  build.
- `dom-node-dataset`, `prefer-global-this` and `prefer-query-selector`, which
  rewrite plain DOM code into a different but no clearer form.
- `filename-case`, `import-style`, `no-array-reduce`, `no-for-each`, `no-null`,
  `prefer-switch` and `prefer-ternary`, which are matters of taste.
- `no-nested-ternary`, because ESLint's own rule of the same name is stricter
  and is on instead.

## Type information

The config doesn't use type information, so it needs no `tsconfig` setup and
runs quickly. If you want typescript-eslint's type-aware rules as well, add
them after the spread by following
[typescript-eslint's typed linting guide](https://typescript-eslint.io/getting-started/typed-linting).

## TypeScript 7

typescript-eslint reads TypeScript through its JavaScript API, and TypeScript 7
doesn't ship that API yet. Until it does, alias `typescript` to the TypeScript 6
compatibility release so ESLint can parse your code, and install TypeScript 7
under another name for type checking:

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

With this setup, `npx tsc` still runs TypeScript 7, and ESLint gets TypeScript 6
when it loads `typescript`.

## Custom rules

The config includes a small plugin, registered as `quickcasa`, with two rules:

- [`quickcasa/no-unknown-type`](docs/rules/no-unknown-type.md)
- [`quickcasa/no-shadowed-globals`](docs/rules/no-shadowed-globals.md)

The plugin is also a named export if you want the rules without the rest of the
config:

```js
import { plugin } from '@quickcasa/eslint-config'

export default [
  {
    plugins: { quickcasa: plugin },
    rules: { 'quickcasa/no-unknown-type': 'error' },
  },
]
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose a rule change.

## Licence

[MIT](LICENSE). Built and maintained by [QuickCasa](https://quickcasa.ai) in
Kitchener, Ontario.
