// @flow

import { fromJS } from 'immutable'
import reducer from './reducer'
import type { CreateQuestionState, CreateQuestion } from 'modules/create'

describe('create question reducer', () => {
  const createQuestion: CreateQuestion = {
    bars: 4,
    notes: [],
    answers: [],
  }

  const note = {
    id: '1',
    pitch: 'C/4',
    duration: 'q',
    accidental: '#',
    position: 0,
    isRest: false,
    isDotted: false,
  }

  const initialState: CreateQuestionState = {
    question: fromJS(createQuestion),
  }

  it('can add a question note', () => {
    const result = reducer(initialState, { type: 'create/PROFESSOR_ADDED_QUESTION_NOTE', payload: note })

    expect(result.question.get('notes').size).toEqual(1)
    expect(result.question.get('answers').size).toEqual(0)
  })

  it('can erase a question note', () => {
    initialState.question.set('notes', initialState.question.get('notes').push(note))
    const result = reducer(initialState, { type: 'create/PROFESSOR_ERASED_QUESTION_NOTE', payload: note })

    expect(result.question.get('notes').size).toEqual(0)
  })

  it('can add an answer note', () => {
    const result = reducer(initialState, { type: 'create/PROFESSOR_ADDED_ANSWER_NOTE', payload: note })

    expect(result.question.get('answers').size).toEqual(1)
    expect(result.question.get('notes').size).toEqual(0)
  })
})
