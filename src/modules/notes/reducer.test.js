// @flow

import type { CLearLayerAction, NoteAddedAction, NoteChangedAction, NoteRemovedAction } from './actions'

import { List } from 'immutable'
import reducer from './reducer'
import type { NotesState } from 'modules/notes'
import { DefaultNote as note } from 'modules/types'

import {
  NOTE_CHANGED,
  NOTE_ADDED,
  NOTE_REMOVED,
  CLEAR_LAYER
} from 'modules/notes/actions'

describe('notes reducer', () => {
  let initialState: NotesState

  beforeEach(() => {
    initialState = {
      notes: List([note])
    }
  })

  it('adds a new note', () => {
    const action: NoteAddedAction = { type: NOTE_ADDED, payload: { ...note, id: 'new-note' } }
    const result = reducer(initialState, action)

    const notes = result.notes

    expect(notes.size).toEqual(2)
  })

  it('changes an existing note', () => {
    const action: NoteChangedAction = { type: NOTE_CHANGED, payload: { ...note, position: 100 } }
    const result = reducer(initialState, action)

    const notes = result.notes

    expect(notes.size).toEqual(1)
    expect(notes.get(0).position).toEqual(100)
  })

  it('removes an existing note', () => {
    const action: NoteRemovedAction = { type: NOTE_REMOVED, payload: { ...note } }
    const result = reducer(initialState, action)

    const notes = result.notes

    expect(notes.size).toEqual(0)
  })

  it('clears an existing layer', () => {
    const action: CLearLayerAction = { type: CLEAR_LAYER, payload: note.staveLayerId }
    const result = reducer(initialState, action)

    const notes = result.notes

    expect(notes.size).toEqual(0)
  })
})
