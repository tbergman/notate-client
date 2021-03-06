// @flow

import type { StaveNote } from 'modules/types'

export type AccidentalType = string

export type DurationType = string

export type ToolboxState = {
  selectedDuration: DurationType,
  selectedAccidental: AccidentalType,
  restSelected: boolean,
  dotSelected: boolean,
  selectionTool: boolean,
  eraserSelected: boolean,
  selectedNote: StaveNote|null,
}

export const ACCIDENTAL = {
  NONE: '',
  NATURAL: 'n',
  SHARP: '#',
  DOUBLE_SHARP: '##',
  FLAT: 'b',
  DOUBLE_FLAT: 'bb',
}

export const DURATION = {
  EIGHTH: '8',
  QUARTER: '4',
  HALF: '2',
  WHOLE: '1',
}
