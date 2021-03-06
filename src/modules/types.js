// @flow

import { List } from 'immutable'
import type { AccidentalType, DurationType } from 'modules/toolbox'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import { VALIDATE_PITCH_DURATION } from 'modules/grading'
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
  className: string,
}

export type StaveAnswerNote = StaveNote & {
  validators: Array<string>,
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
  className: 'question',
  validators: []
}

export type Question = {
  id: string,
  description: string,
  questionNotes: Array<StaveNote>,
  answerNotes: Array<StaveAnswerNote>,
  questionLayerId: string,
  answerLayerId: string,
  studentLayerId: string,
  clef: string,
  timeSignature: string,
  measures: number,
  keySignature: string,
  validators: string,
}

export const DefaultQuestion = () => ({
  id: uuid(),
  description: '',
  questionNotes: [],
  answerNotes: [],
  questionLayerId: uuid(),
  answerLayerId: uuid(),
  studentLayerId: uuid(),
  clef: 'treble',
  timeSignature: '4/4',
  keySignature: 'C',
  measures: 4,
  validators: VALIDATE_PITCH_DURATION,
})

export type Document = {
  id: string,
  description: string,
  documentType: string,
  questions: List<Question>,
}

export const DocumentType = {
  SELF_ASSESSMENT: 'SELF_ASSESSMENT',
  ASSIGNMENT: 'ASSIGNMENT',
}

export const DefaultDocument = () => ({
  id: uuid(),
  description: '',
  documentType: DocumentType.ASSIGNMENT,
  questions: List([ DefaultQuestion() ])
})
