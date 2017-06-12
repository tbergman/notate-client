// @flow

import DurationComparison from './comparison.duration'
import { DefaultNote as note } from 'modules/types'
import { DURATION } from 'modules/toolbox'

describe('duration comparison', () => {
  let pass

  describe('equal duration', () => {
    beforeEach(() => {
      pass = DurationComparison.equal({ ...note, duration: DURATION.QUARTER })
    })

    it('passes when duration is exactly the same', () => {
      expect(pass({ ...note, duration: DURATION.QUARTER })).toBe(true)
    })

    it('fails when duration is different', () => {
      expect(pass({ ...note, duration: DURATION.EIGHTH })).toBe(false)
    })

    it('does not care about pitch', () => {
      expect(pass({ ...note, pitch: 'C/5', duration: DURATION.QUARTER })).toBe(true)
    })
  })
})
