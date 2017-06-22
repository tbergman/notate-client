// @flow

import type { Question } from 'modules/types'

export const SAVE_QUESTION = 'documents/SAVE_QUESTION'
export const EDIT_QUESTION = 'documents/EDIT_QUESTION'
export const REMOVE_QUESTION = 'documents/REMOVE_QUESTION'
export const NEW_QUESTION = 'documents/NEW_QUESTION'

// ADD QUESTION
export type SaveQuestionAction = {
  type: 'documents/SAVE_QUESTION',
  payload: Question
}
export const saveQuestion: (question: Question) => SaveQuestionAction = (question) => ({
  type: SAVE_QUESTION,
  payload: question
})

// EDIT QUESTION
export type EditQuestionAction = {
  type: 'documents/EDIT_QUESTION',
  payload: string
}
export const editQuestion: (questionId: string) => EditQuestionAction = (question) => ({
  type: EDIT_QUESTION,
  payload: question
})

// REMOVE QUESTION
export type RemoveQuestionAction = {
  type: 'documents/REMOVE_QUESTION',
  payload: string
}
export const removeQuestion: (questionId: string) => RemoveQuestionAction = (question) => ({
  type: REMOVE_QUESTION,
  payload: question
})

// NEW QUESTION
export type NewQuestionAction = {
  type: 'documents/NEW_QUESTION'
}
export const newQuestion: () => NewQuestionAction = () => ({
  type: NEW_QUESTION,
})

export type DocumentsActions =
  | SaveQuestionAction
  | EditQuestionAction
  | RemoveQuestionAction
  | NewQuestionAction
