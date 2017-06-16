// @flow

import type { QuestionGradesState } from 'modules/grading'
import type { ToolboxState } from 'modules/toolbox'
import type { NotesState } from 'modules/notes'
import type { DocumentsState } from 'modules/documents'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as grading } from 'modules/grading/reducer'
import { default as toolbox } from 'modules/toolbox/reducer'
import { default as notes } from 'modules/notes/reducer'
import { default as documents } from 'modules/documents/reducer'

export type AppState = {
  grading: QuestionGradesState,
  toolbox: ToolboxState,
  notes: NotesState,
  documents: DocumentsState,
}

export default combineReducers({
  grading,
  toolbox,
  notes,
  documents,
  routing: routerReducer,
})

export const selectGrading = (state: AppState) => {
  return state.grading
}

export const selectToolbox = (state: AppState) => {
  return state.toolbox
}

export const selectNotes = (state: AppState) => {
  return state.notes
}

export const selectDocuments = (state: AppState) => {
  return state.documents
}
