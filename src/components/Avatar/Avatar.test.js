import { render, screen } from '@testing-library/react';
import Avatar from './';

const chance = require("chance").Chance();

test('renders image', () => {
  const pictures = {
    "128":"https://pipedrive-profile-pics.s3.amazonaws.com/c662095da1a8169cb828f10740d0d69dba97aa5b_128.jpg",
    "512":"https://pipedrive-profile-pics.s3.amazonaws.com/c662095da1a8169cb828f10740d0d69dba97aa5b_512.jpg"
  };

  const firstName = chance.first();

  render(<Avatar pictures={pictures} firstName={firstName} />);

  const imageElement = screen.getByAltText(firstName);
  
  expect(imageElement).toBeInTheDocument();
});

test('renders initials', () => {
  const firstName = chance.first();
  const lastName = chance.last();

  render(<Avatar firstName={firstName} lastName={lastName} />);

  const initialsElement = screen.getByText(`${firstName?.trim().charAt(0).toUpperCase()}${lastName.trim().charAt(0).toUpperCase()}`);
  
  expect(initialsElement).toBeInTheDocument();
});