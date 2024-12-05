// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    stylistic: {
      indent: 4,
      semi: true,
      single: true
    },
    typescript: true,
    vue: true,
  }),
)
