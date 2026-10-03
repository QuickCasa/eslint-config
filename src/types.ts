type ShadowedGlobalsOptions = {
  names: string[]
}

type PackageManifest = {
  name: string
  version: string
}

/**
 * The plugin's public shape. ESLint's own plugin type and typescript-eslint's
 * rule types disagree on details, so the published type carries only what a
 * consumer needs, the same way typescript-eslint publishes its own plugin.
 */
type PublicPlugin = {
  meta: PackageManifest
}

export type { PackageManifest, PublicPlugin, ShadowedGlobalsOptions }
