# Changelog

## 1.0.0 - 2026-10-03

First release.

- Flat config for ESLint 10, covering JavaScript and TypeScript files.
- QuickCasa's house rules: no `any` or `unknown`, full-word names, one export
  statement per file, comments on their own line, braces on every `if`, no
  nested ternaries, the `u` flag on every regular expression and an 800-line
  ceiling per file.
- ESLint, typescript-eslint and eslint-plugin-unicorn recommended rules, plus
  import checks including circular imports and JSDoc type checks.
- A `quickcasa` plugin with two rules: `no-unknown-type` and
  `no-shadowed-globals`.
- Built-in exceptions for type files, test files and scripts.
