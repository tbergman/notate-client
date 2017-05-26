// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'

export const SET_DURATION = 'toolbox/SELECT_DURATION'
export const SET_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'
export const TOGGLE_REST = 'toolbox/TOGGLE_REST'
export const TOGGLE_DOT = 'toolbox/TOGGLE_DOT'
export const TOGGLE_SELECTION_TOOL = 'toolbox/TOGGLE_SELECTION_TOOL'
export const SELECT_NOTE = 'toolbox/SELECT_NOTE'

export type SetDuration = { type: SET_DURATION }
export type SetAccidental = { type: SET_ACCIDENTAL }
export type ToggleRest = { type: TOGGLE_REST }
export type ToggleDot = { type: TOGGLE_DOT }
export type ToggleSelectionTool = { type: TOGGLE_SELECTION_TOOL }
export type SelectNote = { type: SELECT_NOTE }

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

export type ToggleDotAction = ToggleDot
export const toggleDot: () => ToggleDotAction = () => ({
  type: TOGGLE_DOT,
})

export type ToggleSelectionToolAction = ToggleSelectionTool
export const toggleSelectionTool: () => ToggleSelectionToolAction = () => ({
  type: TOGGLE_SELECTION_TOOL,
})

export type SelectNoteAction = SelectNote
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

export type ToolbarActionTypes =
  | SetDuration
  | SetAccidental
  | ToggleRest
  | ToggleDot
  | ToggleSelectionTool
  | SelectNote
