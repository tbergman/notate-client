// @flow

import _ from 'lodash'
import { List } from 'immutable'
import type { FluxStandardAction } from 'Types'
import type { DocumentsState } from 'modules/documents'
import { DefaultQuestion } from 'modules/types'
import { PITCH_EQUAL, DURATION_EQUAL } from 'modules/grading'
import { VALIDATE_PITCH_ONLY, VALIDATE_DURATION_ONLY, VALIDATE_PITCH_DURATION } from 'modules/grading'
import {
  SAVE_QUESTION,
  EDIT_QUESTION,
  NEW_QUESTION,
  REMOVE_QUESTION,
  SET_SELECTED_DESCRIPTION,
  SET_SELECTED_CLEF,
  SET_SELECTED_TIME_SIGNATURE,
  SET_SELECTED_KEY_SIGNATURE,
  SET_SELECTED_MEASURES,
  SET_SELECTED_VALIDATORS,
} from 'modules/documents/actions'

export const initialState: DocumentsState = {
  questions: List([]),
  editing: DefaultQuestion(),

  selectedDescription: '',
  selectedClef: 'treble',
  selectedTimeSignature: '4/4',
  selectedKeySignature: 'C',
  selectedMeasures: 4,
  selectedValidators: VALIDATE_PITCH_DURATION,
}

export default function reducer(
  state: DocumentsState = initialState,
  action: FluxStandardAction): DocumentsState {

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
        questions: questions
      }
    }

    case EDIT_QUESTION: {
      const question = state.questions.find(x => x.id === action.payload)
      if (!question) {
        throw new Error(`Question not found: ${action.payload}`)
      }
      return {
        ...state,
        editing: question,
        selectedDescription: question.description,
        selectedClef: question.clef,
        selectedTimeSignature: question.timeSignature,
        selectedKeySignature: question.keySignature,
        selectedMeasures: question.measures,
        selectedValidators: question.validators,
      }
    }

    case NEW_QUESTION: {
      const question = DefaultQuestion()
      const questions = state.questions.push(question)

      return {
        ...state,
        editing: question,
        questions: questions,
        selectedDescription: question.description,
        selectedClef: question.clef,
        selectedTimeSignature: question.timeSignature,
        selectedKeySignature: question.keySignature,
        selectedMeasures: question.measures,
        selectedValidators: question.validators,
      }
    }

    case REMOVE_QUESTION: {
      const questionId = action.payload
      const index = state.questions.findIndex(x => x.id === questionId)
      const questions = index >= 0
        ? state.questions.remove(index)
        : state.questions

      return {
        ...state,
        questions: questions
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
