// @flow

import type { ToolboxState } from 'modules/toolbox'
import type { ToolboxActions } from 'modules/toolbox/actions'

import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import {
  SET_DURATION,
  SET_ACCIDENTAL,
  TOGGLE_REST,
  TOGGLE_DOT,
  TOGGLE_SELECTION_TOOL,
  SELECT_NOTE,
} from 'modules/toolbox/actions'

export const initialState: ToolboxState = {
  selectedDuration: DURATION.QUARTER,
  selectedAccidental: ACCIDENTAL.NONE,
  restSelected: false,
  dotSelected: false,
  selectionTool: false,
  selectedNote: null,
}

export default (state: ToolboxState = initialState, action: ToolboxActions) => {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        selectedDuration: action.payload,
        selectionTool: false,
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

    case TOGGLE_DOT:
      return {
        ...state,
        dotSelected: !state.dotSelected,
      }

    case TOGGLE_SELECTION_TOOL:
      return {
        ...state,
        selectionTool: !state.selectionTool,
      }

    case SELECT_NOTE:
      return {
        ...state,
        selectedNote: action.payload,
      }

    default:
      return state
  }
};
