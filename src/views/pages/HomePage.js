// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectQuestions } from 'modules/student-test/selectors'
import Question from 'views/questions/components/Question'

class HomePage extends Component {
  renderQuestions(): React.Element<any> {
    return _.map(this.props.questions, x =>
      <Question key={x.id} question={x} />
    )
  }

  render(): React.Element<any> {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Homework Exercises</h2>
        </div>

        {this.renderQuestions()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: selectQuestions(state)
  }
}

export default connect(mapStateToProps)(HomePage);
