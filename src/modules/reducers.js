import {combineReducers} from 'redux';
import tasks from './tasks/reducers'

const root = combineReducers({
  tasks
});

export default root;
