// @flow

import type { Question } from 'modules/student-test'

export const gradeQuestion = (question: Question) => {
  return {
    type: 'GRADE_QUESTION',
    payload: question
  }
}
