// @flow

import type { ShallowWrapper } from 'enzyme'
import React from 'react'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import { fromJS } from 'immutable'

import ExamplesPage from './ExamplesPage'

type Setup = {
  props: Object,
  enzymeWrapper: ShallowWrapper
}

function setup(): Setup {
  const props = { }
  const store = createMockStore({
    questions: fromJS({ questions: [] })
  })
  const enzymeWrapper: ShallowWrapper = shallowWithStore(<ExamplesPage {...props} />, store)

  return {
    props,
    enzymeWrapper
  }
}

describe('examples page', () => {
  it('renders without crashing', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('.app')).toBeDefined()
  })
})
