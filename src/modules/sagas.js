// @flow

import { select, take, put } from 'redux-saga/effects'
import type { ToolboxState } from 'modules/toolbox'
import { NOTE_CHANGED } from 'modules/notes/actions'
import { selectToolbox } from 'modules/reducers'

import {
  SET_DURATION,
  SET_ACCIDENTAL,
  TOGGLE_REST,
  TOGGLE_DOT
} from 'modules/toolbox/actions'

function* noteChanged(toolbox: ToolboxState): Generator<*, *, *> {
  const newNote = {
    ...toolbox.selectedNote,
    duration: toolbox.selectedDuration,
    accidental: toolbox.selectedAccidental,
    isRest: toolbox.restSelected,
    isDotted: toolbox.dotSelected,
  }
  yield put({ type: NOTE_CHANGED, payload: newNote })
}

export default function* watchToolboxNoteEditing(): Generator<*, *, *> {
  while(true) {
    yield take([
      SET_DURATION,
      SET_ACCIDENTAL,
      TOGGLE_REST,
      TOGGLE_DOT
    ])
    const toolboxState = yield select(selectToolbox)
    if (!!toolboxState.selectedNote) {
      yield noteChanged(toolboxState)
    }
  }
}
