import { fromJS } from 'immutable';

const initialState = fromJS({
  questions: [{
    id: 1,
    index: '1.2 a',
    statement: 'Write an ascending leap above each of these notes',
    notation:
      ':q G/4 #99# E/5 #99#  | ' +
      'C/5 #99# #99# #99#    | ' +
      'E/4 #99# #99# #99#    | ' +
      'G/5 #99# #99# #99#    | ' +
      ':w B/4 #99# #99# #99# | ' +
      'A/5 #99# #99# #99#    | ' +
      'A/4 #99# #99# #99#  =||',
  }, {
    id: 2,
    index: '1.2 b',
    statement: 'Write an descending step below each of these notes',
    notation:
      ':q C/5 #99# B/4 #99#  | ' +
      'A/5 #99# #99# #99#    | ' +
      'D/4 #99# #99# #99#    | ' +
      'C/4 #99# #99# #99#    | ' +
      ':w F/4 #99# #99# #99# | ' +
      'B/5 #99# #99# #99#    | ' +
      'E/4 #99# #99# #99#  =||',
  }],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
