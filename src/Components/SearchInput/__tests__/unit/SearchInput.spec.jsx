import React from 'react';
import { useDispatch } from 'react-redux';
import { shallow } from 'enzyme';
import SearchInput from '../../SearchInput';

import { Input } from 'semantic-ui-react';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('SearchInput', () => {
  const dispatch = jest.fn();
  const component = shallow(<SearchInput />);

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
  });

  it('shallow SearchInput', () => {
    expect(component).toMatchSnapshot();
  });
  it('input text SearchInput', () => {
    expect(component.find(Input).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
