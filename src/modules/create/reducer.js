// @flow

import type { FluxStandardAction } from 'Types'
import type { iCreateQuestion, CreateQuestionState } from 'modules/create'


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

      const question: iCreateQuestion = state.question
      return {
        ...state,
        question: question.set('notes', question.get('notes').push(action.payload))
      }
    }

    case 'create/PROFESSOR_ADDED_ANSWER_NOTE': {

      const question: iCreateQuestion = state.question
      return {
        ...state,
        question: question.set('answers', question.get('answers').push(action.payload))
      }
    }

    default:
      return state
  }
}
