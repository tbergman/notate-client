// @flow

import { fromJS } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { QuestionGradesState } from 'modules/grading'
import { GRADE_LAYERS, CLEAR_GRADING } from 'modules/grading/actions'
import Grader from 'modules/grading/grader.reporter'

export const initialState: QuestionGradesState = {
  questionGrades: fromJS([]),
  emptyAnswers: fromJS([]),
  incorrectAnswers: fromJS([]),
}

export default function reducer(
  state: QuestionGradesState = initialState,
  action: FluxStandardAction): QuestionGradesState {

  switch (action.type) {
    case GRADE_LAYERS: {
      let newQuestionGradesState
      const gradingId = action.payload.gradingId
      const answers = action.payload.answers
      const student = action.payload.student

      const result = Grader.grade(answers,student);

      const gradeResult = {
        gradingId: gradingId,
        correct: result.correct,
      }

      const questionIndex = state.questionGrades.findIndex(x => x.gradingId === gradeResult.gradingId)
      if (questionIndex >= 0) {
        newQuestionGradesState = state.questionGrades.update(questionIndex, () => gradeResult)
      } else {
        newQuestionGradesState = state.questionGrades.push(gradeResult)
      }


      return {
        ...state,
        questionGrades: newQuestionGradesState,
        incorrectAnswers: result.incorrectAnswers
      }
    }

    case CLEAR_GRADING: {
      const gradingId = action.payload

      const index = state.questionGrades.findIndex(x => x.gradingId === gradingId)
      const questionGrades = state.questionGrades.remove(index)

      return {
        ...state,
        questionGrades: questionGrades,
        emptyAnswers: fromJS([]),
        incorrectAnswers: fromJS([]),
      }
    }

    default:
      return state
  }
}
