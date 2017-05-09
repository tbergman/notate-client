// @flow
import type { StudentTestState } from 'modules/student-test'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as studentTest } from 'modules/student-test/reducer'

export type AppState = {
  studentTest: StudentTestState,
}

export default combineReducers({
  studentTest,
  routing: routerReducer,
})

export const selectStudentTest = (state: AppState) => {
  return state.studentTest
}
