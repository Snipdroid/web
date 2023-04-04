import { createEffect, createSignal } from 'solid-js'

interface UseNetworkPagesParmars<D> {
  firstFetch?: () => Promise<{ data: D; total: number }>
  onPageChange?: (index: number) => Promise<D>
  pageSize?: number
}

const useNetworkPages = <D>({
  firstFetch,
  onPageChange,
  pageSize = 10,
}: UseNetworkPagesParmars<D> = {}) => {
  const [currPageData, setCurrPageData] = createSignal<D>()
  const [currPageIndex, setCurrPageIndex] = createSignal<number>(1)
  const [totalPages, setTotalPages] = createSignal<number>(1)
  const [loading, setLoading] = createSignal<boolean>(false)
  const [startVal, setStart] = createSignal<boolean>(false)

  createEffect(() => {
    if (!startVal()) return
    setLoading(true)
    firstFetch?.().then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCurrPageData(res.data as any)
      setTotalPages(Math.ceil(res.total / pageSize))
      setLoading(false)
    })
  })

  const prePage = () => {
    if (currPageIndex() > 1) {
      setCurrPageIndex(currPageIndex() - 1)
    }
  }

  const nextPage = () => {
    if (currPageIndex() < totalPages()) {
      setCurrPageIndex(currPageIndex() + 1)
    }
  }

  const jumpTo = (index: number) => {
    if (index >= 1 && index <= totalPages()) {
      setCurrPageIndex(index)
    }
  }

  const start = () => {
    setStart(true)
  }

  createEffect(() => {
    if (!startVal()) return
    pageChange(currPageIndex())
  })

  const pageChange = (index: number) => {
    setLoading(true)
    onPageChange?.(index).then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCurrPageData(res as any)
      setLoading(false)
    })
  }

  return {
    start,
    currPageData,
    currPageIndex,
    totalPages,
    prePage,
    nextPage,
    jumpTo,
    loading,
  }
}

export { useNetworkPages }
