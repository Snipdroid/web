import './app-detail.less'

import {
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  Show,
} from 'solid-js'
import { transliterate as tr } from 'transliteration'

import { getAppIcon } from '@/api'
import { AppInfo } from '@/type/type'

import { notification } from '../notification'

const showAppDetail = (appInfo: AppInfo) => {
  if (!show()) {
    setShow(true)
    setAppDetail(appInfo)
  }
}

const hideAppDetail = () => {
  setShow(false)
  setAppDetail(null)
}

const [show, setShow] = createSignal(false)
const [appDetail, setAppDetail] = createSignal<AppInfo | null>(null)

const AppDetail: Component = () => {
  const [iconUrl, setIconUrl] = createSignal('')
  const [romanizationAppName, setRomanizationAppName] = createSignal('')
  const [customAppName, setCustomAppName] = createSignal('')

  createEffect(() => {
    if (!appDetail()?.packageName) {
      return
    }
    getAppIcon({
      packageName: appDetail()?.packageName ?? '',
    })
      .then((res) => res.blob())
      .then((data) => {
        const url = URL.createObjectURL(data)
        setIconUrl(url)
      })

    onCleanup(() => {
      setIconUrl('')
    })
  })

  createEffect(() => {
    console.log(customAppName())
  })

  createEffect(() => {
    if (!appDetail()?.appName) {
      return
    }

    const appName = () => customAppName() || (appDetail()?.appName ?? '')
    setRomanizationAppName(normalRomanization(appName()))

    onCleanup(() => {
      setRomanizationAppName('')
    })
  })

  const normalRomanization = (content: string) => {
    return tr(content)
      .replace(/ /g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .toLowerCase()
  }

  const copy = (content: string | undefined, type: string) => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(content ?? '')
      notification(`${type} copied to clipboard!`)
    }
  }

  /* eslint-disable indent */
  const appfilter = (appInfo: AppInfo | null): string => {
    return `
    <!-- ${appInfo?.appName} -->
    <item component="ComponentInfo{${appInfo?.packageName}/${
      appInfo?.activityName
    }}" drawable="${romanizationAppName()}" />`
  }

  return (
    <>
      <div
        onClick={() => hideAppDetail()}
        class="app-detail-mask"
        classList={{ show: show() }}
      />
      <div class="app-detail-modal" classList={{ show: show() }}>
        <div class="app-detail">
          <span class="app-name">{appDetail()?.appName}</span>
          <div class="app-icon">
            <Show when={iconUrl()} fallback={<p>Loading</p>}>
              <img src={iconUrl()} alt={appDetail()?.appName} />
            </Show>
          </div>
          <Show when={appDetail()?.tags.length ?? 0 > 0}>
            <div class="tags-box">
              <span class="box-title">Tags</span>
              <div class="tags">
                <For each={appDetail()?.tags}>
                  {(tag) => <span class="tag-item">{tag.name}</span>}
                </For>
              </div>
            </div>
          </Show>

          <div class="package-name-box">
            <div class="box-title-warp">
              <span class="box-title">Package Name</span>
              <span
                onClick={() => copy(appDetail()?.packageName, 'Package Name')}
                class="i-material-symbols-content-copy-outline icon"
              >
                content_copy
              </span>
            </div>
            <span class="box-content">{appDetail()?.packageName}</span>
          </div>
          <div class="activity-name-box">
            <div class="box-title-warp">
              <span class="box-title">Main Activity</span>
              <span
                onClick={() => copy(appDetail()?.activityName, 'Main Activity')}
                class="i-material-symbols-content-copy-outline icon"
              >
                content_copy
              </span>
            </div>
            <span class="box-content">{appDetail()?.activityName}</span>
          </div>
          <div class="xml-box">
            <input
              placeholder={appDetail()?.appName}
              value={customAppName()}
              type="text"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  setCustomAppName(e.target.value)
                }
              }}
            />
            <span class="custom-app-name">
              <span class="i-material-symbols-keyboard-return return" />
              {romanizationAppName()}
            </span>
            <div class="copy-xml-item">
              <span>Appfilter.xml</span>
              <span
                onClick={() => copy(appfilter(appDetail()), 'Appfilter.xml')}
                class="i-material-symbols-content-copy-outline icon"
              >
                content_copy
              </span>
            </div>
            <div class="copy-xml-item">
              <span>Drawable.xml</span>
              <span
                onClick={() => copy(appDetail()?.activityName, 'Drawable.xml')}
                class="i-material-symbols-content-copy-outline icon"
              >
                content_copy
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { AppDetail, showAppDetail }
