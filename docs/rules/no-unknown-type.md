# quickcasa/no-unknown-type

Disallows the `unknown` type.

`unknown` is safer than `any`, but it still hands the work of figuring out a
value's shape to every line that touches it. This rule asks for a specific type
instead. When data comes from outside your code, such as a request body or
`JSON.parse`, narrow it once where it arrives and pass the specific type on.

A `catch` variable doesn't need an annotation at all. With `strict` on,
TypeScript already treats it as `unknown`, and this rule only reports the
keyword where it's written out.

## Incorrect

```ts
const value: unknown = readInput()

type Bag = Record<string, unknown>

const label = response as unknown as string

try {
  run()
} catch (error: unknown) {
  report(error)
}
```

## Correct

```ts
type Settings = { name: string; limit: number }

const settings: Settings = parseSettings(readInput())

try {
  run()
} catch (error) {
  report(error)
}
```

## When to turn it off

At a real boundary where no specific type exists yet, such as the parameter of
a type guard, turn the rule off for that line with a comment that says why:

```ts
// eslint-disable-next-line quickcasa/no-unknown-type -- validated below
const isSettings = (value: unknown): value is Settings =>
  typeof value === 'object' && value !== null && 'name' in value
```

## Options

None.
