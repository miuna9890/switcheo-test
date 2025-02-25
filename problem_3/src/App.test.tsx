import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import WalletPage from './WalletPage';

test('renders learn react link', () => {
  render(<WalletPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
