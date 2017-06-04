// @flow

import PitchComparison from './comparison.pitch'
import { DefaultNote as note } from 'modules/types'
import { ACCIDENTAL } from 'modules/toolbox'

describe('pitch comparison', () => {
  let pass

  describe('equal pitch', () => {
    beforeEach(() => {
      pass = PitchComparison.equal({ ...note, pitch: 'C/4' })
    })

    it('passes when pitch is exactly the same', () => {
      expect(pass({ ...note, pitch: 'C/4' })).toBe(true)
    })

    it('fails when note is different', () => {
      expect(pass({ ...note, pitch: 'D/4' })).toBe(false)
    })

    it('fails when ocatve is different', () => {
      expect(pass({ ...note, pitch: 'C/5' })).toBe(false)
    })

    it('fails when accidentals are different ', () => {
      expect(pass({ ...note, pitch: 'C/4', accidental: ACCIDENTAL.SHARP })).toBe(false)
    })
  })

  describe('equal or higher pitch', () => {
    beforeEach(() => {
      pass = PitchComparison.equalOrHigher({ ...note, pitch: 'E/4' })
    })

    it('passes when pitch is exactly the same', () => {
      expect(pass({ ...note, pitch: 'E/4' })).toBe(true)
    })

    it('passes when pitch is higher', () => {
      expect(pass({ ...note, pitch: 'F/4' })).toBe(true)
    })

    it('passes when octave is higher', () => {
      expect(pass({ ...note, pitch: 'B/5' })).toBe(true)
    })

    it('fails when pitch is lower', () => {
      expect(pass({ ...note, pitch: 'C/4' })).toBe(false)
    })

    it('fails when octave is lower', () => {
      expect(pass({ ...note, pitch: 'E/3' })).toBe(false)
    })
  })

  describe('equal or lower pitch', () => {
    beforeEach(() => {
      pass = PitchComparison.equalOrLower({ ...note, pitch: 'E/4' })
    })

    it('passes when pitch is exactly the same', () => {
      expect(pass({ ...note, pitch: 'E/4' })).toBe(true)
    })

    it('passes when pitch is lower', () => {
      expect(pass({ ...note, pitch: 'C/4' })).toBe(true)
    })

    it('passes when octave is lower', () => {
      expect(pass({ ...note, pitch: 'E/3' })).toBe(true)
    })

    it('fails when pitch is higher', () => {
      expect(pass({ ...note, pitch: 'F/4' })).toBe(false)
    })

    it('fails when octave is higher', () => {
      expect(pass({ ...note, pitch: 'B/5' })).toBe(false)
    })
  })

  describe('same key', () => {
    beforeEach(() => {
      pass = PitchComparison.sameKey({ ...note, pitch: 'E/4' })
    })

    it('passes when key and octave are the same', () => {
      expect(pass({ ...note, pitch: 'E/4' })).toBe(true)
    })

    it('passes when key is the same', () => {
      expect(pass({ ...note, pitch: 'E/5' })).toBe(true)
      expect(pass({ ...note, pitch: 'E/3' })).toBe(true)
    })

    it('fails when key is difference', () => {
      expect(pass({ ...note, pitch: 'D/4' })).toBe(false)
      expect(pass({ ...note, pitch: 'F/4' })).toBe(false)
    })
  })
})
