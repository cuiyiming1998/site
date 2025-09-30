import type { App } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import rust from 'highlight.js/lib/languages/rust'
import typescript from 'highlight.js/lib/languages/typescript'
import 'highlight.js/styles/github.css'

export const setupHighlight = (app: App) => {
  hljs.registerLanguage('rust', rust)
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('js', javascript)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('ts', typescript)
  hljs.registerLanguage('css', css)
  hljs.registerLanguage('bash', javascript)

  app.use(hljsVuePlugin)
}
