// @flow

import { takeEvery, put } from 'redux-saga/effects'
import { SAVE_QUESTION } from 'modules/create/actions'
import { ADD_QUESTION } from 'modules/documents/actions'

function* addQuestion(action): Generator<*, *, *> {
  yield put({ type: ADD_QUESTION, payload: action.payload });
}

export function* watchQuestionCreated(): Generator<*, *, *> {
  yield takeEvery(SAVE_QUESTION, addQuestion)
}
