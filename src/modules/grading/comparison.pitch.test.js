// @flow

import PitchComparison from './comparison.pitch'

describe('pitch comparison', () => {
  let pass

  describe('equal pitch', () => {
    beforeEach(() => {
      pass = PitchComparison.equal('C/4')
    })

    it('passes when pitch is exactly the same', () => {
      expect(pass('C/4')).toBe(true)
    })

    it('fails when note is different', () => {
      expect(pass('D/4')).toBe(false)
    })

    it('fails when ocatve is different', () => {
      expect(pass('C/5')).toBe(false)
    })

    it('fails when accidentals are different ', () => {
      expect(pass('C#/4')).toBe(false)
    })
  })

  describe('equal or higher pitch', () => {
    beforeEach(() => {
      pass = PitchComparison.equalOrHigher('E/4')
    })

    it('passes when pitch is exactly the same', () => {
      expect(pass('E/4')).toBe(true)
    })

    it('passes when pitch is higher', () => {
      expect(pass('F/4')).toBe(true)
    })

    it('passes when octave is higher', () => {
      expect(pass('B/5')).toBe(true)
    })

    it('fails when pitch is lower', () => {
      expect(pass('C/4')).toBe(false)
    })

    it('fails when octave is lower', () => {
      expect(pass('E/3')).toBe(false)
    })
  })

  describe('equal or lower pitch', () => {
    beforeEach(() => {
      pass = PitchComparison.equalOrLower('E/4')
    })

    it('passes when pitch is exactly the same', () => {
      expect(pass('E/4')).toBe(true)
    })

    it('passes when pitch is lower', () => {
      expect(pass('C/4')).toBe(true)
    })

    it('passes when octave is lower', () => {
      expect(pass('E/3')).toBe(true)
    })

    it('fails when pitch is higher', () => {
      expect(pass('F/4')).toBe(false)
    })

    it('fails when octave is higher', () => {
      expect(pass('B/5')).toBe(false)
    })
  })

  describe('same key', () => {
    beforeEach(() => {
      pass = PitchComparison.sameKey('E/4')
    })

    it('passes when key and octave are the same', () => {
      expect(pass('E/4')).toBe(true)
    })

    it('passes when key is the same', () => {
      expect(pass('E/5')).toBe(true)
      expect(pass('E/3')).toBe(true)
    })

    it('fails when key is difference', () => {
      expect(pass('D/4')).toBe(false)
      expect(pass('F/4')).toBe(false)
    })
  })
})
