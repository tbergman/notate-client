// @flow

import type { StaveNote } from 'modules/types'

export const NOTE_CHANGED = 'notes/NOTE_CHANGED'
export const NOTE_ADDED = 'notes/NOTE_ADDED'
export const NOTE_REMOVED = 'notes/NOTE_REMOVED'

// NOTE ADDED
export type NoteAddedAction = {
  type: 'notes/NOTE_ADDED',
  payload: StaveNote,
}
export const addNote: (note: StaveNote) => NoteAddedAction = (note) => ({
  type: NOTE_ADDED,
  payload: note
})

// NOTE REMOVED
export type NoteRemovedAction = {
  type: 'notes/NOTE_REMOVED',
  payload: StaveNote,
}
export const removeNote: (note: StaveNote) => NoteRemovedAction = (note) => ({
  type: NOTE_REMOVED,
  payload: note
})

// NOTE CHANGED
export type NoteChangedAction = {
  type: 'notes/NOTE_CHANGED',
  payload: StaveNote,
}

export type NotesActions =
  | NoteAddedAction
  | NoteRemovedAction
  | NoteChangedAction
