// @flow

import type { List } from 'immutable'
import type { Question } from 'modules/types'

export type DocumentsState = {
  questions: List<Question>,
  editing: Question,
  selectedDescription: string,
  selectedClef: string,
  selectedTimeSignature: string,
  selectedKeySignature: string,
  selectedMeasures: number,
  selectedValidators: string,
}
