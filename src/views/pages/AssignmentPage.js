// @flow

import React, { Component } from 'react'
import Layout from './Layout'
import StudentsDocument from 'views/pages/StudentsDocument'

export default class Assignment extends Component {
  render(): React.Element<any> {
    return (
      <Layout title="Assignment" hideMenu={true}>
        <StudentsDocument gradingAllowed={false}/>
      </Layout>
    )
  }
}
