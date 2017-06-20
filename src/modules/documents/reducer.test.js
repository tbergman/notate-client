// @flow

import reducer, { initialState } from './reducer'
import { SAVE_QUESTION, NEW_QUESTION, REMOVE_QUESTION } from 'modules/documents/actions'
import { DefaultQuestion } from 'modules/types'

describe('documents reducer', () => {
  it('saves a new question', () => {
    const result = reducer(initialState, { type: SAVE_QUESTION, payload: {
      ...DefaultQuestion(),
      description: 'new description'
    }})

    const newQuestion = result.questions.toJS()[0]

    expect(newQuestion.description).toEqual('new description')
  })

  it('adds a new question', () => {
    const result = reducer(initialState, { type: NEW_QUESTION, payload: {} })

    const newQuestion = result.editing.toJS()

    expect(newQuestion.description).toBeEmptyString()
    expect(newQuestion.answerNotes).toBeEmptyArray()
    expect(newQuestion.questionNotes).toBeEmptyArray()

    expect(newQuestion.id).toBeNonEmptyString()
    expect(newQuestion.questionLayerId).toBeNonEmptyString()
    expect(newQuestion.answerLayerId).toBeNonEmptyString()
    expect(newQuestion.studentLayerId).toBeNonEmptyString()

    expect(newQuestion.clef).toEqual('treble')
    expect(newQuestion.timeSignature).toEqual('4/4')
    expect(newQuestion.keySignature).toEqual('C')
  })

  it('removes a question', () => {
    const questionToRemove = { ...DefaultQuestion(), id: '1' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToRemove)
    }

    const result = reducer(state, { type: REMOVE_QUESTION, payload: questionToRemove.id })

    const questions = result.questions.toJS()

    expect(questions).toBeEmptyArray()
  })

  it('edits an existing question', () => {
    const questionToEdit = { ...DefaultQuestion(), id: '1' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToEdit)
    }

    const result = reducer(state, { type: SAVE_QUESTION, payload: {
      ...questionToEdit,
      description: 'new description'
    }})

    const fetchedQuestion = result.questions.toJS()[0]

    expect(fetchedQuestion.description).toEqual('new description')
  })
})
