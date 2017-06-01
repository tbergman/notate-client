// @flow

import type { StudentTestState } from 'modules/student-test'
import type { QuestionGradesState } from 'modules/grading'
import type { ToolboxState } from 'modules/toolbox'
import type { CreateQuestionState } from 'modules/create'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as studentTest } from 'modules/student-test/reducer'
import { default as grading } from 'modules/grading/reducer'
import { default as toolbox } from 'modules/toolbox/reducer'
import { default as create } from 'modules/create/reducer'

export type AppState = {
  studentTest: StudentTestState,
  grading: QuestionGradesState,
  toolbox: ToolboxState,
  create: CreateQuestionState,
}

export default combineReducers({
  studentTest,
  grading,
  toolbox,
  create,
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
