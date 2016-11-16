// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import root from './modules/reducers'
import App from './App';
import './index.css';

//NOTE: can add initial state and make this more abstracted

let composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

export const store = composeStoreWithMiddleware(root, {},
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

//enable HMR
// if (module.hot) {
//   module.hot.accept()
// }
