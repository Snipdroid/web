import { Params } from '@solidjs/router/dist/types'

interface SearchParams extends Params {
  q: string
  regex: string
}

export type { SearchParams }
