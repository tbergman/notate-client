// @flow

// import { createSelector } from 'reselect'
import type { AppState, TasksState } from 'Types'

type TasksSelector = (state: AppState) => TasksState
export const tasksSelector:TasksSelector = (state) => state.get('tasks') || []
