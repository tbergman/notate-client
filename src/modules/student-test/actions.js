// @flow

import type { StudentNote } from 'modules/student-test'

export const studentAddedNote = (note: StudentNote) => {
  return {
    type: 'STUDENT_ADDED_NOTE',
    payload: note
  }
}
