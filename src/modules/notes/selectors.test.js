// @flow

import { List } from 'immutable'
import { selectStaveNotes } from './selectors'
import { initialState as toolboxInitialState } from 'modules/toolbox/reducer'
import { initialState as gradingInitialState } from 'modules/grading/reducer'
import { initialState as documentsInitialState } from 'modules/documents/reducer'
import { DefaultNote as note } from 'modules/types'

describe('notes selectors', () => {
  let state

  beforeEach(() => {
    state = {
      toolbox: toolboxInitialState,
      grading: gradingInitialState,
      documents: documentsInitialState,
      notes: {
        notes: List([
          { ...note, staveLayerId: 'stave-id' },
          { ...note, staveLayerId: 'another-stave-id' }
        ]),
      },
    }
  })

  describe('stave notes selector', () => {
    let selector

    beforeEach(() => {
      selector = selectStaveNotes(state)
    })

    it('returns all notes from a single stave layer', () => {
      const result = selector('stave-id')

      expect(result.length).toEqual(1)
    })

    it('returns an empty array when there are no notes on a given layer', () => {
      const result = selector('unexisting-stave-id')

      expect(result.length).toEqual(0)
    })
  })
})
