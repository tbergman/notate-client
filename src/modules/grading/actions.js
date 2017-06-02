// @flow

export const gradeLayers = (gradingId: string, answers, student) => {
  return {
    type: 'GRADE_LAYERS',
    payload: {
      gradingId,
      answers,
      student,
    }
  }
}
