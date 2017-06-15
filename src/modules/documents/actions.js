// @flow

import type { Question } from 'modules/types'

export const ADD_QUESTION = 'documents/ADD_QUESTION'
export const EDIT_QUESTION = 'documents/EDIT_QUESTION'

// ADD QUESTION
export type AddQuestionAction = {
  type: 'documents/ADD_QUESTION',
  payload: Question
}
export const addQuestion: (question: Question) => AddQuestionAction = (question) => ({
  type: ADD_QUESTION,
  payload: question
})

// EDIT QUESTION
export type EditQuestionAction = {
  type: 'documents/EDIT_QUESTION',
  payload: Question
}
export const editQuestion: (questionId: string) => EditQuestionAction = (question) => ({
  type: EDIT_QUESTION,
  payload: question
})

export type DocumentsActions =
  | AddQuestionAction
  | EditQuestionAction
