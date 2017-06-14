// @flow

import _ from 'lodash'
import { createSelector } from 'reselect'

import { selectGrading } from 'modules/reducers'
import type { AppState } from 'modules/reducers'

export const selectGradingById = (state: AppState, gradingId: string) => {
  return createSelector(
    selectGrading,
    (state) => {
      const questionGrades = state.questionGrades.toJS() || []

      return _.find(questionGrades, x => x.gradingId === gradingId)
    }
  )(state)
}

export const selectIncorrectAnswers = (state: AppState) => {
  return createSelector(
    selectGrading,
    (state) => {
      //console.log(state.incorrectAnswers.length);
      return state.incorrectAnswers;
    }
  )(state)
};
// export const selectIncorrectAnswers = createSelector(
//   selectGrading,
//   state => state.incorrectAnswers
// )