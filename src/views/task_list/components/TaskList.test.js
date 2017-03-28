// @flow

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme'
import { TaskList } from './TaskList';
import { List } from 'immutable'

type Setup = {
  props: Object,
  enzymeWrapper: ShallowWrapper
}
function setup(): Setup {
  const props = {
    tasks: new List([{
      id: '1'
    },{
      id: '2'
    }]),
    deleteTask: jest.fn()
  };

  const enzymeWrapper: ShallowWrapper = shallow(<TaskList {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

it('renders without crashing', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('div')).toBeDefined();
});
it('renders all tasks from props', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('div.task').length).toEqual(2)
});
