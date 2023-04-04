import './page-indicator.less'

const PageIndicator = (props: {
  count: number
  currPage: number
  onPrePage: () => void
  onNextPage: () => void
  onSelectIndex: (index: number) => void
}) => {
  return (
    <>
      <div class="page-indicator">
        <button onClick={() => props.onPrePage()}>
          <span class="i-material-symbols-chevron-left btn">chevron_left</span>
        </button>

        <span class="content">{props.currPage}</span>
        <span class="content">/</span>
        <span class="content">{props.count}</span>
        <button onClick={() => props.onNextPage()}>
          <span class="i-material-symbols-chevron-right btn">
            chevron_right
          </span>
        </button>
      </div>
    </>
  )
}

export { PageIndicator }
