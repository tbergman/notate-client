// @flow

import type { List } from 'immutable'
import type { Question } from 'modules/types'

export type DocumentsState = {
  questions: List<Question>,
  editing: Question,
}
