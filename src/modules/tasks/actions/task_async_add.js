import { ADD_ASYNC_TASK } from './types'

const addAsyncTask = (task) => {
  return {
    type: ADD_ASYNC_TASK,
    payload: new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(task);
      }, 1000);
    })
  };
};

export default addAsyncTask;
