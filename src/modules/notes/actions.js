// @flow

import type { StaveNote } from 'modules/types'

export const NOTE_CHANGED = 'notes/NOTE_CHANGED'
export const NOTE_ADDED = 'notes/NOTE_ADDED'
export const NOTE_REMOVED = 'notes/NOTE_REMOVED'
export const CLEAR_LAYER = 'notes/CLEAR_LAYER'

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

export const changeNote: (note: StaveNote) => NoteChangedAction = (note) =>({
  type: NOTE_CHANGED,
  payload: note
})

// CLEAR LAYER
export type CLearLayerAction = {
  type: 'notes/CLEAR_LAYER',
  payload: string,
}
export const clearLayer: (layerId: string) => CLearLayerAction = (layerId) => ({
  type: CLEAR_LAYER,
  payload: layerId
})

export type NotesActions =
  | NoteAddedAction
  | NoteRemovedAction
  | NoteChangedAction
  | CLearLayerAction
