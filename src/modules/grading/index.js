// @flow

import type { List } from 'immutable'

export type QuestionGrade = {
  gradingId: string,
  correct: boolean,
}

export type QuestionGradesState = {
  questionGrades: List<QuestionGrade>,
}

export const PITCH_EQUAL = 'pitch/equal'
export const DURATION_EQUAL = 'duration/equal'
