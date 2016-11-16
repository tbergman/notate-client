import React from 'react';
import { shallow } from 'enzyme'
import App from './App';

function setup() {
  const props = {};

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

it('renders without crashing', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.hasClass('App')).toBe(true);
});
