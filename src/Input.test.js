import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../test/testUtilities';
import Input from './Input';

const defaultProps = { secretWord: 'party' };

/**
 * Setup function to test the input component using a ShallowWrapper
 * @param {object} [props] - the optional props needed for the test
 * @returns {ShallowWrapper} - returns an Enzyme ShallowWrapper
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Input {...setupProps} />)
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-input');
  expect(component.length).toBe(1);
});
test('does not throw error with expected props', () => {
  checkProps(Input, defaultProps);
});

describe('state controlled input field', () => {
  test('state updates with value of input box upon change', () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttribute(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
});