import { createRule } from '../create-rule.js'

const noUnknownType = createRule({
  name: 'no-unknown-type',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow the `unknown` type in favour of a specific type',
    },
    messages: {
      unknownType:
        'Use a specific type instead of `unknown`. For data from outside your code, narrow it once where it arrives and pass the specific type on.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => ({
    TSUnknownKeyword: node => {
      context.report({ node, messageId: 'unknownType' })
    },
  }),
})

export { noUnknownType }
