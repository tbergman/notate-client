// @flow

import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import Router from './router'

import 'react-select/dist/react-select.css'

const configureGlobalStyledComponents = () => {
  return injectGlobal`
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }
  `
}

ReactDOM.render(Router, document.getElementById('root'))
configureGlobalStyledComponents()
