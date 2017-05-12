// @flow

import type { FluxStandardAction } from 'Types'
import type { StudentTestState, Question } from 'modules/student-test'
import { fromJS } from 'immutable'
import PitchComparison from 'modules/grading/comparison.pitch'
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
        grade: new Grader().grade(question)
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
