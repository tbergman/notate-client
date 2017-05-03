// @flow

import { ADD_TASK, DELETE_TASK } from './actionTypes'
import type { AddTask, DeleteTask } from './actionTypes'
import type { Task } from 'Types'

export type AddTaskAction = AddTask & { payload: Task }
export const addTask: (task: Task) => AddTaskAction = (task) => ({
  type: ADD_TASK,
  payload: task
})

export type DeleteTaskAction = DeleteTask & { payload: Task }
export const deleteTask: (task: Task) => DeleteTaskAction = (task) => {
  return {
    type: DELETE_TASK,
    payload: task
  }
}

export type TaskActions =
  | AddTaskAction
  | DeleteTaskAction
