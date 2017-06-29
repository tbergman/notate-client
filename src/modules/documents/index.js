// @flow

import type { List } from 'immutable'
import type { Question, Document } from 'modules/types'

export type DocumentsState = {
  questions: List<Question>,
  editing: Question,
  documents: List<Document>,
  editingDocument: Document,
  selectedDescription: string,
  selectedClef: string,
  selectedTimeSignature: string,
  selectedKeySignature: string,
  selectedMeasures: number,
  selectedValidators: string,
}
