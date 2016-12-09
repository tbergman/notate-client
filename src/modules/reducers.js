// @flow

import { combineReducers } from 'redux-immutable';
import tasks from './tasks/reducers'

const root = combineReducers({
  tasks
});

export default root;
