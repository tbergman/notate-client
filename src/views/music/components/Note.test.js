// @flow

import React from 'react'
import { mount } from 'enzyme'
import Note from './Note'
import { Flow } from 'vexflow'

describe('note component', () => {
  it('renders without crashing', () => {
    const component = mount(<Note pitch={'g/4'} duration={4}/>)

    expect(component).toBeDefined()
  })

  it('sets the pitch', () => {
    const component = mount(<Note pitch={'g/4'} duration={4}/>)

    expect(component.props().pitch).toEqual('g/4')
  })

  it('sets the duration', () => {
    const component = mount(<Note pitch={'g/4'} duration={4}/>)

    expect(component.props().duration).toEqual(4)
  })

  describe('with a real stave and svg context', () => {
    let stave, context, tickContext

    beforeEach(() => {
      const renderer = new Flow.Renderer(document.getElementById('root'), Flow.Renderer.Backends.SVG)
      context = renderer.getContext()
      tickContext = new Flow.TickContext()
      stave = new Flow.Stave(10, 10, 10000)
      stave.setContext(context).draw()
    })

    it('updates when receiving context, stave and tickContext', () => {
      const component = mount(<Note pitch={'g/4'} duration={4} />)
      const mock = spyOn(Note.prototype, 'componentDidUpdate').and.callThrough()
      component.setProps({ stave, context, tickContext })

      expect(mock).toHaveBeenCalled()
    })
  })
})
