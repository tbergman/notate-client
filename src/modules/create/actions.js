// @flow

export const professorAddedQuestionNote = (note) => {
  return {
    type: 'create/PROFESSOR_ADDED_QUESTION_NOTE',
    payload: note
  }
}

export const professorAddedAnswerNote = (note) => {
  return {
    type: 'create/PROFESSOR_ADDED_ANSWER_NOTE',
    payload: note
  }
}
