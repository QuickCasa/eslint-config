import { defineConfig } from 'eslint/config'
import quickcasa from './dist/index.js'

/**
 * The package lints itself with its own build, so every rule it ships has to
 * pass on real code before it reaches anyone else.
 */
const config = defineConfig([{ ignores: ['dist', 'coverage'] }, ...quickcasa])

export default config
