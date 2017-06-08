// @flow
import { Iterable } from 'immutable'
import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducers from 'modules/reducers'
import rootSaga from 'modules/sagas'

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

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(immutableJsLogger, sagaMiddleware)
const store = composeEnhancers(
  middleware,
)(createStore)(reducers);

sagaMiddleware.run(rootSaga)

export default store
