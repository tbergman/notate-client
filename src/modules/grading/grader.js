// @flow

import _ from 'lodash'
import type { StaveNote, StaveAnswerNote } from 'modules/types'

const Grader = {
  grade(answers: Array<StaveAnswerNote>, student: Array<StaveNote>): boolean {

    const result = _.every(answers, answerNote => {
      const studentNote = _.find(student, x => x.position === answerNote.position)

      return studentNote && answerNote.validator(studentNote.pitch)
    })

    return result
  }
}

export default Grader
