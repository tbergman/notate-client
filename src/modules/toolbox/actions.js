// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'

export const SET_DURATION = 'toolbox/SELECT_DURATION'
export const SET_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'

export type SetDuration = { type: 'toolbox/SELECT_DURATION' }
export type SetAccidental = { type: 'toolbox/SELECT_ACCIDENTAL' }

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

export type ToolboxActions =
  | SetDurationAction
  | SetAccidentalAction

export type ToolbarActionTypes =
  | SetDuration
  | SetAccidental
