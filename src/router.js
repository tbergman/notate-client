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
import PreviewDocumentPage from 'views/pages/PreviewDocumentPage'

export default (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={DocumentListPage} />

        <Route path="/examples" component={ExamplesPage} />

        <Route path="/document" component={DocumentPage} />

        <Route path="/preview" component={PreviewDocumentPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
)
