import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import type { TSESLint } from '@typescript-eslint/utils'
import { DEFAULT_SHADOWED_GLOBAL_NAMES } from '../../constants.js'
import type { ShadowedGlobalsOptions } from '../../types.js'
import { createRule } from '../create-rule.js'

/**
 * Scopes that only exist in type positions. A parameter named `event` in a
 * function type never runs, so it cannot hide anything at runtime.
 */
const TYPE_ONLY_SCOPES = new Set(['functionType', 'type', 'tsModule'])

/**
 * Function signatures with no body: `declare function`, overloads and
 * abstract methods. Their parameters are never bound at runtime.
 */
const BODILESS_FUNCTIONS = new Set<string>([
  AST_NODE_TYPES.TSDeclareFunction,
  AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
])

/**
 * Checks whether a definition creates a binding that exists when the code
 * runs, rather than an implicit global or an ambient declaration.
 * @param {TSESLint.Scope.Definition} definition - The definition to check.
 * @returns {boolean} True when the definition binds a name at runtime.
 */
const isRuntimeDefinition = (
  definition: TSESLint.Scope.Definition,
): boolean => {
  if (definition.type === 'ImplicitGlobalVariable') {
    return false
  }

  if (definition.type === 'Parameter') {
    return !BODILESS_FUNCTIONS.has(definition.node.type)
  }

  if (definition.type === 'Variable') {
    return !definition.parent.declare
  }

  return true
}

/**
 * Checks whether a variable is a real runtime binding declared in the file,
 * rather than an implicit global or a name that only exists as a type. Only
 * typescript-eslint's scope manager knows about types, so a variable from any
 * other parser counts as a value.
 * @param {TSESLint.Scope.Variable} variable - The variable to check.
 * @returns {boolean} True when the variable is declared and holds a value.
 */
const isDeclaredValue = (variable: TSESLint.Scope.Variable): boolean =>
  (!('isValueVariable' in variable) || variable.isValueVariable) &&
  !TYPE_ONLY_SCOPES.has(variable.scope.type) &&
  variable.defs.some(definition => isRuntimeDefinition(definition))

const noShadowedGlobals = createRule<
  [ShadowedGlobalsOptions],
  'shadowedGlobal'
>({
  name: 'no-shadowed-globals',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow naming a variable, parameter, function or class after a browser global such as `event` or `document`',
    },
    messages: {
      shadowedGlobal:
        '`{{name}}` hides the browser global of the same name. Rename it to say what it holds.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          names: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ names: DEFAULT_SHADOWED_GLOBAL_NAMES }],
  create: (context, [options]) => {
    const names = new Set(options.names)

    return {
      'Program:exit': () => {
        const scopes = context.sourceCode.scopeManager?.scopes ?? []
        const shadowingVariables = scopes
          .flatMap(scope => scope.variables)
          .filter(
            variable => names.has(variable.name) && isDeclaredValue(variable),
          )

        for (const variable of shadowingVariables) {
          const runtimeDefinitions = variable.defs.filter(definition =>
            isRuntimeDefinition(definition),
          )

          for (const definition of runtimeDefinitions) {
            context.report({
              node: definition.name,
              messageId: 'shadowedGlobal',
              data: { name: variable.name },
            })
          }
        }
      },
    }
  },
})

export { noShadowedGlobals }
