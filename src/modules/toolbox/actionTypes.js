// @flow

export const SET_DURATION = 'toolbox/SELECT_DURATION'
export const SET_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'


export type SetDuration = { type: 'toolbox/SELECT_DURATION' }
export type SetAccidental = { type: 'toolbox/SELECT_ACCIDENTAL' }


export type ToolbarActionTypes =
    | SetDuration
    | SetAccidental