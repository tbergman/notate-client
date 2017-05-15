// @flow

import { createSelector } from 'reselect'

import { selectGrading } from 'modules/reducers'

export const selectQuestionGrade = (state, questionId) => {
  return createSelector(
    selectGrading,
    (state) => {
      const questionGrades = (state.questionGrades && state.questionGrades.toJS()) || []
      return questionGrades.find(x => x.questionId === questionId) ||
        {
          questionId: questionId,
          correct: false,
          graded: false,
        }
    }
  )(state)
}
