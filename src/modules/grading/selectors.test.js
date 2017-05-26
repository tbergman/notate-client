// @flow

import { fromJS, List } from 'immutable'
import { selectQuestionGrade } from './selectors'
import { initialState as createState } from 'modules/create/reducer'

describe('grading selectors', () => {
  it('selects a single question grade by question id', () => {
    const state = {
      studentTest: {
        questions: new List(),
      },
      toolbox: {
        selectedDuration: '1',
        selectedAccidental: '#',
        restSelected: false,
        dotSelected: false,
      },
      grading: {
        questionGrades: fromJS([{
          questionId: 'question-id',
          graded: true,
          correct: true,
        }])
      },
      create: createState,
    }

    const result = selectQuestionGrade(state, 'question-id')

    expect(result.correct).toEqual(true)
    expect(result.graded).toEqual(true)
  })

  it('returns a default question not yet graded when nothing is found in the state', () => {
    const state = {
      studentTest: {
        questions: new List(),
      },
      toolbox: {
        selectedDuration: '1',
        selectedAccidental: '#',
        restSelected: false,
        dotSelected: false,
      },
      grading: {
        questionGrades: fromJS([])
      },
      create: createState,
    }

    const result = selectQuestionGrade(state, 'question-id')

    expect(result.correct).toEqual(false)
    expect(result.graded).toEqual(false)
  })
})
