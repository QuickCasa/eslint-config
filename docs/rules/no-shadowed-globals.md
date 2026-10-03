# quickcasa/no-shadowed-globals

Disallows naming a variable, parameter, function, class or import after a
browser global such as `event` or `document`.

A local name that matches a global hides it, and the bug shows up when the
local name goes missing. The classic case is an event handler that leaves out
its parameter but still reads `event`: the code keeps running, because it now
reads the deprecated `window.event` instead of failing.

Only names that exist at runtime are reported. A parameter in a function type,
an overload signature, a `declare` statement or an abstract method never runs,
so those are allowed.

## Incorrect

```ts
button.addEventListener('click', event => event.preventDefault())

const { document } = payload

function handle(event: Event) {
  return event.type
}
```

## Correct

```ts
button.addEventListener('click', clickEvent => clickEvent.preventDefault())

const { document: leaseDocument } = payload

type Handler = (event: MouseEvent) => void
```

Object properties are not variables, so `payload.event` and
`{ document: 'lease.pdf' }` are fine.

## Options

### names

The list of global names to check. The default is `event`, `document`,
`window`, `location`, `history` and `navigator`. Passing a list replaces the
default:

```js
{
  rules: {
    'quickcasa/no-shadowed-globals': ['error', { names: ['event', 'top'] }],
  },
}
```
