/* @refresh reload */
import 'virtual:uno.css'
import './index.less'

import { render } from 'solid-js/web'

import App from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)
