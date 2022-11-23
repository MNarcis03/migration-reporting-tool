import React from 'react';
import { render, screen } from '@testing-library/react';
import MapFilter from './MapFilter';

it('shows the filter', () => {
    render(<MapFilter updateDate={() => {}} />);

    const inputLabelElement = screen.getByLabelText(/year and month/i);
    expect(inputLabelElement).toBeInTheDocument();
});
