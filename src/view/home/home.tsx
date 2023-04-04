import './home.less'

import { Component } from 'solid-js'

import { SearchInput } from '@/components/search-input/search-input'
import Layout from '@/layout/layout'

const Home: Component = () => {
  return (
    <>
      <Layout fullContainer={true}>
        <div id="home">
          <div class="search">
            <h1 class="title">Snypdriod</h1>
            <SearchInput />
          </div>
        </div>
      </Layout>
    </>
  )
}

export { Home }
