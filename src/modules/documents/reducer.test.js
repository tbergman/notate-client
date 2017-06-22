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

    const newQuestion = result.editing

    expect(newQuestion.description.length).toEqual(0)
    expect(newQuestion.answerNotes.length).toEqual(0)
    expect(newQuestion.questionNotes.length).toEqual(0)

    expect(newQuestion.id.length).toBeTruthy()
    expect(newQuestion.questionLayerId).toBeTruthy()
    expect(newQuestion.answerLayerId).toBeTruthy()
    expect(newQuestion.studentLayerId).toBeTruthy()

    expect(newQuestion.clef).toEqual('treble')
    expect(newQuestion.timeSignature).toEqual('4/4')
    expect(newQuestion.keySignature).toEqual('C')
  })

  it('adding a new question saves it immediately', () => {
    const result = reducer(initialState, { type: NEW_QUESTION, payload: {} })

    const newQuestion = result.editing

    expect(result.questions.toJS()[0]).toEqual(newQuestion)
  })

  it('removes a question', () => {
    const questionToRemove = { ...DefaultQuestion(), id: '1' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToRemove)
    }

    const result = reducer(state, { type: REMOVE_QUESTION, payload: questionToRemove.id })

    const questions = result.questions.toJS()

    expect(questions.length).toEqual(0)
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
