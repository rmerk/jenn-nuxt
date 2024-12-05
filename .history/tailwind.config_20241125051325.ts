import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  content: [
    './components/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ]
}