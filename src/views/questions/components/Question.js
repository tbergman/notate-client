// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Stave from 'views/music/components/Stave'
import type { Question as QuestionType } from 'modules/student-test'
import { gradeQuestion } from 'modules/grading/actions'
import { selectQuestionGrade } from 'modules/grading/selectors'

type Props = {
  question: QuestionType,
}

class Question extends Component {
  props: Props

  renderGrade() {
    if (this.props.questionGrade.graded) {
      return (
        <StyledGrade correct={this.props.questionGrade.correct}>
          {this.props.questionGrade.correct ? 'CORRECT' : 'FAIL'}
        </StyledGrade>
      )
    }
    return ''
  }

  render(): React.Element<any> {
    return (
      <div className="question">
        <div className="question-index">
          {this.props.question.index}
          <input type="button" onClick={() => this.props.grade(this.props.question)} value="Grade" />
          {this.renderGrade()}
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

const StyledGrade = styled.span`
  color: ${props => props.correct ? 'green' : 'red'};
  padding: 30px;
`

const mapStateToProps = (state, ownProps) => {
  return {
    questionGrade: selectQuestionGrade(state, ownProps.question.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    grade: (question) => dispatch(gradeQuestion(question)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
