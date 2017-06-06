// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import uuid from 'uuid'

export type StaveNote = {
  id: string,
  staveLayerId: string,
  pitch: string,
  duration: DurationType,
  accidental: AccidentalType,
  position: number,
  isRest: boolean,
  isDotted: boolean,
}

export type StaveAnswerNote = StaveNote & {
  validators: Array<Function>,
}

export const DefaultNote = {
  id: uuid(),
  staveLayerId: 'stave-layer-id',
  pitch: 'C/4',
  duration: DURATION.QUARTER,
  accidental: ACCIDENTAL.NONE,
  position: 0,
  isRest: false,
  isDotted: false,
  validators: [(() => true)]
}

export type Question = {
  id: string,
  description: string,
  questionNotes: Array<StaveNote>,
  answerNotes: Array<StaveAnswerNote>,
}

export const DefaultQuestion = {
  id: uuid(),
  description: '',
  questionNotes: [],
  answerNotes: [],
}
