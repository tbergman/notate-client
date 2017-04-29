// @flow

import {
    SET_DURATION,
    SET_ACCIDENTAL,
} from './actionTypes'
import type {
    SetDuration,
    SetAccidental,
} from './actionTypes'

import type {AccidentalType, DurationType} from './constants'


export type SetDurationAction = SetDuration & { payload: number }
export const setDuration: (newDuration: DurationType) => SetDurationAction = (newDuration) => ({
  type: SET_DURATION,
  payload: newDuration
})

export type SetAccidentalAction = SetAccidental & { payload: number }
export const setAccidental: (newAccidental: AccidentalType) => SetAccidentalAction = (newAccidental) => {
  return {
    type: SET_ACCIDENTAL,
    payload: newAccidental
  };
};

export type ToolboxActions =
  | SetDurationAction
  | SetAccidentalAction
