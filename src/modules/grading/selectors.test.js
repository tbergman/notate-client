// @flow

import { fromJS } from 'immutable'
import { selectQuestionGrade } from './selectors'

describe('grading selectors', () => {
  it('selects a single question grade by question id', () => {
    const state = {
      studentTest: {},
      grading: {
        questionGrades: fromJS([{
          questionId: 1,
          graded: true,
          correct: true,
        }])
      }
    }

    const result = selectQuestionGrade(state, 1)

    expect(result.correct).toEqual(true)
    expect(result.graded).toEqual(true)
  })

  it('returns a default question not yet graded when nothing is found in the state', () => {
    const state = {
      studentTest: {},
      grading: {
        questionGrades: fromJS([])
      }
    }

    const result = selectQuestionGrade(state, 1)

    expect(result.correct).toEqual(false)
    expect(result.graded).toEqual(false)
  })
})
