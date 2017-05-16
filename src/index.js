// @flow

import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

import Router from './router'

ReactDOM.render(Router, document.getElementById('root'))

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`
