// @flow

import type { AccidentalType, DurationType } from 'modules/toolbox'

export type StaveNote = {
  pitch: string,
  duration: DurationType,
  accidental: AccidentalType,
  position: number,
  isRest: boolean,
  isDotted: boolean,
}
