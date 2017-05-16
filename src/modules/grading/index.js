// @flow

import type { List } from 'immutable'

export type QuestionGrade = {
  questionId: string,
  correct: boolean,
  graded: boolean,
}

export type QuestionGradesState = {
  questionGrades: List<QuestionGrade>,
}
