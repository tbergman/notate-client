// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { gradeQuestion } from 'modules/grading/actions'
import { selectQuestionGrade } from 'modules/grading/selectors'
import StudentStave from 'views/music/StudentStave'
import type { Question as QuestionType } from 'modules/student-test'
import type { QuestionGrade } from 'modules/grading'
import type { Dispatch } from 'redux'

type StateProps = {
  questionGrade: QuestionGrade,
}
type DispatchProps = {
  grade: Function
}
type OwnProps = {
  question: QuestionType,
}
type Props = StateProps & DispatchProps & OwnProps

export class QuestionUnconnected extends Component {
  props: Props

  renderGrade(): React.Element<any>|null {
    if (this.props.questionGrade.graded) {
      return (
        <StyledGrade correct={this.props.questionGrade.correct}>
          {this.props.questionGrade.correct ? 'CORRECT' : 'FAIL'}
        </StyledGrade>
      )
    }
    return null
  }

  render(): React.Element<any> {
    return (
      <div className="question">
        <div className="question-index">
          {this.props.question.index}
          <input type="button" onClick={() => this.props.grade(this.props.question)} value="Grade" />
        </div>
        <div className="question-grade">
          {this.renderGrade()}
        </div>
        <div className="question-statement">
          {this.props.question.statement}
        </div>
        <div className="question-notation">
          <StudentStave notes={this.props.question.notation} question={this.props.question}/>
        </div>
      </div>
    )
  }
}

const StyledGrade = styled.span`
  color: ${props => props.correct ? 'green' : 'red'};
`

const mapStateToProps = (state, ownProps) => {
  return {
    questionGrade: selectQuestionGrade(state, ownProps.question.id)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    grade: ((question) => dispatch(gradeQuestion(question))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionUnconnected)
