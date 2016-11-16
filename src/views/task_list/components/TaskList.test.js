import React from 'react';
import { shallow } from 'enzyme'
import { TaskList } from './TaskList';

function setup() {
  const props = {
    tasks: [{
      id: 1
    },{
      id: 2
    }],
    onDelete: function() {}
  };

  const enzymeWrapper = shallow(<TaskList {...props} />);

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
