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
