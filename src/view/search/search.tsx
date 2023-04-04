import './search.less'

import { useSearchParams } from '@solidjs/router'
import { createEffect, createSignal, For, Show } from 'solid-js'

import { getAppInfoList } from '@/api'
import { showAppDetail } from '@/components/app-detail'
import { CheckBox } from '@/components/checkbox'
import { PageIndicator } from '@/components/page-indicator'
import { useNetworkPages } from '@/hook/use-network-pages'
import Layout from '@/layout/layout'
import { SearchParams } from '@/type'
import { AppInfo, AppInfoMeta } from '@/type/type'

const Search = () => {
  const [lastSearchKeyWord, setLastSearchKeyWord] = createSignal('')
  const [searchParams] = useSearchParams<SearchParams>()

  createEffect(() => {
    setLastSearchKeyWord(searchParams.q)
    start()
  })

  const {
    start,
    currPageData,
    currPageIndex,
    totalPages,
    prePage,
    nextPage,
    jumpTo,
  } = useNetworkPages<Array<AppInfo>>({
    firstFetch: async () => {
      const data = await getAppInfoList<{
        items: Array<AppInfo>
        metadata: AppInfoMeta
      }>({
        q: lastSearchKeyWord(),
        page: 1,
        per: 10,
      })
      return { data: data.items, total: data.metadata.total }
    },
    onPageChange: async (page) => {
      const data = await getAppInfoList<{
        items: Array<AppInfo>
        metadata: AppInfoMeta
      }>({
        q: lastSearchKeyWord(),
        page,
        per: 10,
      })
      return data.items
    },
  })

  return (
    <>
      <Layout hasFooter={false}>
        <table class="data">
          <thead>
            <tr>
              <th />
              <th>
                <span>Name</span>
              </th>
              <th>
                <span>Package Name</span>
              </th>
              <th>
                <span>Activity Name</span>
              </th>
              <th>
                <span>Popularity</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={currPageData()}>
              {(item) => (
                <tr onClick={() => showAppDetail(item)}>
                  <td>
                    <CheckBox
                      id={item.id}
                      onCheck={(e) => {
                        console.log(e, item.appName)
                      }}
                    />
                  </td>
                  <td>
                    <span>{item.appName}</span>
                  </td>
                  <td>
                    <span>{item.packageName}</span>
                  </td>
                  <td>
                    <span>{item.activityName}</span>
                  </td>
                  <td>
                    <span>{item.count}</span>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <Show when={currPageData()?.length ?? 0 > 0}>
          <PageIndicator
            count={totalPages()}
            currPage={currPageIndex()}
            onPrePage={() => prePage()}
            onNextPage={() => nextPage()}
            onSelectIndex={(index) => jumpTo(index)}
          />
        </Show>
      </Layout>
    </>
  )
}

export { Search }
