// @flow

import {
    SELECT_DURATION,
    SELECT_ACCIDENTAL,
} from './actionTypes'
import type {
    SelectDuration,
    SelectAccidental,
} from './actionTypes'


export type SelectDurationAction = SelectDuration & { payload: number }
export const selectDuration: (newDuration: number) => SelectDurationAction = (newDuration) => ({
  type: SELECT_DURATION,
  payload: newDuration
})

export type SelectAccidentalAction = SelectAccidental & { payload: number }
export const selectAccidental: (newAccidental: number) => SelectAccidentalAction = (newAccidental) => {
  return {
    type: SELECT_ACCIDENTAL,
    payload: newAccidental
  };
};

export type ToolboxActions =
  | SelectDurationAction
  | SelectAccidentalAction
