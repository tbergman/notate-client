// @flow

import { List } from 'immutable'
import { ADD_TASK, DELETE_TASK } from './actionTypes';
import type { TaskActions } from './actions'
import type { Task } from 'Types'
export type State = {
  list: List<Task>
}

const initialState: State = {
  list: new List()
}

export default (state: State = initialState, action: TaskActions) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        list: state.list.push(action.payload)
      }

    // case ADD_ASYNC_TASK_PENDING:
    //   return state;
    //
    // case ADD_ASYNC_TASK_FULFILLED:
    //   return [...state, Object.assign({}, action.payload)];
    //
    // case ADD_ASYNC_TASK_REJECTED:
    //   return state;

    case DELETE_TASK:
      const index = state.list.indexOf(action.payload);
      return {
        ...state,
        list: state.list.remove(index),
      }

    default:
      return state;
  }
};
