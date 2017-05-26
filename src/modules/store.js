// @flow
import { Iterable } from 'immutable'
import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'

import { default as reducers } from 'modules/reducers'

//NOTE: can add initial state and make this more abstracted

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const immutableJsLogger = createLogger({
  stateTransformer: (state) => {
    const newState = {}

    Object.keys(state).forEach((x) => {
      if (Iterable.isIterable(state[x])) {
        newState[x] = state[x].toJS()
      } else {
        newState[x] = state[x]
      }
    })

    return newState
  },
})

const middleware = applyMiddleware(immutableJsLogger)
const store = composeEnhancers(
  middleware
)(createStore)(reducers);

export default store
