import { RuleTester } from '@typescript-eslint/rule-tester'
import { noUnknownType } from '../../src/plugin/rules/no-unknown-type.js'

const ruleTester = new RuleTester()

ruleTester.run('no-unknown-type', noUnknownType, {
  valid: [
    'const count: number = 1',
    'type Payload = { name: string; tags: string[] }',
    'try { run() } catch (error) { report(error) }',
    'const unknownCount = 0',
  ],
  invalid: [
    {
      code: 'const value: unknown = read()',
      errors: [{ messageId: 'unknownType' }],
    },
    {
      code: 'function parse(input: unknown): string { return String(input) }',
      errors: [{ messageId: 'unknownType' }],
    },
    {
      code: 'type Bag = Record<string, unknown>',
      errors: [{ messageId: 'unknownType' }],
    },
    {
      code: 'const label = read() as unknown as string',
      errors: [{ messageId: 'unknownType' }],
    },
    {
      code: 'try { run() } catch (error: unknown) { report(error) }',
      errors: [{ messageId: 'unknownType' }],
    },
  ],
})
