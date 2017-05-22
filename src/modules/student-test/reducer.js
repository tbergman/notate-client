// @flow

import type { FluxStandardAction } from 'Types'
import type { StudentTestState, iQuestion } from 'modules/student-test'
import { fromJS } from 'immutable'
import PitchComparison from 'modules/grading/comparison.pitch'
import uuid from 'uuid'

const initialState: StudentTestState = {
  questions: fromJS([{
    id: uuid(),
    index: '1.2 a',
    statement: 'Write an ascending leap above each of these notes',
    bars: 7,
    question: [
      { pitch: 'G/4', duration: 'q', position: 0 },
      { pitch: 'E/5', duration: 'q', position: 22.43211428571429 },
      { pitch: 'C/5', duration: 'q', position: 67.29634285714289 },
      { pitch: 'E/4', duration: 'q', position: 171.14992678571434 },
      { pitch: 'G/5', duration: 'q', position: 275.0035107142859 },
      { pitch: 'B/4', duration: 'w', position: 378.85709464285736 },
      { pitch: 'A/5', duration: 'w', position: 482.71067857142873 },
      { pitch: 'A/4', duration: 'w', position: 586.5642625000002 },
    ],
    answers: [
      { pitch: PitchComparison.equalOrHigher('B/4'), duration: 'q', position: 0 },
      { pitch: PitchComparison.equalOrHigher('G/5'), duration: 'q', position: 22.43211428571429 },
      { pitch: PitchComparison.equalOrHigher('E/5'), duration: 'q', position: 67.29634285714289 },
      { pitch: PitchComparison.equalOrHigher('G/4'), duration: 'q', position: 171.14992678571434 },
      { pitch: PitchComparison.equalOrHigher('B/5'), duration: 'q', position: 275.0035107142859 },
      { pitch: PitchComparison.equalOrHigher('D/5'), duration: 'q', position: 378.85709464285736 },
      { pitch: PitchComparison.equalOrHigher('C/6'), duration: 'q', position: 482.71067857142873 },
      { pitch: PitchComparison.equalOrHigher('C/5'), duration: 'q', position: 586.5642625000002 },
    ],
    options: {
      maxNotesPerMeasure: 1
    },
    student: [ ],
  }, {
    id: uuid(),
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
    answers: [
      { pitch: PitchComparison.equal('B/4'), duration: 'q', position: 0 },
      { pitch: PitchComparison.equal('A/4'), duration: 'q', position: 36.88704 },
      { pitch: PitchComparison.equal('G/5'), duration: 'q', position: 87.80880499999999 },
      { pitch: PitchComparison.equal('C/4'), duration: 'q', position: 172.02337 },
      { pitch: PitchComparison.equal('B/3'), duration: 'q', position: 256.237935 },
      { pitch: PitchComparison.equal('E/4'), duration: 'q', position: 340.45249999999993 },
      { pitch: PitchComparison.equal('A/5'), duration: 'q', position: 469.08242499999994 },
      { pitch: PitchComparison.equal('D/4'), duration: 'q', position: 597.71235 },
    ],
    options: {
      maxNotesPerMeasure: 1
    },
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
