// @flow

import { List } from 'immutable'
import reducer from './reducer'

describe('grading reducer', () => {
  let question
  const questionId = 'question-id'
  const initialState = {
    questionGrades: new List([{
      questionId: questionId,
      graded: true,
      correct: false,
    }])
  }

  beforeEach(() => {
    question = {
      id: questionId,
      index: '1',
      statement: '',
      notation: '',
      answers: [],
      student: [],
    }
  })

  it('grades an existing question', () => {
    const result = reducer(initialState, { type: 'GRADE_QUESTION', payload: question })
    const grade = result.questionGrades.get(0)

    expect(grade.correct).toEqual(true)
  })

  it('grades a new question', () => {
    question.id = 'new-question-id'
    const result = reducer(initialState, { type: 'GRADE_QUESTION', payload: question })
    const grade = result.questionGrades.get(1)

    expect(grade.questionId).toEqual('new-question-id')
    expect(grade.correct).toEqual(true)
  })
})
