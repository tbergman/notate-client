// @flow

import type { QuestionGradesState } from 'modules/grading'
import type { ToolboxState } from 'modules/toolbox'
import type { NotesState } from 'modules/notes'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as grading } from 'modules/grading/reducer'
import { default as toolbox } from 'modules/toolbox/reducer'
import { default as notes } from 'modules/notes/reducer'

export type AppState = {
  grading: QuestionGradesState,
  toolbox: ToolboxState,
  notes: NotesState,
}

export default combineReducers({
  grading,
  toolbox,
  notes,
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
