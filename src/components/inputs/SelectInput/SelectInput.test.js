import { fireEvent, render } from '@testing-library/react';
import SelectInput from './';

const chance = require("chance").Chance();

test('check input value', () => {
  const options = ["a", "b", "c"];

  const { getByTestId } = render(<SelectInput options={options} />);
  const select = getByTestId("select");
  const option = options[Math.floor(Math.random() * 2) + 1]

  fireEvent.change(select, {target: {value: option}})
  
  expect(select.value).toBe(option);
});

test('rerender', () => {
  const label = chance.word();
  const options = ["a", "b", "c", "d", "e"];
  const option = options[Math.floor(Math.random() * 4) + 1];

  const { rerender } = render(<SelectInput label={label} name={label} value={option} />);
  
  const newOpt = options[Math.floor(Math.random() * 4) + 1];
  rerender(<SelectInput label={label} name={label} value={newOpt} />)
});