// @flow

import { List } from 'immutable'
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
        selectionTool: false,
        restSelected: false,
        dotSelected: false,
        eraserSelected: false,
        selectedNote: null,
      },
      grading: {
        questionGrades: [{
          questionId: 'question-id',
          graded: true,
          correct: true,
        }]
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
        selectionTool: false,
        restSelected: false,
        dotSelected: false,
        eraserSelected: false,
        selectedNote: null,
      },
      grading: {
        questionGrades: []
      },
      create: createState,
    }

    const result = selectQuestionGrade(state, 'question-id')

    expect(result.correct).toEqual(false)
    expect(result.graded).toEqual(false)
  })
})
