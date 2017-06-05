// @flow

import type { StaveNote, StaveAnswerNote } from 'modules/types'

export const GRADE_LAYERS = 'grading/GRADE_LAYERS'
export const CLEAR_GRADING = 'grading/CLEAR_GRADING'

// GRADE LAYERS
export type GradeLayersAction = {
  type: 'grading/GRADE_LAYERS',
  payload: {
    gradingId: string,
    answers: Array<StaveAnswerNote>,
    student: Array<StaveNote>,
  }
}
export const gradeLayers:
  (gradingId: string, answers: Array<StaveAnswerNote>, student: Array<StaveNote>) => GradeLayersAction =
  (gradingId, answers, student) => ({
    type: GRADE_LAYERS,
    payload: {
      gradingId,
      answers,
      student,
    }
  })

// CLEAR GRADING
export type ClearGradingAction = {
  type: 'grading/CLEAR_GRADING',
  payload: string
}
export const clearGrading: (gradingId: string) => ClearGradingAction = (gradingId) => ({
  type: CLEAR_GRADING,
  payload: gradingId
})

export type GradingActions =
  | GradeLayersAction
  | ClearGradingAction
