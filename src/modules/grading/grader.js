// @flow

import _ from 'lodash'
import type { Question } from '../student-test'

export default class Grader {
  grade(question: Question) {
    const answers = question.answers
    const student = question.student

    let allAnswersCorrect = true

    _.each(answers, answerNote => {
      const studentNote = _.find(student, x => x.position === answerNote.position)

      if (!studentNote) {
        allAnswersCorrect = false
        return console.log('Answer not provided for:', answerNote)
      }

      if (answerNote.pitch(studentNote.pitch)) {
        return console.log('CORRECT for:', answerNote)
      } else {
        allAnswersCorrect = false
        return console.log('FAIL for:', answerNote)
      }
    })

    return allAnswersCorrect
  }
}
