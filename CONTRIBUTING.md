# Contributing

Thanks for wanting to help. This config is opinionated on purpose, so the most
useful contribution is a report of a rule getting real code wrong.

## Proposing a rule change

Open an issue first, and include:

- The rule id.
- A short piece of code it reports that you think is fine, or code it misses
  that it should report.
- Why the change helps more projects than it hurts.

Turning a rule off needs a reason in the README's list of rules we turn off.
Turning a rule on needs evidence that it doesn't flood real code with reports:
run it against a real project and say what it found.

## Getting set up

You need Node.js 22 or later.

```bash
npm install
npm run check
```

`npm run check` runs everything CI runs: the formatting check, the typecheck,
the tests, the build, and the package linting its own source with its own
build.

## Tests

- Each custom rule has RuleTester cases in `test/rules/`. Add a case for any
  behaviour you add or fix.
- `test/config.test.ts` checks that each house rule reports a problem in a
  short bad example, and that clean code produces no problems at all. Change it
  whenever you change which rules are on.
- The same file fails if the config uses a deprecated rule, so plugin upgrades
  can't leave dead rules behind.

## Releasing

Maintainers only.

1. Update the version in `package.json`, the version in the README's install
   command, and `CHANGELOG.md`.
2. Commit, then tag the commit, for example `git tag v1.1.0`.
3. Push the commit and the tag. The release workflow runs the full check,
   creates the GitHub release with the packed tarball attached and publishes to
   npm when an npm token is configured.
