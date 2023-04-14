import type { MarkDown, MarkDownRaw } from './types.d'

export const getAllMarkdowns = async (): Promise<MarkDown[]> => {
  const files = import.meta.glob('../../markdowns/*.md')
  const markdowns: MarkDown[] = []

  for (const key in files) {
    const file = await files[key]() as MarkDownRaw
    const { attributes } = file
    markdowns.push({
      ...attributes,
    })
  }

  return markdowns
}
