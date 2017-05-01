// @flow

import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Stave from './Stave'

function setup(): ReactWrapper {
  const jsdom = require('jsdom').JSDOM

  const exposedProperties = ['window', 'navigator', 'document']
  global.window = new jsdom('<!DOCTYPE html><div id="root"/>').window
  global.document = global.window.document
  global.navigator = { userAgent: 'node.js' }

  Object.keys(global.document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      exposedProperties.push(property)
      global[property] = global.document.defaultView[property]
    }
  })

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
