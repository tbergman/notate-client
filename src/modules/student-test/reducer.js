// @flow
import type { FluxStandardAction } from 'Types'
import type { StudentTestState, iQuestion } from 'modules/student-test'
import { fromJS } from 'immutable'

const initialState: StudentTestState = {
  questions: fromJS([{
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
    student: [
      { pitch: 'A/4', duration: 'q', position: 300 }
    ],
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
    student: [ ],
  }]),
}

export default function reducer(
  state: StudentTestState = initialState,
  action: FluxStandardAction): StudentTestState {

  switch (action.type) {
    case 'STUDENT_ADDED_NOTE': {
      const question: ?iQuestion = state.questions.find((x: iQuestion) => x.get('id') === action.payload.questionId)
      if (!question) return state

      const questionIndex = state.questions.findIndex(x => x === question)
      const newQuestion = question.updateIn(['student'], list => list.push(action.payload))
      return {
        ...state,
        questions: state.questions.set(questionIndex, newQuestion)
      }
    }

    default:
      return state
  }
}
