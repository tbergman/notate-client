// @flow

import Grader from './grader'
import PitchComparison from './comparison.pitch'

describe('grader', () => {
  const unimportantFields = {
    id: '',
    index: '1',
    statement: '',
    notation: '',
  }

  const question = {
    ...unimportantFields,
    answers: [
      { pitch: PitchComparison.equal('C/4'), duration: 'q', position: 0 },
      { pitch: PitchComparison.equal('D/4'), duration: 'q', position: 1 },
    ],
  }

  describe('correct answers', () => {
    it('passes when all answers are correct', () => {
      question.student = [
        { pitch: 'C/4', duration: 'q', position: 0 },
        { pitch: 'D/4', duration: 'q', position: 1 },
      ]

      const correct = Grader.grade(question)

      expect(correct).toBe(true)
    })
  })

  describe('wrong answers', () => {
    it('fails when one answer is incorrect', () => {
      question.student = [
        { pitch: 'C/4', duration: 'q', position: 0 },
        { pitch: 'D/5', duration: 'q', position: 1 },
      ]

      const correct = Grader.grade(question)

      expect(correct).toBe(false)
    })

    it('fails when more than one answer is incorrect', () => {
      question.student = [
        { pitch: 'C/5', duration: 'q', position: 0 },
        { pitch: 'D/5', duration: 'q', position: 1 },
      ]

      const correct = Grader.grade(question)

      expect(correct).toBe(false)
    })

    it('fails when answer is in an incorrect measure/tempo', () => {
      question.student = [
        { pitch: 'C/4', duration: 'q', position: 0 },
        { pitch: 'D/4', duration: 'q', position: 2 },
      ]

      const correct = Grader.grade(question)

      expect(correct).toBe(false)
    })

    it('fails when student did not provide one answer', () => {
      question.student = [
        { pitch: 'C/4', duration: 'q', position: 0 },
      ]

      const correct = Grader.grade(question)

      expect(correct).toBe(false)
    })
  })
})
