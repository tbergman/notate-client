// @flow

import _ from 'lodash'
import uuid from 'uuid'
import { takeEvery, put, fork } from 'redux-saga/effects'
import { SAVE_QUESTION } from 'modules/create/actions'
import { ADD_QUESTION } from 'modules/documents/actions'
import { NOTE_ADDED } from 'modules/notes/actions'

function* addQuestion(action): Generator<*, *, *> {
  const question = action.payload
  const questionLayerId = uuid()
  const answerLayerId = uuid()
  const studentLayerId = uuid()

  question.questionLayerId = questionLayerId
  question.questionNotes = _.map(question.questionNotes, x => ({
    ...x,
    staveLayerId: questionLayerId,
    className: 'question',
  }))

  question.answerLayerId = answerLayerId
  question.answerNotes = _.map(question.answerNotes, x => ({
    ...x,
    staveLayerId: answerLayerId,
    className: 'answer'
  }))

  question.studentLayerId = studentLayerId

  const actions = [put({ type: ADD_QUESTION, payload: question })]

  _.each(question.questionNotes, x => {
    actions.push(put({ type: NOTE_ADDED, payload: x }))
  })

  _.each(question.answerNotes, x => {
    actions.push(put({ type: NOTE_ADDED, payload: x }))
  })

  yield actions
}

export function* watchQuestionCreated(): Generator<*, *, *> {
  yield takeEvery(SAVE_QUESTION, addQuestion)
}
