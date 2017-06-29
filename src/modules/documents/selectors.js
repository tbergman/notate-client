// @flow

import _ from 'lodash'
import { createSelector } from 'reselect'

import { selectDocuments } from 'modules/reducers'
import type { AppState } from 'modules/reducers'

export const selectQuestions = (state: AppState) => {
  return createSelector(
    selectDocuments,
    (state) => {
      const selectedDocumentId = state.documents.editingDocumentId
      const documents = state.documents.toJS() || []
      const questions = _.find(documents, x => x.id === selectedDocumentId)

      return questions
    }
  )(state)
}
