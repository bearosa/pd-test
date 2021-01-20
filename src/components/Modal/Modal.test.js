import { render, screen } from '@testing-library/react';
import Modal from './';

const chance = require("chance").Chance();

test('renders title', () => {
  const title = chance.sentence({words: 2});

  render(<Modal  title={title} />);

  const titleElement = screen.getByText(title);
  
  expect(titleElement).toBeInTheDocument();
});

test('renders content', () => {
  const text = chance.paragraph();

  render(<Modal>{text}</Modal>);

  const contentElement = screen.getByText(text);

  expect(contentElement).toBeInTheDocument();
});

test('renders actions', () => {
  const actionName = chance.word();
  const actions = <><button>{actionName}</button></>;

  render(<Modal actions={actions} />);

  const actionElement = screen.getByRole("button", {
    name: actionName
  });

  expect(actionElement).toBeInTheDocument();
});