// @flow

import _ from 'lodash'
import type { AnswerNote, StudentNote } from '../student-test'

export default class Grader {
  grade(answers: Array<AnswerNote>, student: Array<StudentNote>) {
    _.each(answers, answerNote => {
      const studentNote = _.find(student, x => x.position === answerNote.position)

      if (!studentNote) {
        return console.log('Answer not provided for:', answerNote)
      }

      if (answerNote.pitch(studentNote.pitch)) {
        return console.log('CORRECT for:', answerNote)
      } else {
        return console.log('FAIL for:', answerNote)
      }
    })
  }
}
