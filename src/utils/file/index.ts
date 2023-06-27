import type { MarkDown, MarkDownRaw } from './types.d'

const sortByTime = (m: MarkDown[]) => {
  function getTime(date: string) {
    return new Date(date).valueOf()
  }

  return m.sort((a, b) => {
    const aTime = getTime(a.time)
    const bTime = getTime(b.time)

    return bTime - aTime
  })
}

export const getAllMarkdowns = async (): Promise<MarkDown[]> => {
  const files = import.meta.glob('../../markdowns/*.md')
  let markdowns: MarkDown[] = []

  for (const key in files) {
    const file = await files[key]() as MarkDownRaw
    const { attributes } = file
    markdowns.push({
      ...attributes,
    })
  }

  markdowns = sortByTime(markdowns)
  return markdowns
}
