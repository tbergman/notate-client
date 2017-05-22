// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectQuestions } from 'modules/student-test/selectors'
import Question from 'views/questions/Question'
import Layout from './Layout'

class HomePage extends Component {
  renderQuestions(): React.Element<any> {
    return _.map(this.props.questions, x =>
      <Question className="question" key={x.id} question={x} />
    )
  }

  render(): React.Element<any> {
    return (
      <Layout className="app">
        <div className="header">
          <h2>Homework Exercises</h2>
        </div>

        <QuestionsContainer>
          {this.renderQuestions()}
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
    questions: selectQuestions(state)
  }
}

export default connect(mapStateToProps)(HomePage)
