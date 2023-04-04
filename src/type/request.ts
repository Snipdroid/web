interface AppInfoRequest {
  q: string
  regex?: string
  page: number
  per: number
}

interface AppIconRequest {
  type?: 'local' | 'coolapk' | 'play' | 'mi'
  packageName: string
}

export type { AppIconRequest, AppInfoRequest }
