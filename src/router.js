// @flow

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import store from 'modules/store'

const history = syncHistoryWithStore(createBrowserHistory(), store)

import DocumentListPage from 'views/pages/Document/DocumentListPage'
import ExamplesPage from 'views/pages/ExamplesPage'
import DocumentPage from 'views/pages/Document/DocumentPage'
import QuestionsPage from 'views/pages/QuestionsPage'

export default (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={DocumentListPage} />

        <Route path="/examples" component={ExamplesPage} />

        <Route path="/document" component={DocumentPage} />

        <Route path="/questions" component={QuestionsPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
)
