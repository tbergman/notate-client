import tasks from './index'
import { ADD_TASK, DELETE_TASK } from '../actions/types'

describe('Reducer::Tasks', () => {

  let myDummyTask = {
    id: 123
  };

  it('is an empty array by default', () => {
    let action = { type: 'not_a_real_action_type' };
    let currentState = undefined;
    let newState = tasks(currentState, action);
    expect(newState).toEqual([]);
  });

  describe('ADD_TASK', () => {
    let action = { type: ADD_TASK, task: myDummyTask };
    it('should add a task to the stack', () => {
      let currentState = undefined;
      let newState = tasks(currentState, action);
      expect(newState).toEqual([myDummyTask]);
    });
    it('should treat current state as immutable', () => {
      let currentState = undefined;
      tasks(currentState, action);
      expect(currentState).toEqual(undefined);
    });
  });

  describe('DELETE_TASK', () => {
    let action = { type: DELETE_TASK, task: myDummyTask };
    it('should remove a task from the stack', () => {
      let currentState = [myDummyTask];
      let newState = tasks(currentState, action);
      expect(newState).toEqual([]);
    });
    it('should treat current state as immutable', () => {
      let currentState = [myDummyTask];
      tasks(currentState, action);
      expect(currentState).toEqual([myDummyTask]);
    });
  });

});
