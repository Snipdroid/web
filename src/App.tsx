import { Route, Router, Routes } from '@solidjs/router'
import { Component } from 'solid-js'

import { Home } from './view/home/home'
import { Search } from './view/search/search'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

const App: Component = () => {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
    </>
  )
}

export default App
