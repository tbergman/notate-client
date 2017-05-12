// @flow

import type { FluxStandardAction } from 'Types'
import type { StudentTestState, iQuestion } from 'modules/student-test'
import { fromJS } from 'immutable'
import PitchComparison from 'modules/grading/comparison.pitch'

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
    student: [ ],
    answers: [
      { pitch: PitchComparison.equalOrHigher('B/4'), duration: 'q', position: 0 },
      { pitch: PitchComparison.equalOrHigher('G/5'), duration: 'q', position: 36.88704 },
      { pitch: PitchComparison.equalOrHigher('E/5'), duration: 'q', position: 87.80880499999999 },
      { pitch: PitchComparison.equalOrHigher('G/4'), duration: 'q', position: 172.02337 },
      { pitch: PitchComparison.equalOrHigher('B/5'), duration: 'q', position: 256.237935 },
      { pitch: PitchComparison.equalOrHigher('D/5'), duration: 'q', position: 340.45249999999993 },
      { pitch: PitchComparison.equalOrHigher('B/5'), duration: 'q', position: 469.08242499999994 },
      { pitch: PitchComparison.equalOrHigher('C/5'), duration: 'q', position: 597.71235 }
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
