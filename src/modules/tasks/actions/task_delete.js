// @flow

import { DELETE_TASK } from './types'
import type { Task } from 'Types'
import type { DeleteTask } from './types'

type DeleteTaskActionCreator = (task: Task) => DeleteTask & { task: Task }
const deleteTask: DeleteTaskActionCreator = (task) => {
  return {
    type: DELETE_TASK,
    task
  };
};

export default deleteTask;
