// @flow

import { List } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { DocumentsState } from 'modules/documents'
import { ADD_QUESTION } from 'modules/documents/actions'

export const initialState: DocumentsState = {
  questions: List([])
}

export default function reducer(
  state: CreateState = initialState,
  action: FluxStandardAction): CreateState {

  switch (action.type) {
    case ADD_QUESTION: {
      return {
        ...state,
        questions: state.questions.push(action.payload)
      }
    }

    default:
      return state
  }
}
