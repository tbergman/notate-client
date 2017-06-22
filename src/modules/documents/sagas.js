// @flow

import _ from 'lodash'
import { take, fork, put } from 'redux-saga/effects'
import { SAVE_QUESTION } from 'modules/documents/actions'
import { NOTE_ADDED } from 'modules/notes/actions'
import type { SaveQuestionAction } from 'modules/documents/actions'

function* saveQuestion(action: SaveQuestionAction): Generator<*, *, *> {
  const question = action.payload
  const actions = []

  _.each(question.questionNotes, x => {
    actions.push(put({ type: NOTE_ADDED, payload: x }))
  })

  _.each(question.answerNotes, x => {
    actions.push(put({ type: NOTE_ADDED, payload: x }))
  })

  yield actions
}

export function* watchQuestionCreated(): Generator<*, *, *> {
  while(true) {
    const action: SaveQuestionAction = yield take(SAVE_QUESTION)
    yield fork(saveQuestion, action)
  }
}
