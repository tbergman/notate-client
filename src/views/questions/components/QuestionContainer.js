// @flow

import { connect } from 'react-redux'
import Question from './Question'
import { gradeQuestion } from 'modules/grading/actions'
import { selectQuestionGrade } from 'modules/grading/selectors'

export default connect(
  (state, ownProps) => ({
    questionGrade: selectQuestionGrade(state, ownProps.question.id)
  }),
  (dispatch) => ({
    grade: ((question) => dispatch(gradeQuestion(question))),
  })
)(Question)
