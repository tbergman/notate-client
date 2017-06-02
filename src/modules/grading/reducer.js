// @flow

import { fromJS } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { QuestionGradesState } from 'modules/grading'
import type { Question } from 'modules/student-test'
import Grader from 'modules/grading/grader'

const initialState: QuestionGradesState = {
  questionGrades: fromJS([])
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
        newQuestionGradesState = state.questionGrades.update(questionIndex, () => gradeResult)
      } else {
        newQuestionGradesState = state.questionGrades.push(gradeResult)
      }

      return {
        ...state,
        questionGrades: newQuestionGradesState
      }
    }

    case 'CLEAR_GRADING': {
      const gradingId = action.payload

      const index = state.questionGrades.findIndex(x => x.gradingId === gradingId)
      const questionGrades = state.questionGrades.remove(index)

      return {
        ...state,
        questionGrades: questionGrades
      }
    }

    default:
      return state
  }
}
