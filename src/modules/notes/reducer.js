// @flow

import { List } from 'immutable'
import type { NotesState } from 'modules/notes'
import type { NotesActions } from 'modules/toolbox/actions'
import type { StaveNote } from 'modules/types'

import {
  NOTE_ADDED,
  NOTE_CHANGED,
  NOTE_REMOVED,
  CLEAR_LAYER,
} from 'modules/notes/actions'

export const initialState: NotesState = {
  notes: List([])
}

export default (state: NotesState = initialState, action: NotesActions) => {
  switch (action.type) {
    case NOTE_ADDED: {
      return {
        ...state,
        notes: state.notes.push(action.payload),
      }
    }

    case NOTE_CHANGED: {
      const note = action.payload
      const index = state.notes.findIndex(x => x.id === note.id)
      const notes = state.notes.update(index, () => note)

      return {
        ...state,
        notes: notes,
      }
    }

    case NOTE_REMOVED: {
      const note = action.payload
      const index = state.notes.findIndex(x => x.id === note.id)
      const notes = state.notes.remove(index)

      return {
        ...state,
        notes: notes
      }
    }

    case CLEAR_LAYER: {
      const layerId = action.payload
      const notes = state.notes.filter(x => x.staveLayerId !== layerId)

      return {
        ...state,
        notes: notes
      }
    }

    default:
      return state
  }
};
