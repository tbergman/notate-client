// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'

export const SET_DURATION = 'toolbox/SELECT_DURATION'
export const SET_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'
export const TOGGLE_REST = 'toolbox/TOGGLE_REST'
export const TOGGLE_DOT = 'toolbox/TOGGLE_DOT'
export const TOGGLE_SELECTION_TOOL = 'toolbox/TOGGLE_SELECTION_TOOL'
export const SELECT_NOTE = 'toolbox/SELECT_NOTE'

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

// TOGGLE SELECTION TOOL
export type ToggleSelectionToolAction = {
  type: 'toolbox/TOGGLE_SELECTION_TOOL'
}
export const toggleSelectionTool: () => ToggleSelectionToolAction = () => ({
  type: TOGGLE_SELECTION_TOOL,
})

// SELECT NOTE
export type SelectNoteAction = {
  type: 'toolbox/SELECT_NOTE'
}
export const selectNote: (note) => SelectNoteAction = (note) => ({
  type: SELECT_NOTE,
  payload: note,
})

export type ToolboxActions =
  | SetDurationAction
  | SetAccidentalAction
  | ToggleRestAction
  | ToggleDotAction
  | ToggleSelectionToolAction
  | SelectNoteAction
