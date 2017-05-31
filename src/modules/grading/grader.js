// @flow

import _ from 'lodash'
import type { Question } from '../student-test'

const Grader = {
  grade(question: Question): boolean {
    const answers = question.answers
    const student = question.student

    const result = _.every(answers, answerNote => {
      const studentNote = _.find(student, x => x.position === answerNote.position)

      return studentNote && answerNote.pitch(studentNote.pitch)
    })

    return result
  }
}

export default Grader
