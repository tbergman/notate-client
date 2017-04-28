// @flow

export const SELECT_DURATION = 'toolbox/SELECT_DURATION'
export const SELECT_ACCIDENTAL = 'toolbox/SELECT_ACCIDENTAL'


export type SelectDuration = { type: 'toolbox/SELECT_DURATION' }
export type SelectAccidental = { type: 'toolbox/SELECT_ACCIDENTAL' }


export type ToolbarActionTypes =
    | SelectDuration
    | SelectAccidental