// @flow

import type { FluxStandardAction } from 'Types'
import type { QuestionGradesState } from 'modules/grading'
import type { Question } from 'modules/student-test'
import Grader from 'modules/grading/grader'

const initialState: QuestionGradesState = {
  questionGrades: []
}

export default function reducer(
  state: QuestionGradesState = initialState,
  action: FluxStandardAction): QuestionGradesState {

  switch (action.type) {
    case 'GRADE_LAYERS': {
      let newQuestionGradesState
      const gradingId = action.payload.gradingId
      const answers = action.payload.answers
      const student = action.payload.student

      const gradeResult = {
        gradingId: gradingId,
        correct: Grader.grade(answers, student),
      }

      const questionIndex = state.questionGrades.findIndex(x => x.gradingId === gradeResult.gradingId)
      if (questionIndex >= 0) {
        state.questionGrades[questionIndex] = gradeResult
      } else {
        state.questionGrades.push(gradeResult)
      }

      return {
        ...state,
        questionGrades: state.questionGrades
      }
    }

    default:
      return state
  }
}
