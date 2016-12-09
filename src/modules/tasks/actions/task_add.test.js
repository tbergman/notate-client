// @flow

import addTask from './task_add';
import { ADD_TASK } from './types';
import type { Task } from 'Types'

describe('task_add action creator', () => {

  let myDummyTask: Task = {
    id: '123'
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
