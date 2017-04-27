// @flow

import {
    SELECT_DURATION,
    SELECT_ACCIDENTAL,
} from './actionTypes'
import type {
    SelectDuration,
    SelectAccidental,
} from './actionTypes'

import type { Toolbox } from 'Types'

export type SelectDurationAction = SelectDuration & { payload: number }
export const selectDuration: (toolbox: Toolbox) => SelectDurationAction = (toolbox) => ({
  type: SELECT_DURATION,
  payload: toolbox.selectedDuration
})

export type SelectAccidentalAction = SelectAccidental & { payload: number }
export const selectAccidental: (toolbox: Toolbox) => SelectAccidentalAction = (toolbox) => {
  return {
    type: SELECT_ACCIDENTAL,
    payload: toolbox.selectedAccidental
  };
};

export type ToolboxActions =
  | SelectDurationAction
  | SelectAccidentalAction
