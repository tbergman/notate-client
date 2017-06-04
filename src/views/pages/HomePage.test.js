// @flow

import type { ShallowWrapper } from 'enzyme'
import React from 'react'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import { fromJS } from 'immutable'

import HomePage from './HomePage'

type Setup = {
  props: Object,
  enzymeWrapper: ShallowWrapper
}

function setup(): Setup {
  const props = { }
  const store = createMockStore({ })
  const enzymeWrapper: ShallowWrapper = shallowWithStore(<HomePage {...props} />, store)

  return {
    props,
    enzymeWrapper
  }
}

describe('home page', () => {
  it('renders without crashing', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('.app')).toBeDefined()
  })
})
