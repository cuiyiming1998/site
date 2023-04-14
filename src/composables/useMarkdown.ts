import hljs from 'highlight.js'

export const useMarkdown = async (fileName: string) => {
  const modules = import.meta.glob('../markdowns/*.md')

  onMounted(() => {
    const el = document.querySelector('#article')
    const blocks = el!.querySelectorAll('pre code')
    blocks.forEach((block: any) => {
      hljs.highlightElement(block)
    })
  })

  try {
    const { html } = await modules[`../markdowns/${fileName}.md`]() as any

    const h = computed(() => {
      return html
    })

    return { h }
  }
  catch (e) {
    return {
      h: '',
    }
  }
}
