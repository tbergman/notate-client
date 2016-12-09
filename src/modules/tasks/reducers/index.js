// @flow

import { ADD_TASK, ADD_ASYNC_TASK_PENDING, ADD_ASYNC_TASK_FULFILLED, ADD_ASYNC_TASK_REJECTED, DELETE_TASK } from '../actions/types';
import type { TasksState } from 'Types'
import type { TaskActions } from '../actions'

export default (state: TasksState = [], action: TaskActions) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, Object.assign({}, action.task)];

    case ADD_ASYNC_TASK_PENDING:
      return state;

    case ADD_ASYNC_TASK_FULFILLED:
      return [...state, Object.assign({}, action.payload)];

    case ADD_ASYNC_TASK_REJECTED:
      return state;

    case DELETE_TASK:
      const index = state.indexOf(action.task);
      return state.slice(0, index).concat(state.slice(index+1));

    default:
      return state;
  }
};
