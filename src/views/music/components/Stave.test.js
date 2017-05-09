// @flow
import type { Question } from 'modules/student-test'

import React from 'react'
import { mount } from 'enzyme'
import { Flow } from 'vexflow'
import Stave from './Stave'

const mockAttributesNamedNodeMap = {
  getNamedItem: jest.fn()
}

describe('stave component', () => {
  const question: Question = {
    id: 1,
    index: '',
    notation: '',
    statement: '',
    student: []
  }

  it('renders without crashing', () => {
    const component = mount(<Stave notes={'C-D-E/4'} question={question}/>)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const component = mount(<Stave notes={'C-D-E/4'} question={question}/>)

    expect(component.find('.stave')).toBeDefined()
  })

  it('render the stave svg', () => {
    const component = mount(<Stave notes={'C-D-E/4'} question={question}/>)
    const element = component.getDOMNode()

    expect(element.querySelector('svg')).toBeDefined()
  })

  it('defaults width to 800', () => {
    const component = mount(<Stave notes={'C-D-E/4'} question={question}/>)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('width').value).toEqual('800')
  })

  it('sets the svg width', () => {
    const component = mount(<Stave notes={'C-D-E/4'} question={question} width={100}/>)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('width').value).toEqual('100')
  })

  it('defaults clef type to treble', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    mount(<Stave notes={'C-D-E/4'} question={question}/>)

    expect(addClef).toHaveBeenCalledWith('treble')
  })

  it('sets the svg height', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    mount(<Stave notes={'C-D-E/4'} question={question} clef={'bass'}/>)

    expect(addClef).toHaveBeenCalledWith('bass')
  })
})
