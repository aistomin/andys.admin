/**
 * @jest-environment jsdom
 */
import VideoTable from "../VideoTable.jsx";
import {render, screen} from "@testing-library/react";
import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import 'whatwg-fetch'

test('should render progress spinner', () => {
    render(<VideoTable/>);
    const table = screen.getByTestId('progress-spinner');
    expect(table).toBeInTheDocument();
})
