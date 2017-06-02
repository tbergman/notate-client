// @flow

import _ from 'lodash'
import { createSelector } from 'reselect'

import { selectNotes } from 'modules/reducers'
import type { AppState } from 'modules/reducers'

export const selectStaveNotes = (state: AppState, staveLayerId: string) => {
  return createSelector(
    selectNotes,
    (state) => {
      const allNotes = state.notes.toJS() || []

      return _.filter(allNotes, x => x.staveLayerId === staveLayerId)
    }
  )(state)
}
