// @flow

import _ from 'lodash'
import { fromJS, List } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { DocumentsState } from 'modules/documents'
import { ADD_QUESTION, EDIT_QUESTION } from 'modules/documents/actions'
import { DefaultQuestion } from 'modules/types'

export const initialState: DocumentsState = {
  questions: List([]),
  editing: fromJS(DefaultQuestion),
}

export default function reducer(
  state: DocumentsState = initialState,
  action: FluxStandardAction): DocumentsState {

  switch (action.type) {
    case ADD_QUESTION: {
      const question = action.payload

      return {
        ...state,
        questions: state.questions.push(question)
      }
    }

    case EDIT_QUESTION: {
      const question = state.questions.find(x => x.id === action.payload)

      return {
        ...state,
        editing: fromJS(question)
      }
    }

    default:
      return state
  }
}
