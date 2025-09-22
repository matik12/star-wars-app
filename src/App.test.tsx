import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Hello world/i);
  expect(headingElement).toBeInTheDocument();
});
