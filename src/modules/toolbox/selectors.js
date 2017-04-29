// @flow

import { createSelector } from 'reselect'
import { selectToolbox } from 'modules/reducers'

export const selectSelectedAccidental = createSelector(
  selectToolbox,
  toolbox => toolbox.selectedAccidental
)

export const selectSelectedDuration = createSelector(
    selectToolbox,
    toolbox => toolbox.selectedDuration
)
