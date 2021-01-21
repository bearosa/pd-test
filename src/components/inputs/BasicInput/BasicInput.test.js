import { act, fireEvent, render } from '@testing-library/react';
import React from "react";
import BasicInput from './';

const chance = require("chance").Chance();

test('check input value', () => {
  const label = chance.word();

  const { getByLabelText } = render(<BasicInput label={label} name={label}/>);
  const input = getByLabelText(label);
  const newVal = chance.first();

  fireEvent.change(input, {target: {value: newVal}})
  
  expect(input.value).toBe(newVal);
});

test('rerender', () => {
  const label = chance.word();
  const value = chance.word()

  const { rerender } = render(<BasicInput label={label} name={label} value={value} />);
  
  const newValue = chance.word();
  rerender(<BasicInput label={label} name={label} value={newValue} />)
});

test('validation', () => {
  const ref = React.createRef();

  const generalValidator = (value) => {
    return value !== "";
  };

  render(<BasicInput ref={ref} validator={generalValidator} />);

  act(() => {ref.current.validate();})
})