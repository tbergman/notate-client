// @flow

import { fork } from 'redux-saga/effects'
import { watchToolboxNoteEditing } from 'modules/notes/sagas'
import { watchQuestionCreated } from 'modules/documents/sagas'

export default function* root() {
  yield [
    fork(watchToolboxNoteEditing),
    fork(watchQuestionCreated),
  ]
}
