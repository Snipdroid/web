interface AppInfo {
  id: string
  appName: string
  packageName: string
  activityName: string
  request: any[]
  tags: { id: string; name: string }[]
  suggestedName?: string
  count: number
  createdAt?: string
  updatedAt?: string
}

interface AppInfoMeta {
  page: number
  per: number
  total: number
}

export type { AppInfo, AppInfoMeta }
