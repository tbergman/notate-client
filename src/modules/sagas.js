// @flow

import { fork } from 'redux-saga/effects'
import { watchToolboxNoteEditing } from 'modules/notes/sagas'
import { watchQuestionCreated } from 'modules/documents/sagas'

export default function* root(): Generator<*, *, *> {
  yield [
    fork(watchToolboxNoteEditing),
    fork(watchQuestionCreated),
  ]
}
