// @flow

import type { FluxStandardAction } from 'Types'
import type { iCreateQuestion, CreateQuestionState } from 'modules/create'
import { NOTE_CHANGED } from 'modules/notes/actions'

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
      const question: iCreateQuestion = state.question
      const deletedNoteIndex = question.get('notes').findIndex(x => x.id === note.id)
      const notes = question.get('notes').remove(deletedNoteIndex)

      return {
        ...state,
        question: question.set('notes', notes)
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

    case NOTE_CHANGED: {
      const question: iCreateQuestion = state.question;
      let notes = question.get('notes')
      let answers = question.get('answers')
      const note = action.payload

      const noteIndex = notes.findIndex(x => x.id === note.id)
      if (noteIndex !== -1) {
        notes = notes.update(noteIndex, () => note)
      }

      const answerIndex = answers.findIndex(x => x.id === note.id)
      if (answerIndex !== -1) {
        answers = answers.update(answerIndex, () => note)
      }

      return {
        ...state,
        question: question
          .set('notes', notes)
          .set('answers', answers)
      }
    }

    default:
      return state
  }
}
