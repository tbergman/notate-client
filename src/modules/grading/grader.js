// @flow

import _ from 'lodash'
import type { Question } from '../student-test'

export default class Grader {
  grade(question: Question) {
    const answers = question.answers
    const student = question.student

    return _.every(answers, answerNote => {
      const studentNote = _.find(student, x => x.position === answerNote.position)

      return studentNote && answerNote.pitch(studentNote.pitch)
    })
  }
}
