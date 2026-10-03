import type { Linter } from 'eslint'
import { javascript } from './configs/javascript.js'
import { overrides } from './configs/overrides.js'
import { typescript } from './configs/typescript.js'
import { plugin } from './plugin/index.js'

const quickcasa: Linter.Config[] = [...javascript, ...typescript, ...overrides]

export { quickcasa as default, plugin }
