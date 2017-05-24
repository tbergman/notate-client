// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'

export const SET_DURATION = 'toolbox/SELECT_DURATION'
export const SET_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'
export const TOGGLE_REST = 'toolbox/TOGGLE_REST'

export type SetDuration = { type: SET_DURATION }
export type SetAccidental = { type: SET_ACCIDENTAL }
export type ToggleRest = { type: TOGGLE_REST }

export type SetDurationAction = SetDuration & { payload: DurationType }
export const setDuration: (newDuration: DurationType) => SetDurationAction = (newDuration) => ({
  type: SET_DURATION,
  payload: newDuration
})

export type SetAccidentalAction = SetAccidental & { payload: AccidentalType }
export const setAccidental: (newAccidental: AccidentalType) => SetAccidentalAction = (newAccidental) => ({
  type: SET_ACCIDENTAL,
  payload: newAccidental
})

export type ToggleRestAction = ToggleRest
export const toggleRest: () => ToggleRestAction = () => ({
  type: TOGGLE_REST,
})

export type ToolboxActions =
  | SetDurationAction
  | SetAccidentalAction
  | ToggleRestAction

export type ToolbarActionTypes =
  | SetDuration
  | SetAccidental
  | ToggleRest
