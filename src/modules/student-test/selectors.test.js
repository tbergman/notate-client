// @flow

import { fromJS } from 'immutable'
import { selectQuestions } from './selectors'
import uuid from 'uuid'

describe('student test selectors', () => {
  it('selects questions from the app state', () => {
    const state = {
      studentTest: {
        questions: fromJS([{
          id: uuid(),
          index: '1.2 a',
          statement: 'Write an ascending leap above each of these notes',
          notation:'',
          student: [],
          answers: [],
        }])
      },
      grading: {}
    }

    const result = selectQuestions(state)

    expect(result.length).toEqual(1)
  })

  it('returns an empty array if no questions are found', () => {
    const state = {
      studentTest: {},
      grading: {}
    }

    const result = selectQuestions(state)

    expect(result).toEqual([])
  })
})
