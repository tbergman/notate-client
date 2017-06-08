// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Layout from './Layout'

class HomePage extends Component {
  render(): React.Element<any> {
    return (
      <Layout className="app">
        <div className="header">
          Homework Exercises
        </div>

        <QuestionsContainer>
          Work in progress
        </QuestionsContainer>
      </Layout>
    )
  }
}

const QuestionsContainer = styled.div`
  padding: 30px;
`

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(HomePage)
