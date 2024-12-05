import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ]
}