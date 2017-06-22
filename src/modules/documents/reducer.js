// @flow

import _ from 'lodash'
import { List } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { DocumentsState } from 'modules/documents'
import { SAVE_QUESTION, EDIT_QUESTION, NEW_QUESTION, REMOVE_QUESTION } from 'modules/documents/actions'
import { DefaultQuestion } from 'modules/types'

export const initialState: DocumentsState = {
  questions: List([]),
  editing: DefaultQuestion(),
}

export default function reducer(
  state: DocumentsState = initialState,
  action: FluxStandardAction): DocumentsState {

  switch (action.type) {
    case SAVE_QUESTION: {
      const question = action.payload

      const index = state.questions.findIndex(x => x.id === question.id)
      const questions = index >= 0
        ? state.questions.update(index, () => question)
        : state.questions.push(question)

      return {
        ...state,
        questions: questions
      }
    }

    case EDIT_QUESTION: {
      const question = state.questions.find(x => x.id === action.payload)
      if (!question) {
        throw new Error(`Question not found: ${action.payload}`)
      }
      return {
        ...state,
        editing: question
      }
    }

    case NEW_QUESTION: {
      const question = DefaultQuestion()
      const questions = state.questions.push(question)

      return {
        ...state,
        editing: question,
        questions: questions,
      }
    }

    case REMOVE_QUESTION: {
      const questionId = action.payload
      const index = state.questions.findIndex(x => x.id === questionId)
      const questions = index >= 0
        ? state.questions.remove(index)
        : state.questions

      return {
        ...state,
        questions: questions
      }
    }

    default:
      return state
  }
}
