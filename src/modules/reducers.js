// @flow


import { combineReducers } from 'redux';
import { default as tasks, initialState as tasksInitialState } from 'modules/tasks/reducers'
import { default as toolbox, initialState as toolboxInitialState} from 'modules/toolbox/reducers'
import type { State as TasksState } from 'modules/tasks/reducers'
import type { State as ToolboxState } from 'modules/tasks/reducers'


export type AppState = {
    tasks: TasksState,
    toolbox: ToolboxState,
}


const root = combineReducers({
    tasks,
    toolbox,
});

export const initialState = {
    tasks: tasksInitialState,
    toolbox: toolboxInitialState,
}

export default combineReducers({
  tasks
})

export const selectTasks:(state: AppState) => TasksState = (state) => state.tasks
export const selectToolbox:(state: AppState) => ToolboxState = (state) => state.toolbox
