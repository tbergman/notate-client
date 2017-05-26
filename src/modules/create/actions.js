// @flow
import type { StaveNote } from 'modules/types'

export const professorAddedQuestionNote = (note: StaveNote) => {
  return {
    type: 'create/PROFESSOR_ADDED_QUESTION_NOTE',
    payload: note
  }
}

export const professorErasedQuestionNote = (note: StaveNote) => {
  return {
    type: 'create/PROFESSOR_ERASED_QUESTION_NOTE',
    payload: note
  }
}

export const professorAddedAnswerNote = (note: StaveNote) => {
  return {
    type: 'create/PROFESSOR_ADDED_ANSWER_NOTE',
    payload: note
  }
}
