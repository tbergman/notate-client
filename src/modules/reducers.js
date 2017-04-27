// @flow

import { combineReducers } from 'redux';
import { default as tasks, initialState as tasksInitialState } from './tasks/reducers'
import type { State as TasksState } from './tasks/reducers'

export type AppState = {
  tasks: TasksState,
}

const root = combineReducers({
  tasks
});

export const initialState = {
  tasks: tasksInitialState,
}

export default root;

export const selectTasks:(state: AppState) => TasksState = (state) => state.tasks
