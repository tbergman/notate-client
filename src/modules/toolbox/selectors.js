// @flow

import { createSelector } from 'reselect'
import { selectToolbox } from '../reducers'

export const selectSelectedAccidental = createSelector(
  selectToolbox,
  toolbox => toolbox.selectedAccidental
)
