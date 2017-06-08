// @flow

import type { Question } from 'modules/types'

export const SAVE_QUESTION = 'create/SAVE_QUESTION'

// SAVE QUESTION
export type SaveQuestionAction = {
  type: 'create/SAVE_QUESTION',
  payload: Question
}
export const saveQuestion: (question: Question) => SaveQuestionAction = (question) => ({
  type: SAVE_QUESTION,
  payload: question
})

export type CreateActions =
  | SaveQuestionAction
