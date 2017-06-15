// @flow

import _ from 'lodash'
import type { StaveNote, StaveAnswerNote } from 'modules/types'
import PitchComparison from 'modules/grading/comparison.pitch'
import DurationComparison from 'modules/grading/comparison.duration'
import { PITCH_EQUAL, DURATION_EQUAL } from 'modules/grading'

const getValidatorFunction = (validator: string): Function => {
  switch (validator) {
    case PITCH_EQUAL: return PitchComparison.equal
    case DURATION_EQUAL: return DurationComparison.equal
    default: return PitchComparison.equal
  }
}

const Grader = {
  grade(answers: Array<StaveAnswerNote>, student: Array<StaveNote>): boolean {
    const result = _.every(answers, answerNote => {

      const studentNote = _.find(student, x => x.position === answerNote.position)

      return studentNote && _.every(answerNote.validators, x => {
        const validator = getValidatorFunction(x)
        return validator(answerNote)(studentNote)
      })
    })

    return result
  }
}

export default Grader
