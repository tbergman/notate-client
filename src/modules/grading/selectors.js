// @flow

import _ from 'lodash'
import { createSelector } from 'reselect'

import { selectGrading } from 'modules/reducers'
import type { AppState } from 'modules/reducers'

export const selectQuestionGrade = (state: AppState, gradingId: string) => {
  return createSelector(
    selectGrading,
    (state) => {
      const questionGrades = state.questionGrades || []

      return _.find(questionGrades, x => x.gradingId === gradingId)
    }
  )(state)
}
