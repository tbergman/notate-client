// @flow

import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Stave from './Stave'

function setup(): ReactWrapper {
  return mount(<Stave/>)
}

it('renders without crashing', () => {
  const component = setup()

  expect(component).toBeDefined()
})

it('sets the component class', () => {
  const component = setup()

  expect(component.hasClass('stave')).toBe(true)
})

it('render the stave svg', () => {
  const component = setup()
  const element = component.getDOMNode()

  expect(element.querySelector('svg')).toBeDefined()
})
