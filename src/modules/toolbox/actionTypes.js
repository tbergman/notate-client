// @flow

export const SELECT_DURATION = 'toolbox/SELECT_DURATION'
export const SELECT_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'

export const ADD_TASK = 'tasks/ADD_TASK';
export const DELETE_TASK = 'tasks/DELETE_TASK';


export type SelectDuration = { type: 'toolbox/SELECT_DURATION' }
export type SelectAccidental = { type: 'toolbox/SELECT_ACCIDENTAL' }
export type AddTask = { type: 'tasks/ADD_TASK' }
export type AddAsyncTask = { type: 'tasks/ADD_ASYNC_TASK' }
export type AddAsyncTaskPending = { type: 'tasks/ADD_ASYNC_TASK_PENDING' }
export type AddAsyncTaskFulfilled = { type: 'tasks/ADD_ASYNC_TASK_FULFILLED' }
export type AddAsyncTaskRejected = { type: 'tasks/ADD_ASYNC_TASK_REJECTED' }
export type DeleteTask = { type: 'tasks/DELETE_TASK' }

export type TaskActionTypes =
  | AddTask
  | AddAsyncTask
  | AddAsyncTaskPending
  | AddAsyncTaskFulfilled
  | AddAsyncTaskRejected
  | DeleteTask

export type ToolbarActionTypes =
    | SelectDuration
    | SelectAccidental