// @flow

import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Flow } from 'vexflow'
import Stave from './Stave'

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
    const attrs = element.querySelector('svg').attributes

    expect(attrs['height'].value).toEqual('500')
    expect(attrs['width'].value).toEqual('500')
  })

  it('sets the svg height', () => {
    const component = mount(<Stave height={100}/>)
    const element = component.getDOMNode()
    const attrs = element.querySelector('svg').attributes

    expect(attrs['height'].value).toEqual('100')
  })

  it('sets the svg width', () => {
    const component = mount(<Stave width={100}/>)
    const element = component.getDOMNode()
    const attrs = element.querySelector('svg').attributes

    expect(attrs['width'].value).toEqual('100')
  })

  it('defaults clef type to treble', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    const component = mount(<Stave/>)
    const element = component.getDOMNode()

    expect(addClef).toHaveBeenCalledWith('treble')
  })

  it('sets the svg height', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    const component = mount(<Stave clef={'bass'}/>)
    const element = component.getDOMNode()

    expect(addClef).toHaveBeenCalledWith('bass')
  })
})
