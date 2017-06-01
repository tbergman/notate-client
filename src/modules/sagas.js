import { select, takeEvery } from 'redux-saga/effects'

import {
  SET_DURATION,
  SET_ACCIDENTAL,
  TOGGLE_REST,
  TOGGLE_DOT
} from 'modules/toolbox/actions'

function* noteChanged(action, toolbox) {
  console.log('note changing action happened, this is the new toolbox', toolbox)
}

export default function* watchToolboxNoteEditing(){
  yield takeEvery([SET_DURATION, SET_ACCIDENTAL, TOGGLE_REST, TOGGLE_DOT], function* (action) {
    const toolboxState = yield select((state) => state.toolbox)
    if (!!toolboxState.selectedNote) {
      yield noteChanged(action, toolboxState)
    }
  })
}
