// @flow

import type { FluxStandardAction } from 'Types'
import type { CreateState } from 'modules/create'
import { SAVE_QUESTION } from 'modules/create/actions'
import { DefaultQuestion } from 'modules/types'

export const initialState: CreateState = {
  question: DefaultQuestion
}

export default function reducer(
  state: CreateState = initialState,
  action: FluxStandardAction): CreateState {

  switch (action.type) {
    case SAVE_QUESTION: {
      return {
        ...state,
        question: action.payload
      }
    }

    default:
      return state
  }
}
