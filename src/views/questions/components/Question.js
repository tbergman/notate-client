// @flow
import type { Question as QuestionType } from 'modules/student-test'

import React, { Component } from 'react'
import Stave from 'views/music/components/Stave'
import Grader from 'modules/grading/grader'

type Props = {
  question: QuestionType,
}

export default class Question extends Component {
  props: Props

  grade() {
    new Grader().grade(this.props.question.answers, this.props.question.student)
  }

  render(): React.Element<any> {
    return (
      <div className="question">
        <div className="question-index">
          {this.props.question.index}
          <input type="button" onClick={() => this.grade()} value="Grade" />
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
