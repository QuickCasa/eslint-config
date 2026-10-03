import { defineConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30_000,
  },
})

export default config
