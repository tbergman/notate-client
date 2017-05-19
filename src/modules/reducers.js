// @flow

import type { StudentTestState } from 'modules/student-test'
import type { QuestionGradesState } from 'modules/grading'
import type { ToolboxState } from 'modules/toolbox'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as studentTest } from 'modules/student-test/reducer'
import { default as grading } from 'modules/grading/reducer'
import { default as toolbox } from 'modules/toolbox/reducer'

export type AppState = {
  studentTest: StudentTestState,
  grading: QuestionGradesState,
  toolbox: ToolboxState,
}

export default combineReducers({
  studentTest,
  grading,
  toolbox,
  routing: routerReducer,
})

export const selectStudentTest = (state: AppState) => {
  return state.studentTest
}

export const selectGrading = (state: AppState) => {
  return state.grading
}

export const selectToolbox = (state: AppState) => {
  return state.toolbox
}
