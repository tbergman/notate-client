// @flow
import type { StudentTestState } from 'modules/student-test'
import type { QuestionGradesState } from 'modules/grading'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as studentTest } from 'modules/student-test/reducer'
import { default as grading } from 'modules/grading/reducer'

export type AppState = {
  studentTest: StudentTestState,
  grading: QuestionGradesState
}

export default combineReducers({
  studentTest,
  grading,
  routing: routerReducer,
})

export const selectStudentTest = (state: AppState) => {
  return state.studentTest
}
