// @flow

import type { FluxStandardAction } from 'Types'
import type { iCreateQuestion, CreateQuestionState } from 'modules/create'


import uuid from 'uuid'
import { fromJS } from 'immutable'

export const initialState = {
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

      const question: iCreateQuestion = state.question
      return {
        ...state,
        question: question.set('notes', question.get('notes').push(note))
      }
    }

    case 'create/PROFESSOR_ERASED_QUESTION_NOTE': {
      const note = action.payload
      const deletedNoteIndex = state.question.get('notes').findIndex(x => x.id === note.id)
      const notes = state.question.get('notes').remove(deletedNoteIndex)

      return {
        ...state,
        question: state.question.set('notes', notes)
      }
    }

    case 'create/PROFESSOR_ADDED_ANSWER_NOTE': {
      const note = action.payload
      note.id = uuid()

      const question: iCreateQuestion = state.question
      return {
        ...state,
        question: question.set('answers', question.get('answers').push(note))
      }
    }

    default:
      return state
  }
}
