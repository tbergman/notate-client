import { DELETE_TASK } from './types'

const deleteTask = (task) => {
  return {
    type: DELETE_TASK,
    task
  };
};

export default deleteTask;
