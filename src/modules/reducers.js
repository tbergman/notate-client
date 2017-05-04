// @flow

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { default as questions } from './questions/reducer'

export const initialState = {
}

export default combineReducers({
  questions,
  routing: routerReducer,
})
