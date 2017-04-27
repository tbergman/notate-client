// @flow

import { createSelector } from 'reselect'
import { selectToolbox } from '../reducers'

export const selectToolboxes = createSelector(
  selectToolbox,
  toolbox => toolbox
)
