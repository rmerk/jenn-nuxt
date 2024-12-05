// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    styleistic: {
      indent: 4,
      semi: true,
      doubleQuotes: true
    },
    ts: true,
  }),
)
