import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Star Wars Characters heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Star Wars Characters/i);
  expect(headingElement).toBeInTheDocument();
});
