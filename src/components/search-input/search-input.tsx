import './search-input.less'

import { useNavigate } from '@solidjs/router'
import { Component, createEffect, createSignal, mergeProps } from 'solid-js'

import { notification } from '../notification'

interface SearchInputProps {
  type?: 'fill' | 'outlined'
  keywords?: string
  regex?: boolean
}

const SearchInput: Component<SearchInputProps> = (props) => {
  const _props = mergeProps({ type: 'fill' }, props)

  const [isUseRegex, setIsUseRegex] = createSignal(false)
  const [searchKeyWord, setSearchKeyWord] = createSignal('')
  const navigate = useNavigate()

  createEffect(() => {
    if (_props.regex) {
      setIsUseRegex(_props.regex)
    }
    if (_props.keywords) {
      setSearchKeyWord(_props.keywords)
    }
  })

  createEffect(() => {
    if (isUseRegex()) {
      notification('Regular expression search is enable')
    }
  })

  const onSearch = (event: Event) => {
    event.preventDefault()
    navigate(`/search?q=${searchKeyWord()}&regex=${isUseRegex()}`)
  }

  return (
    <>
      <form
        class={`input-line ${_props.type}`}
        onSubmit={(event) => onSearch(event)}
      >
        <input
          value={searchKeyWord()}
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              setSearchKeyWord(e.target.value)
            }
          }}
          type="text"
          placeholder="Search apps..."
        />
        <button
          type="button"
          onClick={() => setIsUseRegex(!isUseRegex())}
          class="regex"
          classList={{ active: isUseRegex() }}
        >
          <span class="i-material-symbols-regular-expression" />
        </button>
        <button type="submit" class="search">
          <span class="i-material-symbols-search" />
        </button>
      </form>
    </>
  )
}

export { SearchInput }
