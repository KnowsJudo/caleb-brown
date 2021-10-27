import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './components/app/App';

test('renders main App page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Caleb & Brown/i);
  expect(linkElement).toBeInTheDocument();
});
