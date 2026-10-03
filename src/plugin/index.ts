import { createRequire } from 'node:module'
import type { PackageManifest, PublicPlugin } from '../types.js'
import { noShadowedGlobals } from './rules/no-shadowed-globals.js'
import { noUnknownType } from './rules/no-unknown-type.js'

const manifest: PackageManifest = createRequire(import.meta.url)(
  '../../package.json',
)

const definition = {
  meta: {
    name: manifest.name,
    version: manifest.version,
  },
  rules: {
    'no-shadowed-globals': noShadowedGlobals,
    'no-unknown-type': noUnknownType,
  },
}

const plugin: PublicPlugin = definition

export { plugin }
