// @flow

import React from 'react'
import { mount } from 'enzyme'
import Question from './Question'

describe('question component', () => {
  const question = {
    id: 1,
    index: '1.a',
    statement: 'guess what',
    notation: 'C-D-E/4',
    student: [],
    answers: [],
  }

  it('renders without crashing', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: false }}/>)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: false }}/>)

    expect(component.find('.question')).toBeDefined()
  })

  it('sets the question index', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: false }}/>)

    expect(component.find('.question-index').text()).toEqual('1.a')
  })

  it('sets the question statement', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: false }}/>)

    expect(component.find('.question-statement').text()).toEqual('guess what')
  })

  it('displays a failed question', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: false }}/>)

    expect(component.find('.question-grade').text()).toEqual('')
  })

  it('displays a failed answer', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: true, correct: false }}/>)

    expect(component.find('.question-grade').text()).toEqual('FAIL')
  })

  it('displays a correct answer', () => {
    const component = mount(<Question question={question} questionGrade={{ graded: true, correct: true }}/>)

    expect(component.find('.question-grade').text()).toEqual('CORRECT')
  })
})
