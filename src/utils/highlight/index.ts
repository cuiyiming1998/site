import type { App } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'

export const setupHighlight = (app: App) => {
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('js', javascript)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('ts', typescript)
  hljs.registerLanguage('css', css)

  app.use(hljsVuePlugin)
}
