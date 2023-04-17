export interface MarkDownRaw {
  attributes: {
    title: string
    tags: string[]
    time: string
    description: string[]
    route: string
  }
  [propName: string]: any
}

export type MarkDown = MarkDownRaw['attributes']
