// @flow

export type AccidentalType = -2 | -1 | 0 | 1 | 2

export type DurationType = string

export type ToolboxState = {
  selectedDuration: DurationType,
  selectedAccidental: AccidentalType,
}

export const ACCIDENTAL = {
  NATURAL: 0,
  SHARP: 1,
  DOUBLE_SHARP: 2,
  FLAT: -1,
  DOUBLE_FLAT: -2,
}

export const DURATION = {
  EIGHTH: '8',
  QUARTER: 'q',
  HALF: 'h',
  WHOLE: 'w',
}
