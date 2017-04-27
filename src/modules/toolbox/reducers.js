// @flow

import { SELECT_DURATION, SELECT_ACCIDENTAL } from './actionTypes';
import type { ToolboxActions } from './actions'

// import type { Toolbox } from 'Types'

export type State = {
    selectedDuration: number,
    selectedAccidental: number,
}

export const initialState: State = {
    selectedDuration: 4,
    selectedAccidental: 0
}

export default (state: State = initialState, action: ToolboxActions) => {
  switch (action.type) {
    case SELECT_DURATION:
      return {
        ...state,
        selectedDuration: action.payload
      }

    case SELECT_ACCIDENTAL:
      return {
        ...state,
        selectedAccidental: action.payload,
      }

    default:
      return state;
  }
};
