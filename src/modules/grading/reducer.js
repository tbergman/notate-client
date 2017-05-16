// @flow

import type { FluxStandardAction } from 'Types'
import type { QuestionGradesState } from 'modules/grading'
import type { Question } from 'modules/student-test'
import { fromJS } from 'immutable'
import Grader from 'modules/grading/grader'

const initialState: QuestionGradesState = {
  questionGrades: fromJS([])
}

export default function reducer(
  state: QuestionGradesState = initialState,
  action: FluxStandardAction): QuestionGradesState {

  switch (action.type) {
    case 'GRADE_QUESTION': {
      let newQuestionGradesState
      const question: Question = action.payload;

      const gradeResult = {
        questionId: question.id,
        correct: Grader.grade(question),
        graded: true,
      }

      const questionIndex = state.questionGrades.findIndex(x => x.questionId === gradeResult.questionId)
      if (questionIndex >= 0) {
        newQuestionGradesState = state.questionGrades.set(questionIndex, gradeResult)
      } else {
        newQuestionGradesState = state.questionGrades.push(gradeResult)
      }

      return {
        ...state,
        questionGrades: newQuestionGradesState
      }
    }

    default:
      return state
  }
}
