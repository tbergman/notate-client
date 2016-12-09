// @flow

import { ADD_ASYNC_TASK } from './types'
import type { AddAsyncTask } from './types'
import type { Task } from 'Types'

export type AddAsyncTaskAction = (task: Task) => AddAsyncTask & {payload: Promise<Task>}
const addAsyncTask: AddAsyncTaskAction = (task) => {
  return {
    type: ADD_ASYNC_TASK,
    payload: new Promise(function(resolve: Function, reject: Function) {
      setTimeout(function() {
        resolve(task);
      }, 1000);
    })
  };
};

export default addAsyncTask;
