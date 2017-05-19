// @flow

import type { ToolboxState } from 'modules/toolbox'
import type { ToolboxActions } from 'modules/toolbox/actions'

import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import { SET_DURATION, SET_ACCIDENTAL } from 'modules/toolbox/actions'

export const initialState: ToolboxState = {
  selectedDuration: DURATION.QUARTER,
  selectedAccidental: ACCIDENTAL.NATURAL,
}

export default (state: ToolboxState = initialState, action: ToolboxActions) => {
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
      return state
  }
};
