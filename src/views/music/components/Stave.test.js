// @flow

import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Stave from './Stave'

function setup(): ShallowWrapper {
  return shallow(<Stave/>)
}

it('renders without crashing', () => {
  const component = setup()

  expect(component).toBeDefined()
})

it('sets the component class', () => {
  const component = setup()

  expect(component.hasClass('stave')).toBe(true)
})

it('sets the component id', () => {
  const component = setup()

  expect(component.props('id')).toBeDefined()
})
