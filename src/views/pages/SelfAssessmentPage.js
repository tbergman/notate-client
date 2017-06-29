// @flow

import React, { Component } from 'react'
import Layout from './Layout'
import StudentsDocument from 'views/pages/StudentsDocument'

export default class SelfAssessmentPage extends Component {
  render(): React.Element<any> {
    return (
      <Layout title="Self-Assessment" hideMenu={true}>
        <StudentsDocument gradingAllowed={true}/>
      </Layout>
    )
  }
}
