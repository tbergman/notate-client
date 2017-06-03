// @flow

import Grader from './grader'
import PitchComparison from './comparison.pitch'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'

describe('grader', () => {
  const note = {
    id: 'note-id',
    staveLayerId: 'stave-layer-id',
    pitch: 'C/4',
    duration: DURATION.QUARTER,
    accidental: ACCIDENTAL.NONE,
    position: 0,
    isRest: false,
    isDotted: false,
    validator: (() => true)
  }

  const answers = [
    { ...note, validator: PitchComparison.equal('C/4'), duration: 'q', position: 0 },
    { ...note, validator: PitchComparison.equal('D/4'), duration: 'q', position: 1 },
  ]

  describe('correct answers', () => {
    it('passes when all answers are correct', () => {
      const student = [
        { ...note, pitch: 'C/4', duration: 'q', position: 0 },
        { ...note, pitch: 'D/4', duration: 'q', position: 1 },
      ]

      const correct = Grader.grade(answers, student)

      expect(correct).toBe(true)
    })
  })

  describe('wrong answers', () => {
    it('fails when one answer is incorrect', () => {
      const student = [
        { ...note, pitch: 'C/4', duration: 'q', position: 0 },
        { ...note, pitch: 'D/5', duration: 'q', position: 1 },
      ]

      const correct = Grader.grade(answers, student)

      expect(correct).toBe(false)
    })

    it('fails when more than one answer is incorrect', () => {
      const student = [
        { ...note, pitch: 'C/5', duration: 'q', position: 0 },
        { ...note, pitch: 'D/5', duration: 'q', position: 1 },
      ]

      const correct = Grader.grade(answers, student)

      expect(correct).toBe(false)
    })

    it('fails when answer is in an incorrect measure/tempo', () => {
      const student = [
        { ...note, pitch: 'C/4', duration: 'q', position: 0 },
        { ...note, pitch: 'D/4', duration: 'q', position: 2 },
      ]

      const correct = Grader.grade(answers, student)

      expect(correct).toBe(false)
    })

    it('fails when student did not provide one answer', () => {
      const student = [
        { ...note, pitch: 'C/4', duration: 'q', position: 0 },
      ]

      const correct = Grader.grade(answers, student)

      expect(correct).toBe(false)
    })
  })
})
