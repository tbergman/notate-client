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

export const VALIDATE_PITCH_ONLY = 'validate/pitch_only'
export const VALIDATE_DURATION_ONLY = 'validate/duration_only'
export const VALIDATE_PITCH_DURATION = 'validate/pitch_duration'
