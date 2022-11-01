import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('shows the header', () => {
    render(<App />);

    const statisticsLink = screen.getByText(/statistics/i)
    const mapLink = screen.getByText(/map/i)
    expect(statisticsLink).toBeInTheDocument();
    expect(mapLink).toBeInTheDocument();
});
