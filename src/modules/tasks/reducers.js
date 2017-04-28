// @flow

import { List } from 'immutable';
import { ADD_TASK, DELETE_TASK } from './actionTypes';
import type { TaskActions } from './actions';
import type { Task } from 'Types';
export type State = {
  list: List<Task>
};

export const initialState: State = {
  list: new List()
};

export default (state: State = initialState, action: TaskActions) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        list: state.list.push(action.payload)
      }
    }

    case DELETE_TASK: {
      const index = state.list.indexOf(action.payload);
      return {
        ...state,
        list: state.list.remove(index),
      }
    }

    default:
      return state;
  }
};
