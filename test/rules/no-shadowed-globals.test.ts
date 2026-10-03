import { RuleTester } from '@typescript-eslint/rule-tester'
import { noShadowedGlobals } from '../../src/plugin/rules/no-shadowed-globals.js'

const ruleTester = new RuleTester()

const shadowed = (name: string) => ({
  messageId: 'shadowedGlobal' as const,
  data: { name },
})

ruleTester.run('no-shadowed-globals', noShadowedGlobals, {
  valid: [
    'const clickEvent = new Event("click")',
    'button.addEventListener("click", clickEvent => handle(clickEvent))',
    'console.info(document.title, window.innerWidth)',
    'const { event: clickEvent } = payload',
    'payload.event = 1',
    'const message = { event: "opened", document: "lease.pdf" }',
    'type Handler = (event: MouseEvent) => void',
    'interface Listener { handle(event: Event): void }',
    'declare function on(event: string): void',
    'declare const event: Event',
    'function on(event: string): void\nfunction on(name: number): void\nfunction on(input: string | number) { return input }',
    'abstract class Handler { abstract handle(event: Event): void }',
    {
      code: 'const event = 1',
      options: [{ names: ['document'] }],
    },
  ],
  invalid: [
    {
      code: 'const event = createEvent()',
      errors: [shadowed('event')],
    },
    {
      code: 'button.addEventListener("click", event => event.preventDefault())',
      errors: [shadowed('event')],
    },
    {
      code: 'function handle(event: Event) { return event.type }',
      errors: [shadowed('event')],
    },
    {
      code: 'const { document } = payload',
      errors: [shadowed('document')],
    },
    {
      code: 'function window() {}',
      errors: [shadowed('window')],
    },
    {
      code: 'try { run() } catch (location) { report(location) }',
      errors: [shadowed('location')],
    },
    {
      code: 'import { history } from "./history.js"',
      errors: [shadowed('history')],
    },
    {
      code: 'let navigator = 1\nnavigator = 2',
      errors: [shadowed('navigator')],
    },
    {
      code: 'const top = 1',
      options: [{ names: ['top'] }],
      errors: [shadowed('top')],
    },
  ],
})
