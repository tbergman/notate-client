// @flow

import _ from 'lodash'
import type { Question } from '../student-test'

const Grader = {
  grade(answers, student): boolean {

    const result = _.every(answers, answerNote => {
      const studentNote = _.find(student, x => x.position === answerNote.position)

      return studentNote && answerNote.validator(studentNote.pitch)
    })

    return result
  }
}

export default Grader
