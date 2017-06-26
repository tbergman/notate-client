// @flow

import type { Question, Document } from 'modules/types'

export const SAVE_QUESTION = 'documents/SAVE_QUESTION'
export const EDIT_QUESTION = 'documents/EDIT_QUESTION'
export const REMOVE_QUESTION = 'documents/REMOVE_QUESTION'
export const NEW_QUESTION = 'documents/NEW_QUESTION'
export const SAVE_DOCUMENT = 'documents/SAVE_DOCUMENT'
export const EDIT_DOCUMENT = 'documents/EDIT_DOCUMENT'
export const REMOVE_DOCUMENT = 'documents/REMOVE_DOCUMENT'
export const NEW_DOCUMENT = 'documents/NEW_DOCUMENT'
export const SET_SELECTED_DESCRIPTION = 'documents/SET_SELECTED_DESCRIPTION'
export const SET_SELECTED_CLEF = 'documents/SET_SELECTED_CLEF'
export const SET_SELECTED_TIME_SIGNATURE = 'documents/SET_SELECTED_TIME_SIGNATURE'
export const SET_SELECTED_KEY_SIGNATURE = 'documents/SET_SELECTED_KEY_SIGNATURE'
export const SET_SELECTED_MEASURES = 'documents/SET_SELECTED_MEASURES'
export const SET_SELECTED_VALIDATORS = 'documents/SET_SELECTED_VALIDATORS'

// SAVE QUESTION
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
export const editQuestion: (questionId: string) => EditQuestionAction = (questionId) => ({
  type: EDIT_QUESTION,
  payload: questionId
})

// REMOVE QUESTION
export type RemoveQuestionAction = {
  type: 'documents/REMOVE_QUESTION',
  payload: string
}
export const removeQuestion: (questionId: string) => RemoveQuestionAction = (questionId) => ({
  type: REMOVE_QUESTION,
  payload: questionId
})

// NEW QUESTION
export type NewQuestionAction = {
  type: 'documents/NEW_QUESTION',
  payload: { documentId: string }
}
export const newQuestion: (payload) => NewQuestionAction = (payload) => ({
  type: NEW_QUESTION,
  payload: payload,
})

// SAVE DOCUMENT
export type SaveDocumentAction = {
  type: 'documents/SAVE_DOCUMENT',
  payload: Document
}
export const saveDocument: (document: Document) => SaveDocumentAction = (document) => ({
  type: SAVE_DOCUMENT,
  payload: document
})

// EDIT DOCUMENT
export type EditDocumentAction = {
  type: 'documents/EDIT_QUESTION',
  payload: string
}
export const editDocument: (documentId: string) => EditDocumentAction = (documentId) => ({
  type: EDIT_DOCUMENT,
  payload: documentId
})

// REMOVE DOCUMENT
export type RemoveDocumentAction = {
  type: 'documents/REMOVE_DOCUMENT',
  payload: string
}
export const removeDocument: (documentId: string) => RemoveDocumentAction = (documentId) => ({
  type: REMOVE_DOCUMENT,
  payload: documentId
})

// NEW DOCUMENT
export type NewDocumentAction = {
  type: 'documents/DOCUMENT'
}
export const newDocument: () => NewDocumentAction = () => ({
  type: NEW_DOCUMENT,
})

// SET SELECTED DESCCRIPTION
export type SetSelectedDescriptionAction = {
  type: 'documents/SET_SELECTED_DESCRIPTION'
}
export const setSelectedDescription: (value: string) => SetSelectedDescriptionAction = (value) => ({
  type: SET_SELECTED_DESCRIPTION,
  payload: value
})

// SET SELECTED CLEF
export type SetSelectedClefAction = {
  type: 'documents/SET_SELECTED_CLEF'
}
export const setSelectedClef: (value: string) => SetSelectedClefAction = (value) => ({
  type: SET_SELECTED_CLEF,
  payload: value
})

// SET SELECTED TIME SIGNATURE
export type SetSelectedTimeSignatureAction = {
  type: 'documents/SET_SELECTED_TIME_SIGNATURE'
}
export const setSelectedTimeSignature: (value: string) => SetSelectedTimeSignatureAction = (value) => ({
  type: SET_SELECTED_TIME_SIGNATURE,
  payload: value
})

// SET SELECTED KEY SIGNATURE
export type SetSelectedKeySignatureAction = {
  type: 'documents/SET_SELECTED_KEY_SIGNATURE'
}
export const setSelectedKeySignature: (value: string) => SetSelectedKeySignatureAction = (value) => ({
  type: SET_SELECTED_KEY_SIGNATURE,
  payload: value
})

// SET SELECTED MEASURES
export type SetSelectedMeasuresAction = {
  type: 'documents/SET_SELECTED_MEASURES'
}
export const setSelectedMeasures: (value: number) => SetSelectedMeasuresAction = (value) => ({
  type: SET_SELECTED_MEASURES,
  payload: value
})

// SET SELECTED VALIDATORS
export type SetSelectedValidatorsAction = {
  type: 'documents/SET_SELECTED_VALIDATORS'
}
export const setSelectedValidators: (value: string) => SetSelectedValidatorsAction = (value) => ({
  type: SET_SELECTED_VALIDATORS,
  payload: value
})

export type DocumentsActions =
  | SaveQuestionAction
  | EditQuestionAction
  | RemoveQuestionAction
  | NewQuestionAction
  | SaveDocumentAction
  | EditDocumentAction
  | RemoveDocumentAction
  | NewDocumentAction
  | SetSelectedDescriptionAction
  | SetSelectedClefAction
  | SetSelectedTimeSignatureAction
  | SetSelectedKeySignatureAction
  | SetSelectedMeasuresAction
  | SetSelectedValidatorsAction
