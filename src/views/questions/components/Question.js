// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Stave from 'views/music/components/Stave'
import type { Question as QuestionType } from 'modules/student-test'
import { gradeQuestion } from 'modules/grading/actions'

type Props = {
  question: QuestionType,
}

class Question extends Component {
  props: Props

  render(): React.Element<any> {
    return (
      <div className="question">
        <div className="question-index">
          {this.props.question.index}
          <input type="button" onClick={() => this.props.grade(this.props.question)} value="Grade" />
        </div>
        <div className="question-statement">
          {this.props.question.statement}
        </div>
        <div className="question-notation">
          <Stave notes={this.props.question.notation} question={this.props.question}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    grade: (question) => dispatch(gradeQuestion(question)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
