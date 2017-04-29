// @flow

import { SET_DURATION, SET_ACCIDENTAL } from './actionTypes';
import type { ToolboxActions } from './actions'
import type { AccidentalType, DurationType } from './constants'
import { ACCIDENTAL, DURATION } from './constants'

// import type { Tools } from 'Types'

export type State = {
    selectedDuration: DurationType,
    selectedAccidental: AccidentalType,
}

export const initialState: State = {
    selectedDuration: DURATION.QUARTER,
    selectedAccidental: ACCIDENTAL.NATURAL,
}

export default (state: State = initialState, action: ToolboxActions) => {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        selectedDuration: action.payload
      }

    case SET_ACCIDENTAL:
      return {
        ...state,
        selectedAccidental: action.payload,
      }

    default:
      return state;
  }
};
