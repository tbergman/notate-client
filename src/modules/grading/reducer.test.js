// @flow

import { List } from 'immutable'
import Grader from './grader'
import reducer from './reducer'
import PitchComparison from './comparison.pitch'

describe('grading reducer', () => {
  let question
  const initialState = {
    questionGrades: new List([{
      questionId: 1,
      graded: true,
      correct: false,
    }])
  }

  beforeEach(() => {
    question = {
      id: 1,
      index: '1',
      statement: '',
      notation: '',
      answers: [],
      student: [],
    }
  })

  it('grades an existing question', () => {
    const result = reducer(initialState, { type: 'GRADE_QUESTION', payload: question })
    const grade = result.questionGrades.get('0')

    expect(grade.correct).toEqual(true)
  })

  it('grades a new question', () => {
    question.id = 2
    const result = reducer(initialState, { type: 'GRADE_QUESTION', payload: question })
    const grade = result.questionGrades.get('1')

    expect(grade.questionId).toEqual(2)
    expect(grade.correct).toEqual(true)
  })
})
