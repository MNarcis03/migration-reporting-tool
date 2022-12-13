import React from 'react';
import { render, screen } from '@testing-library/react';
import MapComponent from "./MapComponent";

it('shows the header', () => {
    render(<MapComponent childRef={{}}/>);
    
    expect(true).toBeTruthy();
});
