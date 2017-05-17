// @flow

import { fromJS, List } from 'immutable'
import reducer from 'modules/student-test/reducer'
import uuid from 'uuid'
const emptyList = new List()

describe('student test reducer', () => {
  const questionId1 = uuid()
  const questionId2 = uuid()

  const initialState = {
    questions: fromJS([{
      id: questionId1,
      index: '',
      statement: '',
      notation: '',
      student: [{}],
    }, {
      id: questionId2,
      index: '',
      statement: '',
      notation: '',
      student: []
    }])
  }

  describe('student adding notes', () => {
    it('should append the notes to the current state', () => {
      const result = reducer(initialState, { type: 'STUDENT_ADDED_NOTE', payload: { questionId: questionId1 } })

      expect(result.questions.getIn(['0', 'student'], emptyList).toJS().length).toEqual(2)
    })

    it('should append the notes to the correct question', () => {
      const result = reducer(initialState, { type: 'STUDENT_ADDED_NOTE', payload: { questionId: questionId2 } })

      expect(result.questions.getIn(['0', 'student'], emptyList).toJS().length).toEqual(1)
      expect(result.questions.getIn(['1', 'student'], emptyList).toJS().length).toEqual(1)
    })
  })
})
