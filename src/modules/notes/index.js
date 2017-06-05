// @flow

import { List } from 'immutable'
import type { StaveNote } from 'modules/types'

export type NotesState = {
  notes: List<StaveNote>
}
