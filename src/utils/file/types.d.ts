export interface MarkDownRaw {
  title: string
  tags: string[]
  date: string
  description: string
  route?: string
  default: Record<string, any>
  meta: Record<string, any>[]
  name?: string
  [propName: string]: any
}

export type MarkDown = MarkDownRaw['frontmatter']
