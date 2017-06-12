// @flow

import type { List } from 'immutable'

export type QuestionGrade = {
  gradingId: string,
  correct: boolean,
}

export type QuestionGradesState = {
  questionGrades: List<QuestionGrade>,
}
