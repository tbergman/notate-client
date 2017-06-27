// @flow

import _ from 'lodash'
import { List } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { DocumentsState } from 'modules/documents'
import { DefaultDocument, DefaultQuestion } from 'modules/types'
import { selectQuestions } from 'modules/documents/selectors'
import { PITCH_EQUAL, DURATION_EQUAL } from 'modules/grading'
import { VALIDATE_PITCH_ONLY, VALIDATE_DURATION_ONLY, VALIDATE_PITCH_DURATION } from 'modules/grading'
import {
  SAVE_QUESTION,
  EDIT_QUESTION,
  NEW_QUESTION,
  REMOVE_QUESTION,
  SAVE_DOCUMENT,
  EDIT_DOCUMENT,
  NEW_DOCUMENT,
  REMOVE_DOCUMENT,
  SET_SELECTED_DESCRIPTION,
  SET_SELECTED_CLEF,
  SET_SELECTED_TIME_SIGNATURE,
  SET_SELECTED_KEY_SIGNATURE,
  SET_SELECTED_MEASURES,
  SET_SELECTED_VALIDATORS,
} from 'modules/documents/actions'

const updateSelectedFrom = (question) => ({
  selectedDescription: question.description,
  selectedClef: question.clef,
  selectedTimeSignature: question.timeSignature,
  selectedKeySignature: question.keySignature,
  selectedMeasures: question.measures,
  selectedValidators: question.validators,
})

const initialStateDocument = DefaultDocument()
const initialStateQuestion = initialStateDocument.questions.get(0)

export const initialState: DocumentsState = {
  documents: List([initialStateDocument]),
  editingDocument: initialStateDocument,
  questions: List([initialStateQuestion]),
  editing: initialStateQuestion,
  ...updateSelectedFrom(initialStateQuestion),
}

export default function reducer(
  state: DocumentsState = initialState,
  action: FluxStandardAction): DocumentsState {

  const editQuestion = (state, question) => {
    return {
      ...updateSelectedFrom(question),
      editing: question,
    }
  }

  switch (action.type) {
    case SAVE_QUESTION: {
      const question = action.payload

      question.answerNotes = question.answerNotes.map(x => {
        if (question.validators === VALIDATE_PITCH_ONLY) {
          x.validators = [PITCH_EQUAL]
        } else if (question.validators === VALIDATE_DURATION_ONLY) {
          x.validators = [DURATION_EQUAL]
        } else if (question.validators === VALIDATE_PITCH_DURATION) {
          x.validators = [PITCH_EQUAL, DURATION_EQUAL]
        }
        return x
      })

      const index = state.questions.findIndex(x => x.id === question.id)
      const questions = index >= 0
        ? state.questions.update(index, () => question)
        : state.questions.push(question)

      return {
        ...state,
        ...editQuestion(state, question),
        questions: questions,
      }
    }

    case EDIT_QUESTION: {
      const question = state.questions.find(x => x.id === action.payload)
      if (!question) {
        throw new Error(`Question not found: ${action.payload}`)
      }

      return {
        ...state,
        ...editQuestion(state, question),
      }
    }

    case NEW_QUESTION: {
      const question = DefaultQuestion()
      const questions = state.questions.push(question)

      return {
        ...state,
        ...editQuestion(state, question),
        questions: questions,
      }
    }

    case REMOVE_QUESTION: {
      const questionId = action.payload
      const index = state.questions.findIndex(x => x.id === questionId)
      let questions = index >= 0
        ? state.questions.remove(index)
        : state.questions

      const newQuestion = DefaultQuestion()
      if (questions.size === 0) {
        questions = questions.push(newQuestion)
      }

      const editing = questionId === state.editing.id
        ? questions.get(0)
        : state.editing

      return {
        ...state,
        ...editQuestion(state, editing),
        questions: questions,
      }
    }

    case SAVE_DOCUMENT: {
      const document = action.payload

      const index = state.documents.findIndex(x => x.id === document.id)
      const documents = index >= 0
        ? state.documents.update(index, () => document)
        : state.documents.push(document)

      return {
        ...state,
        documents: documents,
      }
    }

    case EDIT_DOCUMENT: {
      const selectedDocumentId = action.payload
      const document = state.documents.find(x => x.id === selectedDocumentId)

      if (!document) {
        throw new Error(`Document not found: ${action.payload}`)
      }

      return {
        ...state,
        ...editQuestion(state, document.questions.get(0)),
        editingDocument: document,
        questions: document.questions,
      }
    }

    case REMOVE_DOCUMENT: {
      const documentId = action.payload
      const index = state.documents.findIndex(x => x.id === documentId)
      const documents = index >= 0
        ? state.documents.remove(index)
        : state.documents

      return {
        ...state,
        documents: documents,
      }
    }

    case NEW_DOCUMENT: {
      const document = DefaultDocument()
      const documents = state.documents.push(document)

      return {
        ...state,
        documents: documents,
      }
    }

    case SET_SELECTED_DESCRIPTION: {
      return { ...state, selectedDescription: action.payload }
    }

    case SET_SELECTED_CLEF: {
      return { ...state, selectedClef: action.payload }
    }

    case SET_SELECTED_TIME_SIGNATURE: {
      return { ...state, selectedTimeSignature: action.payload }
    }

    case SET_SELECTED_KEY_SIGNATURE: {
      return { ...state, selectedKeySignature: action.payload }
    }

    case SET_SELECTED_MEASURES: {
      return { ...state, selectedMeasures: action.payload }
    }

    case SET_SELECTED_VALIDATORS: {
      return { ...state, selectedValidators: action.payload }
    }

    default:
      return state
  }
}
