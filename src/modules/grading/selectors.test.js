// @flow

import { List } from 'immutable'
import { selectGradingById } from './selectors'
import { initialState as toolboxInitialState } from 'modules/toolbox/reducer'
import { initialState as notesInitialState } from 'modules/notes/reducer'

describe('grading selectors', () => {
  let state

  beforeEach(() => {
    state = {
      notes: notesInitialState,
      toolbox: toolboxInitialState,
      grading: {
        questionGrades: List([{
          gradingId: 'grading-id',
          correct: true,
        }])
      },
    }
  })

  it('selects a single question grade by question id', () => {
    const result = selectGradingById(state, 'grading-id')

    expect(result.correct).toEqual(true)
  })
})
