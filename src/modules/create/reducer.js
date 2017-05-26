// @flow

import type { FluxStandardAction } from 'Types'
import type { CreateQuestionState } from 'modules/create'

import uuid from 'uuid'
import { fromJS } from 'immutable'

const initialState = {
  question: fromJS({
    bars: 4,
    notes: [],
    answers: [],
  }),
}

export default function reducer(
  state: CreateQuestionState = initialState,
  action: FluxStandardAction): CreateQuestionState {

  switch (action.type) {
    case 'create/PROFESSOR_ADDED_QUESTION_NOTE': {
      const note = action.payload
      note.id = uuid()

      return {
        ...state,
        question: state.question.set('notes', state.question.get('notes').push(note))
      }
    }

    case 'create/PROFESSOR_ADDED_ANSWER_NOTE': {
      const note = action.payload
      note.id = uuid()

      return {
        ...state,
        question: state.question.set('answers', state.question.get('answers').push(note))
      }
    }

    default:
      return state
  }
}
