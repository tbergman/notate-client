// @flow

import type { List } from 'immutable'
import type { Question } from 'modules/student-test'

export type QuestionGrade {
  questionId: number,
  correct: boolean,
  graded: boolean,
}

export type QuestionGradesState = {
  questionGrades: List<QuestionGrade>,
}
