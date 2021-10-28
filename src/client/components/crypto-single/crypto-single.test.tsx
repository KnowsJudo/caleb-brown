import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestId } from '../../types/test-types';
import { SingleSearch } from './crypto-single';

describe('crypto single', () => {
  test('component renders', () => {
    render(<SingleSearch allData={[]} />);
    const linkElement = screen.getByText(/Show details/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('component returns correct result data', async () => {
    const mockData = [
      {
        id: 'binance-peg-dogecoin',
        name: 'Binance-Peg Dogecoin',
        symbol: 'doge',
      },
    ];
    const { getByPlaceholderText, getByTestId } = render(
      <SingleSearch allData={mockData} />,
    );
    const searchInput = getByPlaceholderText(
      'Enter Crypto id or symbol',
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'doge' } });

    const buttonInput = getByTestId(TestId.SHOW_DETAILS);

    fireEvent.click(buttonInput);

    const outputResults = await waitFor(() =>
      screen.getByTestId(TestId.OUTPUT_DETAILS),
    );
    const outputElement = screen.getByText(/binance-peg-dogecoin/i);
    expect(outputElement).toEqual(outputResults);
  });
});
