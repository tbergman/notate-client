import { ADD_TASK } from './types'

const addTask = (task) => {
  return {
    type: ADD_TASK,
    task
  };
};

export default addTask;
