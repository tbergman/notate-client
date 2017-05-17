// @flow

import React from 'react'
import { fromJS } from 'immutable'
import type { ShallowWrapper } from 'enzyme'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import Question from './Question'

type Setup = {
  props: Object,
  component: ShallowWrapper
}

function setup(graded: boolean, correct: boolean): Setup {
  const question = {
    id: 'question-id',
    index: '1.a',
    statement: 'guess what',
    notation: 'C-D-E/4',
    student: [],
    answers: [],
  }

  const props = { question }

  const store = createMockStore({
     grading: { questionGrades:
       fromJS([{ questionId: 'question-id', graded: graded, correct: correct }])
     }
  })
  const component: ShallowWrapper = shallowWithStore(<Question {...props} />, store)

  return {
    props,
    component
  }
}

describe('question component', () => {
  it('renders without crashing', () => {
    const { component } = setup(false, false)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const { component } = setup(false, false)

    expect(component.find('.question')).toBeDefined()
  })

  it('sets the question index', () => {
    const { component } = setup(false, false)

    const text = component.render().find('.question-index')[0].children[0].data

    expect(text).toEqual('1.a')
  })

  it('sets the question statement', () => {
    const { component } = setup(false, false)

    const text = component.render().find('.question-statement')[0].children[0].data

    expect(text).toEqual('guess what')
  })

  it('displays a failed question', () => {
    const { component } = setup(false, false)

    const text = component.render().find('.question-grade')[0].children[0]

    expect(text).not.toBeDefined()
  })

  it('displays a failed answer', () => {
    const { component } = setup(true, false)

    const text = component.render().find('.question-grade')[0].children[0].children[0].data

    expect(text).toEqual("FAIL")
  })

  it('displays a correct answer', () => {
    const { component } = setup(true, true)

    const text = component.render().find('.question-grade')[0].children[0].children[0].data

    expect(text).toEqual('CORRECT')
  })
})
