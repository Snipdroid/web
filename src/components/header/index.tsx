import './header.less'

import { Link, useLocation, useSearchParams } from '@solidjs/router'
import { Component, createEffect, createSignal, Match, Switch } from 'solid-js'

import { SearchParams } from '@/type'

import { SearchInput } from '../search-input/search-input'

enum HeaderType {
  Normal,
  Search,
}

const Header: Component = () => {
  const location = useLocation()
  const [headerType, setHeaderType] = createSignal(HeaderType.Normal)
  const [searchParams] = useSearchParams<SearchParams>()

  createEffect(() => {
    switch (location.pathname) {
      case '/search':
        setHeaderType(HeaderType.Search)
        break
      case '/':
      default:
        setHeaderType(HeaderType.Normal)
    }
  })

  return (
    <>
      <header>
        <Switch>
          <Match when={headerType() === HeaderType.Normal}>
            <Login />
          </Match>
          <Match when={headerType() === HeaderType.Search}>
            <div class="header search">
              <Link href="/">
                <span class="title">Snypdroid</span>
              </Link>
              <SearchInput
                type="outlined"
                keywords={searchParams.q}
                regex={searchParams.regex === 'true'}
              />
              <Login />
            </div>
          </Match>
        </Switch>
      </header>
    </>
  )
}

const Login: Component = () => {
  return (
    <>
      <div class="login">
        Login
        <span class="i-material-symbols-account-circle-outline" />
      </div>
    </>
  )
}

export { Header }
