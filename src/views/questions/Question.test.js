// @flow
import type { ShallowWrapper } from 'enzyme'
import React from 'react'
import { shallow } from 'enzyme'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import Question, { QuestionUnconnected } from './Question'

type Setup = {
  props: Object,
  component: ShallowWrapper
}

function setup(graded: boolean, correct: boolean, useShallow: boolean = true): Setup {
  let component: ShallowWrapper;

  const question = {
    id: 'question-id',
    index: '1.a',
    statement: 'guess what',
    notation: 'C-D-E/4',
    student: [],
    answers: [],
  }
  const questionGrade = {
    questionId: 'question-id',
    correct,
    graded,
  }
  const grade = jest.fn()

  const props = { grade, question, questionGrade }

  const store = createMockStore({
     grading: {
       questionGrades: [{...questionGrade}]
     }
  })

  if(useShallow) {
    component = shallow(<QuestionUnconnected {...props} />)
  } else {
    component = shallowWithStore(<Question {...props} />, store)
  }

  return {
    props,
    component
  }
}

describe('question component', () => {
  it('renders without crashing', () => {
    const { component }: Setup = setup(false, false)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const { component }: Setup = setup(false, false)

    expect(component.find('.question')).toBeDefined()
  })

  xit('sets the question index', () => {
    const { component }: Setup = setup(false, false, false)

    const text = component.find('.question-index').first().html()
    console.info('text?', text)
    expect(text).toEqual('1.a')
  })

  xit('sets the question statement', () => {
    const { component }: Setup = setup(false, false)

    const text = component.find('.question-statement').first().text()
    console.info('text', text)

    expect(text).toEqual('guess what')
  })

  xit('displays a failed question', () => {
    const { component }: Setup = setup(false, false)

    const text = component.find('.question-grade').first().children().first();//[0].children[0]

    expect(text).not.toBeDefined()
  })

  xit('displays a failed answer', () => {
    const { component }: Setup = setup(true, false, false)

    const text = component.render().find('.question-grade').first().children().first().html();//[0].children[0].children[0].data
    expect(text).toEqual("FAIL")
  })

  xit('displays a correct answer', () => {
    const { component }: Setup = setup(true, true)

    const text = component.render().find('.question-grade')[0].children[0].children[0].data

    expect(text).toEqual('CORRECT')
  })
})
