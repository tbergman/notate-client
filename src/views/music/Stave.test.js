// @flow

import React from 'react'
import { mount } from 'enzyme'
import { Flow } from 'vexflow'
import { StaveUnconnected as Stave } from './Stave'
import { initialState as toolboxInitialState } from 'modules/toolbox/reducer'

const mockAttributesNamedNodeMap = {
  getNamedItem: jest.fn()
}

const reduxProps = {
  toolbox: toolboxInitialState,
  selectStaveNotes: (() => {}),
  addNote: (() => {}),
  removeNote: (() => {}),
  selectNote: (() => {}),
}

describe('stave component', () => {
  it('renders without crashing', () => {
    const component = mount(<Stave notes={'C-D-E/4'} {...reduxProps} />)

    expect(component).toBeDefined()
  })

  it('sets the component class', () => {
    const component = mount(<Stave notes={'C-D-E/4'} {...reduxProps} />)

    expect(component.find('.stave')).toBeDefined()
  })

  it('render the stave svg', () => {
    const component = mount(<Stave notes={'C-D-E/4'} {...reduxProps} />)
    const element = component.getDOMNode()

    expect(element.querySelector('svg')).toBeDefined()
  })

  it('defaults width to 800', () => {
    const component = mount(<Stave notes={'C-D-E/4'} {...reduxProps} />)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('width').value).toEqual('800')
  })

  it('sets the svg width', () => {
    const component = mount(<Stave notes={'C-D-E/4'} width={100} {...reduxProps} />)
    const element = component.getDOMNode()
    const svg = element.querySelector('svg')
    const { attributes = mockAttributesNamedNodeMap } = svg || {}

    expect(attributes.getNamedItem('width').value).toEqual('100')
  })

  it('defaults clef type to treble', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    mount(<Stave notes={'C-D-E/4'} {...reduxProps} />)

    expect(addClef).toHaveBeenCalledWith('treble')
  })

  it('sets the svg height', () => {
    const addClef = spyOn(Flow.Stave.prototype, 'addClef').and.callThrough()
    mount(<Stave notes={'C-D-E/4'} clef={'bass'} {...reduxProps} />)

    expect(addClef).toHaveBeenCalledWith('bass')
  })
})
