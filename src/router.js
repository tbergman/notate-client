// @flow

import React from 'react'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import store from 'modules/store'

const history = syncHistoryWithStore(createBrowserHistory(), store)

import HomePage from 'views/pages/HomePage'
import ExamplesPage from 'views/pages/ExamplesPage'
import CreateQuestionPage from 'views/pages/CreateQuestionPage'

export default (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={HomePage} />

        <Route path="/examples" component={ExamplesPage} />

        <Route path="/create" component={CreateQuestionPage} />
      </div>
    </Router>
  </Provider>
)
