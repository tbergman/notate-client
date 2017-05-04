// @flow

import React from 'react'
import { mount } from 'enzyme'
import { Flow } from 'vexflow'
import Question from './Question'

describe('stave component', () => {
  it('renders without crashing', () => {
    const component = mount(<Question index={'1.a'} statement={'guess what'} notation={'C-D-E/4'}/>)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const component = mount(<Question index={'1.a'} statement={'guess what'} notation={'C-D-E/4'}/>)

    expect(component.find('.question')).toBeDefined()
  })

  it('sets the question index', () => {
    const component = mount(<Question index={'1.a'} statement={'guess what'} notation={'C-D-E/4'}/>)

    expect(component.find('.question-index').text()).toEqual('1.a')
  })

  it('sets the question statement', () => {
    const component = mount(<Question index={'1.a'} statement={'guess what'} notation={'C-D-E/4'}/>)

    expect(component.find('.question-statement').text()).toEqual('guess what')
  })
})
