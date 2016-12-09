// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { List, fromJS } from 'immutable'

import root from './modules/reducers'
import App from './App';
import './index.css';

//NOTE: can add initial state and make this more abstracted
const initialState = fromJS({
  tasks: List()
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(root, initialState, composeEnhancers(
  applyMiddleware(
    promiseMiddleware()
  )
))

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
