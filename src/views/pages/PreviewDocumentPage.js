// @flow

import React, { Component } from 'react'
import Layout from './Layout'
import StudentsDocument from 'views/pages/StudentsDocument'

export default class PreviewDocumentPage extends Component {
  render(): React.Element<any> {
    return (
      <Layout title="Preview Document" menu={true}>
        <StudentsDocument  gradingAllowed={true}/>
      </Layout>
    )
  }
}
