import { get } from '@/net'
import { AppIconRequest, AppInfoRequest } from '@/type'

let baseUrl = ''
const mode = import.meta.env.MODE

if (mode === 'development') {
  baseUrl = '/api'
} else {
  baseUrl = import.meta.env.VITE_API
}

const getAppInfoList = <T>(params: AppInfoRequest) => {
  return get<T>(`${baseUrl}/api/appinfo`, { params })
}

const getAppIcon = ({ type = 'local', packageName }: AppIconRequest) => {
  return get<Response>(`${baseUrl}/api/icon/${type}`, {
    params: { packageName },
    json: false,
  })
}

export { getAppIcon, getAppInfoList }
