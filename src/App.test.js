// @flow

import type { ShallowWrapper } from 'enzyme'

import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

type Setup = {
  props: Object,
  enzymeWrapper: ShallowWrapper
}

function setup(): Setup {
  const props = {}

  const enzymeWrapper: ShallowWrapper = shallow(<App {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

it('renders without crashing', () => {
  const { enzymeWrapper } = setup()

  expect(enzymeWrapper.hasClass('App')).toBe(true)
})
