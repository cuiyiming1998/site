import type { MarkDown, MarkDownRaw } from './types.d'

const sortByTime = (m: MarkDown[]) => {
  function getTime(date: string) {
    return new Date(date).valueOf()
  }

  return m.sort((a, b) => {
    const aTime = getTime(a.date)
    const bTime = getTime(b.date)

    return bTime - aTime
  })
}

export const getAllMarkdowns = () => {
  const files = import.meta.glob('../../pages/posts/*.md', { eager: true })
  let markdowns: MarkDown[] = []

  for (const key in files) {
    const file = files[key] as MarkDownRaw
    const markdown: MarkDown = {
      ...file,
      name: file.default.__name,
      path: `/posts/${file.default.__name}`,
    }

    markdowns.push(markdown)
  }

  markdowns = sortByTime(markdowns)
  return markdowns
}

export const getAllTags = (): string[] => {
  const markdowns = getAllMarkdowns()
  const allTags = new Set<string>()

  markdowns.forEach((markdown) => {
    if (markdown.tags && Array.isArray(markdown.tags)) {
      markdown.tags.forEach((tag: string) => allTags.add(tag))
    }
  })

  return Array.from(allTags)
}
