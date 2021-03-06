import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import AddButton from '../../app/components/AddButton';

afterEach(cleanup);

test('AddButton component correcly clicks', (): void => {
    var counter = 0;
    const { getByText } = render(<AddButton label="+" onClick={(): number => (counter = counter + 1)} />);
    fireEvent.click(getByText('+'));

    expect(counter).toBe(1);
});
