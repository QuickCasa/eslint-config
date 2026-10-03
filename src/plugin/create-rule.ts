import { ESLintUtils } from '@typescript-eslint/utils'
import { RULE_DOCS_URL } from '../constants.js'

const createRule = ESLintUtils.RuleCreator(
  name => `${RULE_DOCS_URL}/${name}.md`,
)

export { createRule }
