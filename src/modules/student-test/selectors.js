// @flow

import { createSelector } from 'reselect'

import { selectStudentTest } from 'modules/reducers'

export const selectQuestions = createSelector(
  selectStudentTest,
  state => {
    return (state.questions && state.questions.toJS()) || []
  }
)
