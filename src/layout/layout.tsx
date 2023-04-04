import './layout.less'

import { mergeProps, ParentComponent, Show } from 'solid-js'

import { AppDetail } from '@/components/app-detail'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Notification } from '@/components/notification'

type LayoutProps = {
  hasHeader?: boolean
  hasFooter?: boolean
  fullContainer?: boolean
}

const Layout: ParentComponent<LayoutProps> = (props) => {
  const _props = mergeProps(
    { hasHeader: true, hasFooter: true, fullContainer: false },
    props
  )

  return (
    <>
      <Show when={_props.hasHeader}>
        <Header />
      </Show>
      <div class="layout-container" classList={{ full: _props.fullContainer }}>
        {_props.children}
      </div>
      <Show when={_props.hasFooter}>
        <Footer />
      </Show>
      <AppDetail />
      <Notification />
    </>
  )
}

export default Layout
