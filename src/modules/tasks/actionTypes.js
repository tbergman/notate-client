// @flow

export const ADD_TASK = 'tasks/ADD_TASK';
export const ADD_ASYNC_TASK = 'tasks/ADD_ASYNC_TASK';
export const ADD_ASYNC_TASK_PENDING = 'tasks/ADD_ASYNC_TASK_PENDING';
export const ADD_ASYNC_TASK_FULFILLED = 'tasks/ADD_ASYNC_TASK_FULFILLED';
export const ADD_ASYNC_TASK_REJECTED = 'tasks/ADD_ASYNC_TASK_REJECTED';
export const DELETE_TASK = 'tasks/DELETE_TASK';

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
