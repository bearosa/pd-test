import { act, render, screen } from '@testing-library/react';
import React from "react";
import AddPersonForm from './';

test('renders inputs', () => {
  const handleChange = jest.fn();
  render(<AddPersonForm onChange={handleChange} />);

  const nameInputElement = screen.getByLabelText("name");
  
  expect(nameInputElement).toBeInTheDocument();

  const organizationInputElement = screen.getByLabelText("organization");
  
  expect(organizationInputElement).toBeInTheDocument();

  const locationInputElement = screen.getByLabelText("location");
  
  expect(locationInputElement).toBeInTheDocument();

  const phoneInputElement = screen.getByLabelText("phone");
  
  expect(phoneInputElement).toBeInTheDocument();

  const emailInputElement = screen.getByLabelText("email");
  
  expect(emailInputElement).toBeInTheDocument();

  const labelInputElements = screen.getAllByLabelText("label");
  
  expect(labelInputElements.length).toBe(2);

  const assistantInputElement = screen.getByLabelText("assistant");
  
  expect(assistantInputElement).toBeInTheDocument();

  const groupsInputElement = screen.getByLabelText("groups");
  
  expect(groupsInputElement).toBeInTheDocument();
});

test('validation', () => {
  const ref = React.createRef();
  const handleChange = jest.fn();
  render(<AddPersonForm ref={ref} onChange={handleChange} />);

  act(() => {ref.current.validate();})
})