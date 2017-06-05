// @flow

import { List } from 'immutable'
import reducer from './reducer'
import { GRADE_LAYERS, CLEAR_GRADING } from 'modules/grading/actions'

describe('grading reducer', () => {
  let initialState
  const gradingId = 'grading-id'

  beforeEach(() => {
    initialState = {
      questionGrades: List([{
        gradingId: gradingId,
        correct: false,
      }])
    }
  })


  it('re-grades an existing answers/student pair', () => {
    const result = reducer(initialState, { type: GRADE_LAYERS, payload: {
      gradingId: gradingId,
      answers: [],
      student: []
    }})

    const grade = result.questionGrades.get(0)

    expect(grade.correct).toEqual(true)
  })

  it('grades a new answers/student pair', () => {
    const newGradingId = 'new-grading-id'
    const result = reducer(initialState, { type: GRADE_LAYERS, payload: {
      gradingId: newGradingId,
      answers: [],
      student: []
    }})

    const grade = result.questionGrades.get(1)

    expect(grade.gradingId).toEqual('new-grading-id')
    expect(grade.correct).toEqual(true)
  })

  it('clears an answers/student pair', () => {
    const result = reducer(initialState, { type: CLEAR_GRADING, payload: gradingId })

    const grades = result.questionGrades

    expect(grades.size).toEqual(0)
  })
})
