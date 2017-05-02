// @flow

import React from 'react'
import { mount } from 'enzyme'
import { Flow } from 'vexflow'
import Stave from './Stave'

const mockAttributesNamedNodeMap = {
  getNamedItem: jest.fn()
}

describe('stave component', () => {
  it('renders without crashing', () => {
    const component = mount(<Stave/>)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const component = mount(<Stave/>)

    expect(component.hasClass('stave')).toBe(true)
  })

  it('render the stave svg', () => {
    const component = mount(<Stave/>)
    const element = component.getDOMNode()

    expect(element.querySelector('svg')).toBeDefined()
  })

  it('defaults height and width to 500', () => {
    const component = mount(<Stave/>)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('height').value).toEqual('500')
    expect(attributes.getNamedItem('width').value).toEqual('500')
  })

  it('sets the svg height', () => {
    const component = mount(<Stave height={100}/>)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('height').value).toEqual('100')
  })

  it('sets the svg width', () => {
    const component = mount(<Stave width={100}/>)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('width').value).toEqual('100')
  })

  it('defaults clef type to treble', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    mount(<Stave/>)

    expect(addClef).toHaveBeenCalledWith('treble')
  })

  it('sets the svg height', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    mount(<Stave clef={'bass'}/>)

    expect(addClef).toHaveBeenCalledWith('bass')
  })
})
