// @flow

import type { ShallowWrapper } from 'enzyme'
import React from 'react'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'

import PreviewDocumentPage from './PreviewDocumentPage'

type Setup = {
  props: Object,
  enzymeWrapper: ShallowWrapper
}

function setup(): Setup {
  const props = { }
  const store = createMockStore({ })
  const enzymeWrapper: ShallowWrapper = shallowWithStore(<PreviewDocumentPage {...props} />, store)

  return {
    props,
    enzymeWrapper
  }
}

xdescribe('questions page', () => {
  it('renders without crashing', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('.app')).toBeDefined()
  })
})
