// @flow

import _ from 'lodash'
import { List } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { DocumentsState } from 'modules/documents'
import { ADD_QUESTION } from 'modules/documents/actions'
import uuid from 'uuid'

export const initialState: DocumentsState = {
  questions: List([])
}

export default function reducer(
  state: CreateState = initialState,
  action: FluxStandardAction): CreateState {

  switch (action.type) {
    case ADD_QUESTION: {
      const question = action.payload

      return {
        ...state,
        questions: state.questions.push(question)
      }
    }

    default:
      return state
  }
}
