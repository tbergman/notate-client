import addTask from './task_add';
import { ADD_TASK } from './types';

describe('task_add action creator', () => {

  let myDummyTask = {
    id: 123
  };

  it('creates an ADD_TASK action', () => {
    expect(addTask(myDummyTask)).toEqual(
      {
        type: ADD_TASK,
        task: myDummyTask
      }
    )
  })

});
