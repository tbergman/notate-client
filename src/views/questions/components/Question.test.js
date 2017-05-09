// @flow

import React from 'react'
import { mount } from 'enzyme'
import Question from './Question'

describe('stave component', () => {
  const question = {
    id: 1,
    index: '1.a',
    statement: 'guess what',
    notation: 'C-D-E/4',
    student: [],
  }
  it('renders without crashing', () => {
    const component = mount(<Question question={question}/>)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const component = mount(<Question question={question}/>)

    expect(component.find('.question')).toBeDefined()
  })

  it('sets the question index', () => {
    const component = mount(<Question question={question}/>)

    expect(component.find('.question-index').text()).toEqual('1.a')
  })

  it('sets the question statement', () => {
    const component = mount(<Question question={question}/>)

    expect(component.find('.question-statement').text()).toEqual('guess what')
  })
})
