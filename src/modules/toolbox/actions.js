// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'

export const SET_DURATION = 'toolbox/SELECT_DURATION'
export const SET_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'
export const TOGGLE_REST = 'toolbox/TOGGLE_REST'
export const TOGGLE_DOT = 'toolbox/TOGGLE_DOT'

// SET DURATION
export type SetDurationAction = {
  type: 'toolbox/SELECT_DURATION',
  payload: DurationType,
}
export const setDuration: (newDuration: DurationType) => SetDurationAction = (newDuration) => ({
  type: SET_DURATION,
  payload: newDuration
})

// SET ACCIDENTAL
export type SetAccidentalAction = {
  type: 'toolbox/SELECT_ACCIDENTAL',
  payload: AccidentalType,
}
export const setAccidental: (newAccidental: AccidentalType) => SetAccidentalAction = (newAccidental) => ({
  type: SET_ACCIDENTAL,
  payload: newAccidental
})

// TOGGLE REST
export type ToggleRestAction = {
  type: 'toolbox/TOGGLE_REST',
}
export const toggleRest: () => ToggleRestAction = () => ({
  type: TOGGLE_REST,
})

// TOGGLE DOT
export type ToggleDotAction = {
  type: 'toolbox/TOGGLE_DOT'
}
export const toggleDot: () => ToggleDotAction = () => ({
  type: TOGGLE_DOT,
})

export type ToolboxActions =
  | SetDurationAction
  | SetAccidentalAction
  | ToggleRestAction
  | ToggleDotAction
