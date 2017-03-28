// @flow

import { createSelector } from 'reselect'
import { selectTasks } from '../reducers'

export const selectTaskList = createSelector(
  selectTasks,
  tasks => tasks.list
)
