// @flow

import type { FluxStandardAction } from 'Types'
import type { StudentTestState, iQuestion } from 'modules/student-test'
import { fromJS } from 'immutable'
import PitchComparison from 'modules/grading/comparison.pitch'
import uuid from 'uuid'

const initialState = {
  question: fromJS({
    bars: 4,
    notes: [],
    answers: [],
  }),
}

export default function reducer(state = initialState, action: FluxStandardAction) {
  switch (action.type) {
    case 'create/PROFESSOR_ADDED_QUESTION_NOTE': {

      return {
        ...state,
        question: state.question.set('notes', state.question.get('notes').push(action.payload))
      }
    }

    case 'create/PROFESSOR_ADDED_ANSWER_NOTE': {

      return {
        ...state,
        question: state.question.set('answers', state.question.get('answers').push(action.payload))
      }
    }

    default:
      return state
  }
}
