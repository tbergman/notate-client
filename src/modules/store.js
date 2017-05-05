// @flow

import Immutable from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import { default as reducers, initialState } from './reducers'

const immutableJsLogger = createLogger({
  stateTransformer: (state) => {
    const newState = {}

    Object.keys(state).forEach((x) => {
      if (Immutable.Iterable.isIterable(state[x])) {
        newState[x] = state[x].toJS()
      } else {
        newState[x] = state[x]
      }
    })

    return newState
  },
})

const middleware = applyMiddleware(immutableJsLogger)
const store = createStore(reducers, initialState, middleware)

export default store
