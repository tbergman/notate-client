// @flow

import { ADD_TASK } from './types'
import type { AddTask } from './types'
import type { Task } from 'Types'

export type AddTaskAction = (task: Task) => AddTask & {task: Task}
const addTask: AddTaskAction = (task) => {
  return {
    type: ADD_TASK,
    task
  };
};

export default addTask;
