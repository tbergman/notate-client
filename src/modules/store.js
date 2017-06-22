// @flow

import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'

import reducers from 'modules/reducers'
import rootSaga from 'modules/sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)
const store = composeEnhancers(
  middleware,
  autoRehydrate(),
)(createStore)(reducers);

sagaMiddleware.run(rootSaga)

persistStore(store, {
  blacklist: ['routing'],
  transforms: [immutableTransform()],
})

export default store
