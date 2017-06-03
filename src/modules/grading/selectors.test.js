// @flow

import { List } from 'immutable'
import { selectGradingById } from './selectors'

describe('grading selectors', () => {
  it('selects a single question grade by question id', () => {
    const state = {
      grading: {
        questionGrades: List([{
          gradingId: 'grading-id',
          correct: true,
        }])
      },
      notes: {
        notes: List([]),
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
    }

    const result = selectGradingById(state, 'grading-id')

    expect(result.correct).toEqual(true)
  })
})
