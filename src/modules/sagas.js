import { select, takeEvery, put } from 'redux-saga/effects'

import { NOTE_CHANGED } from 'modules/notes/actions'
import {
  SET_DURATION,
  SET_ACCIDENTAL,
  TOGGLE_REST,
  TOGGLE_DOT
} from 'modules/toolbox/actions'

function* noteChanged(action, toolbox) {
  const newNote = {
    ...toolbox.selectedNote,
    duration: toolbox.selectedDuration,
    accidental: toolbox.selectedAccidental,
    isRest: toolbox.restSelected,
    isDotted: toolbox.dotSelected,
  }
  yield put({ type: NOTE_CHANGED, payload: newNote })
}

export default function* watchToolboxNoteEditing(){
  yield takeEvery([SET_DURATION, SET_ACCIDENTAL, TOGGLE_REST, TOGGLE_DOT], function* (action) {
    const toolboxState = yield select((state) => state.toolbox)
    if (!!toolboxState.selectedNote) {
      yield noteChanged(action, toolboxState)
    }
  })
}
