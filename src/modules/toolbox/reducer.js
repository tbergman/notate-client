// @flow

import type { ToolboxState } from 'modules/toolbox'
import type { ToolboxActions } from 'modules/toolbox/actions'

import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import { SET_DURATION, SET_ACCIDENTAL, TOGGLE_REST } from 'modules/toolbox/actions'

export const initialState: ToolboxState = {
  selectedDuration: DURATION.QUARTER,
  selectedAccidental: ACCIDENTAL.NONE,
  restSelected: false,
}

export default (state: ToolboxState = initialState, action: ToolboxActions) => {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        selectedDuration: action.payload
      }

    case SET_ACCIDENTAL:
      const newAccidental = action.payload === state.selectedAccidental
        ? ACCIDENTAL.NONE
        : action.payload

      return {
        ...state,
        selectedAccidental: newAccidental,
      }

    case TOGGLE_REST:
      return {
        ...state,
        restSelected: !state.restSelected,
      }

    default:
      return state
  }
};
