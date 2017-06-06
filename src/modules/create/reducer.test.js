// @flow

import { List } from 'immutable'
import reducer, { initialState } from './reducer'
import { SAVE_QUESTION } from 'modules/create/actions'
import { DefaultQuestion as question } from 'modules/types'

describe('create question reducer', () => {
  it('saves a question', () => {
    const result = reducer(initialState, { type: SAVE_QUESTION, payload: {
      ...question,
      description: 'new description'
    }})

    const newQuestion = result.question.toJS()

    expect(newQuestion.description).toEqual('new description')
  })
})
