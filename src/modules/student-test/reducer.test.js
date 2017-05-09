//@flow

import { fromJS, List as iList } from 'immutable'
import reducer from 'modules/student-test/reducer'

const emptyList = new iList()

describe('student test reducer', () => {
  const initialState = {
    questions: fromJS([{
      id: 1,
      index: '',
      statement: '',
      notation: '',
      student: [{}],
    }, {
      id: 2,
      index: '',
      statement: '',
      notation: '',
      student: []
    }])
  }

  describe('student adding notes', () => {
    it('should append the notes to the current state', () => {
      const result = reducer(initialState, { type: 'STUDENT_ADDED_NOTE', payload: { questionId: 1 } })

      expect(result.questions.getIn(['0', 'student'], emptyList).toJS().length).toEqual(2)
    })

    it('should append the notes to the correct question', () => {
      const result = reducer(initialState, { type: 'STUDENT_ADDED_NOTE', payload: { questionId: 2 } })

      expect(result.questions.getIn(['0', 'student'], emptyList).toJS().length).toEqual(1)
      expect(result.questions.getIn(['1', 'student'], emptyList).toJS().length).toEqual(1)
    })
  })
})
