import { select, takeEvery } from 'redux-saga/effects'

import {
  SET_DURATION,
  SET_ACCIDENTAL,
  TOGGLE_REST,
  TOGGLE_DOT
} from 'modules/toolbox/actions'

function* noteChanged(action) {
  console.log('note changing action happened')
}

export default function* watchToolboxNoteEditing(){
  yield takeEvery([SET_DURATION, SET_ACCIDENTAL, TOGGLE_REST, TOGGLE_DOT], function* (action) {
    yield noteChanged(action)
  })
}
